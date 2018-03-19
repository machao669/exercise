### 大搜车面试

#### 笔试题
##### part 1 基础
1. 下面哪个设置会使宽度不计算padding的值
```
a. content-box  b. border-box  c. 以上都不对
```
2. typeof(null) 的值

3. 用一行代码让var domList = document.queryAll('div');中的domList返回真正的数组

#### part 2 思考题
1. 写成认为最好的目录分配方式，并说明原因

2. 写出在项目中遇到的技术问题并写出解决方法和思路

#### part 3 算法
1. 生成url地址中的query对象，注意所以的条件判断

```
如： 'http://www.domen.com?key1=v1&key2=1&key2=2a&key3=%e4%b8%ad%e6%96%87&key4'

生成的对象
{
    key1: v1,
    key2: [1, 2], // 同样的key合并成数组
    key3: "中文",     // 中文编码
    key4: true,   // 没有值则为true
}
```

2. 创建一个简单的模板生成器
```
var template = "我叫{{name}}, 性别{{gender}}，年龄{{age}}";

var obj = {
    name: "名字",
    gender: "男",
}

render(template, obj); 
输出：我叫名字，性别男， 年龄undefined
```

3. 用最基本的遍历方式判断一个字符串是否包含另一个字符串，没有返回-1，有就返回开始的位置
```
isContain("a", "bcd")  // -1
isContain("ab", "bcdabc")  // 3
isContain("abb", "abcdbabbc")  // 5
```

4. 创建一个方法可以监听属性的变化
```
var obj = {
    a: 1,
    b: 2,
}

function func(key) {
    console.log(key + "发生了变化,变化值为" + this[key]);
}

bindData(obj, func);

obj.a = 2
输出： a发生了变化,变化值为2
obj.b = 3
输出： b发生了变化,变化值为3
```

#### 一面
1. 自我介绍
2. 说说在项目中使用sass功能，手写一个sass函数
3. React生命周期
4. Promise使用过吗？为什么使用Promise
5. es6使用过哪些？箭头函数和普通的函数有什么区别
6. 项目中遇到什么有意思的事情？ps: 我展开说了下技术分享，https和http，restful等等。
7. 了解ReactNative吗
8. 写过app中的h5页面吗，h5与原生时怎么交互的
9. 手写一个类，再写一个类继承它
10. 看我写了Python的，问会shell或者Python写脚本吗，主要用脚本来干什么
11. 微信分享做过吗，需要注意什么

#### 二面
1. 项目架构主要做了哪些任务
2. 看项目中写了几个测试框架，主要做了什么
3. 你们项目代码放在什么位置的
4. 说说你们直播技术（ps:有个项目用到了直播）
5. 前后端分离了吗，前端js是通过cdn放的吗
6. 前端中的请求域名用的和后端一致吗

#### HR面
1. 离职原因
2. 职业规划
3. 等等其他常规hr问的问题
