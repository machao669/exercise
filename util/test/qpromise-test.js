const { qpromise } = require('../js/qpromise');

const p1 = new Promise((resolve, reject) => {
    resolve(2);
});
const p2 = new Promise((resolve, reject) => {
    resolve(2);
});
const p3 = 9;

const perr = new Promise((resolve, reject) => {
    reject("error");
});

qpromise.all([p1, p2, p3]).then((results) => {
    console.log('正确执行...');
    console.log(results);
}).catch((e) => {
    console.log(e);
});

qpromise.all([p1, p2, perr]).then((results) => {
    console.log(results);
}).catch((e) => {
    console.log('错误执行...');
    console.log(e);
});
