/** 题一、实现一个EventEmitter类 
这个类包含以下方法：

on（监听事件，该事件可以被触发多次）
once（也是监听事件，但只能被触发一次）
fire（触发指定的事件）
off（移除指定事件的某个回调方法或者所有回调方法）
测试用例
*/
class EventEmitter {
    constructor() {
        this.init();
    }

    init() {
        this.listeners = {};
        this.onceListeners = {};
    }

    on(action, func) {
        let listener = this.listeners[action];
        if (!listener) {
            listener = [];
            this.listeners[action] = listener;
        }
        listener.push(func);
    }

    once(action, func) {
        this.onceListeners[action] = func;
    }

    fire() {
        const argus = Array.from(arguments);
        const action = argus[0];
        argus.splice(0, 1);
        const listeners = this.listeners[action];
        if (listeners) {
            listeners.forEach(func => {
                func(argus);
            });
        }
        const onceListener = this.onceListeners[action];
        if (onceListener) {
            onceListener(argus);
            this.onceListeners[action] = null;
        }
    }

    clearListener(action, func) {
        if (!func) {
            this.listeners[action] = [];
            this.onceListeners[action] = null;
        } else {
            const listeners = this.listeners[action];
            if (listeners) {
                const index = listeners.indexOf(func);
                if (index !== -1) {
                    listeners.splice(index, 1);
                }
            }
            this.onceListeners[action] = null;
        }
    }

    off(action, func) {
        if (!action && !func) {
            this.init();
        } else {
            this.clearListener(action, func);
        }
    }
}

const event = new EventEmitter();
const drank = (person) => {
  console.log(person + '喝水');
}
event.on('drank', drank)
event.on('eat', (person) => {
  console.log(person + '吃东西')
})
event.once('buy', (person) => {
  console.log(person + '买东西')
})
event.fire('drank', '我')   // 我喝水  
event.fire('drank', '我')   // 我喝水  
event.fire('eat', '其它人')   // 其它人吃东西
event.fire('eat', '其它人')   // 其它人吃东西
event.fire('buy', '其它人')  //其它人买东西
event.fire('buy', '其它人')  //这里不会再次触发buy事件，因为once只能触发一次
event.off('eat')  //移除eat事件
event.fire('eat', '其它人')  //这里不会触发eat事件，因为已经移除了

