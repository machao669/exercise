/**
 * 1、计算碰撞结果
    两个圆 A 和 B，A 圆心位置在 Ax,Ay，B 圆心位置在 Bx,By，
    半径分别为 Ar 和 Br，写一个公式，返回 布尔值，表示他们是否碰撞（有交集）。
 */
Math.sqrt(Math.pow(Bx - Ax) + Math.pow(By - Ay)) <= Ar + Br

/**
 * 2、颜色值转换函数
    写一个颜色值转换函数，将输入的 hex 颜色值转换成 rgb 颜色值。
 */
function hexToRGB(hexColor) {
    let color = hexColor.toLowerCase();
    if (color) {
        // 三位转化成六位
        if (color.length === 4) {
            let newColor = "#";
            for( let i = 1; i < 4; i ++) {
                newColor += color[i] + color[i];
            }
            color = newColor;
        }
        // 处理六位颜色值
        const arr = [];
        for (let i = 1; i < 7; i += 2) {
            arr.push(parseInt("0x" + color.slice(i, i + 2)));
        }
        return "rgb(" + arr.join(',') + ")"
    }
    return color;
}

/**
 * 3、求平均数
请实现函数 average，使之达到执行以下代码后得到数组的平均数。

const array = [ 3, 87, 129, 45, 76, 21, 29, 1000, 0, -8 ];
array.reduce( average ); // 返回平均数
*/

const average = (accumulator, currentValue, currentIndex, array) => {
    const value = accumulator + currentValue;
    if (array.length === currentIndex + 1) {
        return value / array.length;
    }
    return value;
}

/**
 * 4、校验合法日期
 * 写一个 validate 函数，校验一个输入的日期是否合法，合法返回 true，否则返回 false，
 * 如 validate( “2015-2-31” ) 返回 false，如果输入的日期格式不符合 yyyy-MM-dd 
 * 也认为是不合法的。 
 * 
 */
function validate(dateString) {
    const rule = /\d{4}-\d{2}-\d{2}/;
    return rule.test(dateString);
}

/**
 * 5、大小写反转
将一个字符串里的大小写字符反转一下。（小写的转大写，大写的转小写）
 */
function transform(str) {
    if (str) {
        const rule = /[a-z]/;
        let newStr = '';
        for (let i = 0; i < str.length; i ++) {
            const c = str[i];
            if (rule.test(c)) {
                newStr += c.toUpperCase();
            } else {
                newStr += c.toLowerCase();
            }
        }
        return newStr;
    }
    return str;
}

/**
 * 6、获得重叠字符
 * 取得一个字符串里所有的可见的重叠字符（空格属于不可见），以数组存起来。
 * 比如：处理字符串 “JQEOUQOUIAAAAGQEQBBEWJCCCHBE大大F99999Q” 后，
 * 得到的结果是 [ “AAAA”, “BB”, “CCC”, “大大”, “99999” ]
 */
function fetchOverlap(str) {
    let temp = ''; // 记录字符
    let count = 0; // 记录字符出现的次数
    const result = [];
    for (let i = 0; i < str.length; i ++) {
        const c = str[i];
        // 如果不等于记录的字符
        if (temp !== c) {
            // 如果重复，则记录
            if (temp && count > 1) {
                result.push(str.substr(i - count, count));
            }
            temp = c;
            count = 1;
        } else if (i === str.length - 1) {
            count += 1;
            result.push(str.substr(i - count, count));
        } else {
            count += 1;
        }
    }
    return result;
}


/**
 * 7、性能相关
    请从前端视角，说明通常做性能分析和优化都有哪些手段？举例用到的工具，并解释达到的效果。
 */
 
 /**
  *   1.网络请求耗时长对性能优化最明显，主要以减少http请求为主；外链的js,css文件尽量合并成一个，并压缩。网络请求数据时，
  *   尽量减少网络请求，和避免重复的网络请求
  *
  *   2. html编写时，尽量优先让dom先渲染出来。css外链写在head中，js外链下载dom之后的body中。
  *
  *   3. 非核心代码可以defer、async异步加载，或者动态加载
  *
  *   4.利用浏览器的缓存；通过强缓存或者协商缓存，让前端在服务端数据不变的情况下，直接读取本地的缓存文件
  *
  *   5.使用cdn
  *
  *   6.预解析DNS
  */


/**
 * 8、算法相关
假设硬币的两面在落地后出现的概率是均匀分布的，一个硬币用一次抛掷就可以用来公平决择两个事件，
如果给你两枚这样的硬币，你怎么做才能公平地决择三个事件呢？
（要求命中三个事件是均匀分布的，可多次抛掷）
 */

/**
 * function throwCoin() {
 *      const a = Math.round(Math.randow());
 *      const b = Math.round(Math.randow());
 *      return a + b;
 * }
 * 
 * function dispatch(result) {
 *      if (result === "00") {
 *         action1();
 *      } else if (result === "10") {
 *          action2();
 *      } else if (result === "01") {
 *          action3();
 *      } else {
 *          dispatch(throwCoin());
 *      }
 * }
 * 
 * dispatch(throwCoin());
 * 
 */
    
