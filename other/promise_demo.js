
var p = new Promise((resolve, reject) => {
    return reject('reject');
});

Promise.all([1, 2, p])
.then((r) => {
    console.log(r);
})
.catch((e) => {
    console.log(e);
});

function* all() {
    yield p;
    yield 1;
    yield 2;
}

var a = all();
console.log(a.next());
console.log(a.next());
console.log(a.next());
console.log(a.next());
