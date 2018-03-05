const log = require('./log');

// 页面路由分发
const routes = [
    {
        url: '/',
    }, {
        url: '/index',
    }, {
        url: '/tetris',
    }, {
        url: '/xhr',
    }, {
        url: '/bfc',
    }, {
        url: '/widgets',
    }, {
        url: '/layout',
    }, {
        url: '/grid9',
    },
];

function bindApp(app) {
    // 页面路由
    routes.forEach((route) => {
        app.get(route.url, (req, res) => {
            log.req(req);
            res.render('base');
        });
    });
}

module.exports.bindApp = bindApp;
