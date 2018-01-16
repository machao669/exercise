const log = require('./log');

function bindApp(app) {
    app.get('/v1.0/test', (req, res) => {
        log.req(req);
        res.send(JSON.stringify({ a: 1, b: 2 }));
    });
    app.post('/v1.0/test', (req, res) => {
        log.req(req);
        res.send(JSON.stringify(req.body));
    });
}

module.exports.bindApp = bindApp;
