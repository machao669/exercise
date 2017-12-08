const express = require('express');
const app = express();
const path = require('path');

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
const server = app.listen(port, hostname, () => {
   console.log("服务启动，访问地址为 http://%s:%s", hostname, port)
 })
