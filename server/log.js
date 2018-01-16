const debug = true;

function d(desc) {
    if (debug) {
        console.log(desc);
    }
}

function e(error) {
    if (debug) {
        console.error(error);
    }
}

function req(request) {
    if (debug) {
        console.log(`ip: ${request.ip}     route: ${request.path}`);
        console.log(request.body);
    }
}

module.exports.e = e;
module.exports.d = d;
module.exports.req = req;
