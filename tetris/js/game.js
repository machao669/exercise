function Game() {
    // dom元素
    var gameDiv;
    var nextDiv;
    // 游戏矩阵
    var nextData = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0], 
    ];
    var gameData = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    //方块
    var cur;
    var next;

    //divs
    var nextDivs = [];
    var gameDivs = [];

    //init function
    function initDivs(container, data, divs) {
        for(var i = 0; i < data.length; i ++) {
            var div = [];
            for (var j = 0; j < data[0].length; j++) {
                var newNode = document.createElement('div');
                newNode.className = 'none';
                newNode.style.top = (i * 20) + 'px';
                newNode.style.left = (j * 20) + 'px';
                container.appendChild(newNode);
                div.push(newNode);
            }
            divs.push(div);
        }
    }

    //refresh 
    function refreshDivs(data, divs) {
        for(var i=0; i<data.length; i++) {
            for(var j=0; j<data[0].length; j++){
                if(data[i][j] == 0) {
                    divs[i][j].className = 'none';
                }else if(data[i][j] == 1) {
                    divs[i][j].className = 'done';
                }else if(data[i][j] == 2) {
                    divs[i][j].className = 'current';
                }
            }
        }
    }

    //检测点合法
    function check(pos, x, y) {
        if (pos.x + x < 0) {
            return false;
        } else if(pos.x + x >= gameData.length) {
            return false;
        } else if(pos.y + y < 0) {
            return false;
        } else if(pos.y + y >= gameData[0].length) {
            return false;
        } else if(gameData[pos.x + x][pos.y + y] == 1) {
            return false;
        }
        return true;
    }

    //判断数据是否合法

    function isValid(pos, data) {
        for(var i=0; i < data.length; i++){
            for(var j=0; j < data[0].length; j++) {
                if(data[i][j] != 0 && !check(pos, i, j)) {
                    return false;
                }
            }
        }
        return true;
    }

    //清除数据
    function clearData() {
        for(var i=0; i<cur.data.length; i++) {
            for(var j=0; j<cur.data[0].length; j++) {
                if(check(cur.origin, i, j)) {
                    gameData[i+cur.origin.x][j+cur.origin.y] = 0;
                }
            }
        }
    }

    //设置数据
    function setData() {
        for(var i=0; i<cur.data.length; i++) {
            for(var j=0; j<cur.data[0].length; j++) {
                if(check(cur.origin, i, j)) {
                    gameData[i+cur.origin.x][j+cur.origin.y] = cur.data[i][j];
                }
            }
        }
    }

    // 下
    function down() {
        if (cur.canDown(isValid)) {
            clearData();
            cur.down();
            setData();
            refreshDivs(gameData, gameDivs);
        }
    }

    // 右
    function right() {
        if (cur.canRight(isValid)) {
            clearData();
            cur.right();
            setData();
            refreshDivs(gameData, gameDivs);
        }
    }

    // 左
    function left() {
        if (cur.canLeft(isValid)) {
            clearData();
            cur.left();
            setData();
            refreshDivs(gameData, gameDivs);
        }
    }

    //初始化
    function init(doms) {
        gameDiv = doms.gameDiv;
        nextDiv = doms.nextDiv;
        cur = new Square();
        next = new Square();
        initDivs(gameDiv, gameData, gameDivs);
        initDivs(nextDiv, next.data, nextDivs);
        refreshDivs(gameData, gameDivs);
        refreshDivs(next.data, nextDivs);
    }

    // 导出API
    this.init = init;
    this.down = down;
    this.left = left;
    this.right = right;
}