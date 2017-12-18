
export class Q {
    static ajax(method, url, async = true) {
        const xmlhttp = new XMLHttpRequest();
        const p = new QPromise(xmlhttp);
        xmlhttp.open(method, url, async);
        xmlhttp.send();
        return p;
    }

    static get(url, async) {
        return Q.ajax('get', url, async);
    }

    static post(url, async) {
        return Q.ajax('post', url, async);
    }
}

class QPromise {
    constructor(xhr) {
        this.state = QPromise.kStatePending; // rejected resolved
        this.doneList = [];
        this.failList = [];
        this.data = null;
        this.init(xhr);
    }

    init(xhr) {
        xhr.onreadystatechange = () => {
            const state = xhr.readyState;
            const status = xhr.status;
            if (state === 4 && ((status >= 200 && status <= 300) || status === 304)) {
                this.resolve(xhr.response);
            } else if (state === 4) {
                this.reject({ statusCode: status, reason: xhr.response });
            }
        };
        xhr.timeout = 1000;
        xhr.ontimeout = () => {
            this.reject({ statusCode: 460, reason: "超时" });
        };
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
                    const x = onReject(this.data.e);
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
