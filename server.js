const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cons = require('consolidate');

// 设置主机和端口
const hostname = '10.0.0.88';
const port = 7999;

// 使用静态资源
app.use(express.static('static'));

// 设置渲染引擎
app.engine('html', cons.swig);

// 设置view
app.set('view engine', 'html');
app.set('views', `${__dirname}/views`);

// 页面路由分发
const routes = [
    {
        url: '/',
        title: '首页',
    }, {
        url: '/index',
        title: '首页',
    }, {
        url: '/tetris',
        title: '俄罗斯方块',
    }, {
        url: '/xhr',
        title: '俄罗斯方块',
    },
];

routes.forEach((route) => {
    app.get(route.url, (req, res) => {
        res.render('base', { title: route.title });
    });
});

// api 路由分发
app.get('/v1.0/test', (req, res) => {
    res.send(JSON.stringify({ a: 1, b: 2 }));
});

// 监听
server.listen(port, hostname, () => {
    console.log("服务启动，访问地址为 http://%s:%s", hostname, port);
});

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
