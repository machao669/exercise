// 函数防抖：创建一个指定函数的包装函数。该包装函数被调用任意次均不执行指定函数，除非此次调用时间距离上一次超过了指定时间。

function foo() {
	console.log('I\'m called', Date.now());
}

function debounce(func, time) {
    let timeOutId = null;
    return function() {
        if (timeOutId) {
            clearTimeout(timeOutId);
            timeOutId = null;
        }
        timeOutId = setTimeout(() => {
            func();
            clearTimeout(timeOutId);
            timeOutId = null;
        }, time);
    };
}

var dFoo = debounce(foo, 200);
console.log(Date.now());
dFoo();
setTimeout(dFoo, 50);
setTimeout(dFoo, 100);
setTimeout(dFoo, 150);
setTimeout(dFoo, 200);
setTimeout(dFoo, 250); // 该次被调用，且调用时间比起始时间多约450ms
setTimeout(dFoo, 1000);
setTimeout(dFoo, 1050); // 该次被调用，且调用时间比起始时间多约1250ms