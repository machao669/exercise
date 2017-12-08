const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// 设置主机和端口
const hostname = '127.0.0.1';
const port = 7999;

// 使用静态资源
app.use(express.static('static'));

// 单页面路由分发
const routes = [
  '/',
  '/index',
  '/tetris',
];

routes.forEach((route) => {
  app.get(route, (req, res) => {
    res.sendFile(__dirname + '/index.html');
  })
})

// api 路由分发


// 监听
server.listen(port, hostname, () => {
  console.log("服务启动，访问地址为 http://%s:%s", hostname, port)
})

 // websocket
let clientCount = 0;  // 客户端计数
const socketMap = {};

function bindListener(socket, event) {
  socket.on(event, (data) => {
    const num = socket.clientNum;
    const rivalNum =  num % 2 === 0 ? num - 1 : num + 1;
    socketMap[rivalNum].emit(event, data);
  })
}

io.on("connection", (socket) => {
  clientCount += 1;
  socket.clientNum = clientCount;
  socketMap[clientCount] = socket;

  if (clientCount % 2 === 1) {
    socket.emit('waiting', 'waiting for another person');
  } else {
    socket.emit('start');
    socketMap[(clientCount - 1)].emit('start');
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

  socket.on('disconnect', () => {

  })
})
