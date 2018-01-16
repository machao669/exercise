const express = require('express');
const app = express();
const server = require('http').Server(app);
const cons = require('consolidate');
const bodyParser = require('body-parser');
const config = require('./conf');

// 路由
const routes = require('./server/routes');
// api路由
const api = require('./server/api');
// websocket
const socket = require('./server/websocket');

// 设置端口
const port = config.port;

// 使用静态资源
app.use(express.static('./dist'));
// 使用提交的body
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// 设置渲染引擎
app.engine('html', cons.swig);
// 设置view
app.set('view engine', 'html');
app.set('views', `${__dirname}/views`);

// 页面路由绑定
routes.bindApp(app);
// api路由绑定
api.bindApp(app);

// 监听
server.listen(port, () => {
    console.log("服务启动，访问地址为 http://127.0.0.1:%s", port);
});

// socket 绑定server
socket.bindServer(server);
