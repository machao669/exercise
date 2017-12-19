
export class Q {
    static ajax(method, url, options) {
        return new XHR(method, url, options).send();
    }

    static get(url, options) {
        return Q.ajax('get', url, options);
    }

    static post(url, options) {
        return Q.ajax('post', url, options);
    }
}

class XHR {
    constructor(method, url, options) {
        this.method = method;
        this.options = this.createOptions(options);
        this.url = url;
        this.xmlhttp = new XMLHttpRequest();
        this.promise = new QPromise(this.bindPromise.bind(this));
    }

    bindPromise(resolve, reject) {
        const xmlhttp = this.xmlhttp;
        xmlhttp.onreadystatechange = () => {
            const state = xmlhttp.readyState;
            const status = xmlhttp.status;
            if (state === 4 && ((status >= 200 && status <= 300) || status === 304)) {
                resolve(xmlhttp.response);
            } else if (state === 4) {
                reject({ statusCode: status, reason: xmlhttp.response });
            }
        };
        xmlhttp.timeout = 1000;
        xmlhttp.ontimeout = () => {
            reject({ statusCode: 460, reason: "超时" });
        };
    }

    createOptions(options) {
        let defOptions = {
            async: true,
            contentType: 'application/plain; charset=UTF-8',
        };
        if (options) {
            defOptions = Object.assign(defOptions, options);
        }
        return defOptions;
    }

    open() {
        const options = this.options;
        let json = null;
        let url = this.url;
        if (options.json !== undefined) {
            json = JSON.stringify(options.json);
            options.contentType = 'application/json; charset=UTF-8';
        } else if (options.query !== undefined) {
            url = `${url}?${this.params(options.query)}`;
        }
        this.xmlhttp.open(this.method, url, options.async);
        this.xmlhttp.setRequestHeader("Content-type", options.contentType);
        this.xmlhttp.send(json);
    }

    params(query) {
        if (typeof query === 'object') {
            let q = '';
            const keys = Object.keys(query);
            keys.forEach((k, index) => {
                q = `${q}${k}=${query[k]}`;
                if (index !== keys.length - 1) {
                    q = `${q}&`;
                }
            });
            return q;
        }
        return query;
    }

    send() {
        this.open();
        return this.promise;
    }
}

class QPromise {
    constructor(fun) {
        this.state = QPromise.kStatePending; // rejected resolved
        this.doneList = [];
        this.failList = [];
        this.data = null;
        fun(this.resolve.bind(this), this.reject.bind(this));
    }

    done(fun) {
        this.doneList.push(fun);
    }

    fail(fun) {
        this.failList.push(fun);
    }

    always() {

    }

    resolve(value) {
        if (this.state === QPromise.kStatePending) {
            this.state = QPromise.kStateResolved;
            this.data = value;
            this.doneList.forEach(fun => fun(value));
        }
    }

    reject(e) {
        if (this.state === QPromise.kStateRejected) {
            this.state = QPromise.kStateRejected;
            this.data = e;
            this.failList.forEach(fun => fun(e));
        }
    }

    then(onResolve, onReject) {
        onResolve = typeof onResolve === 'function' ? onResolve : (value) => { return value; };
        onReject = typeof onReject === 'function' ? onReject : (e) => { return e; };

        // 如果已经resolve的
        if (this.state === QPromise.kStateResolved) {
            return new QPromise((resolve, reject) => {
                try {
                    const x = onResolve(this.data);
                    if (x instanceof QPromise) {
                        x.then(resolve, reject);
                    }
                    resolve(x);
                } catch (e) {
                    reject(e);
                }
            });
        }

        // 如果已经Rejected
        if (this.state === QPromise.kStateRejected) {
            return new QPromise((resolve, reject) => {
                try {
                    const x = onReject(this.data);
                    if (x instanceof QPromise) {
                        x.then(resolve, reject);
                    }
                } catch (e) {
                    reject(e);
                }
            });
        }

        if (this.state === QPromise.kStatePending) {
            return new QPromise((resolve, reject) => {
                this.doneList.push(() => {
                    try {
                        const x = onResolve(this.data);
                        if (x instanceof QPromise) {
                            x.then(resolve, reject);
                        }
                    } catch (e) {
                        reject(e);
                    }
                });
                this.failList.push(() => {
                    try {
                        const x = onReject(this.data);
                        if (x instanceof QPromise) {
                            x.then(resolve, reject);
                        }
                    } catch (e) {
                        reject(e);
                    }
                });
            });
        }
    }

    catch(onRejected) {
        return this.then(null, onRejected);
    }
}

QPromise.kStatePending = 'pending';
QPromise.kStateResolved = 'resolved';
QPromise.kStateRejected = 'rejected';
