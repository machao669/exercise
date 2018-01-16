const socketIo = require('socket.io');

// websocket
let clientCount = 0; // 客户端计数
const socketMap = {};

function bindListener(socket, event) {
    socket.on(event, (data) => {
        const num = socket.clientNum;
        const rivalNum = num % 2 === 0 ? num - 1 : num + 1;
        if (socketMap[rivalNum]) {
            socketMap[rivalNum].emit(event, data);
        }
    });
}

function bindServer(server) {
    const io = socketIo(server);
    initTetris(io);
}

// 俄罗斯方块的
function initTetris(io) {
    io.on("connection", (socket) => {
        clientCount += 1;
        socket.clientNum = clientCount; // eslint-disable-line
        socketMap[clientCount] = socket;
        if (clientCount % 2 === 1) {
            socket.emit('waiting', 'waiting for another person');
        } else if (socketMap[(clientCount - 1)]) {
            socket.emit('start');
            socketMap[(clientCount - 1)].emit('start');
        } else {
            socket.emit('leave');
        }
        bindListener(socket, 'init');
        bindListener(socket, 'next');
        bindListener(socket, 'down');
        bindListener(socket, 'right');
        bindListener(socket, 'left');
        bindListener(socket, 'fall');
        bindListener(socket, 'rotate');
        bindListener(socket, 'fixed');
        bindListener(socket, 'line');
        bindListener(socket, 'time');
        bindListener(socket, 'lose');
        bindListener(socket, 'bottomLine');
        bindListener(socket, 'addTailLines');
        socket.on('disconnect', () => {
            const num = socket.clientNum;
            const rivalNum = num % 2 === 0 ? num - 1 : num + 1;
            if (socketMap[rivalNum]) {
                socketMap[rivalNum].emit('leave');
            }
            delete socketMap[socket.clientNum];
        });
    });
}

module.exports.bindServer = bindServer;
