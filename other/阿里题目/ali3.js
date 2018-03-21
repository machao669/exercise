
// 函数节流：创建一个指定函数的包装函数。该包装函数在指定时间间隔内最多只被调用一次。

function foo() {
	console.log('I\'m called', Date.now());
}

function throttle(fuc, time) {
    let startTime = new Date().getTime();
    return function() {
        const currentTime = new Date().getTime();
        if (currentTime - startTime > time) {
            fuc();
            startTime = currentTime;
        }
    };
}

var tFoo = throttle(foo, 200);
console.log(Date.now());
tFoo();
setTimeout(tFoo, 50);
setTimeout(tFoo, 100);
setTimeout(tFoo, 150);
setTimeout(tFoo, 200);
setTimeout(tFoo, 250);
setTimeout(tFoo, 1000);
setTimeout(tFoo, 1050);
// 共调用5次，每次和起始时间的间隔大约是：0ms, 200ms, 400ms, 1000ms, 1200ms。