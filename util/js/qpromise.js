/** 
 * 自实现Promise.all 方法
*/

function all(promises) {
    if (!Array.isArray(promises)) {
        throw 'arguments must be array';
    }
    return new Promise((resolve, reject) => {
        let len = promises.length;
        const result = [];
        for (let i = 0; i < promises.length; i ++) {
            let p = promises[i];
            if (!(p instanceof Promise)) {
                const temp = p;
                p = new Promise((res, rej) => { res(temp); });
            }
            p.then((value) => {
                result[i] = value;
                if (-- len === 0) {
                    resolve(result);
                }
            }, (e) => {
                reject(e);
            });
        }
    });
}

module.exports.qpromise = {
    all: all
}
