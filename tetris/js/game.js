function Game() {
    // dom元素
    var gameDiv;
    var nextDiv;
    var timeDiv;
    var scoreDiv;
    var resultDiv;

    // 得分
    var score = 0;
    
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
            return true;
        } else {
            return false;
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

     // 旋转
     function rotate() {
        if (cur.canRotate(isValid)) {
            clearData();
            cur.rotate();
            setData();
            refreshDivs(gameData, gameDivs);
        }
    }

    // 方块移动到底部，给它固定
    function fixed() {
        for(var i = 0; i < cur.data.length; i ++) {
            for(var j = 0; j < cur.data[0].length; j ++) {
                if(check(cur.origin, i, j)) {
                    if(gameData[cur.origin.x + i][cur.origin.y + j] == 2) {
                        gameData[cur.origin.x + i][cur.origin.y + j] = 1;
                    }
                }
            }
        }
        refreshDivs(gameData, gameDivs);
    }

    // 消除方块
    function checkClear() {
        var line = 0;
        for(var i = gameData.length -1; i >=0; i--) {
            var clear = true;
            for(var j = 0; j<gameData[0].length; j ++) {
                if (gameData[i][j] != 1) {
                    clear = false;
                    break;
                }
            }
            if (clear) {
                line += 1;
                for(var m=i; m>0; m--) {
                    for(var n=0; n<gameData[0].length; n ++) {
                        gameData[m][n] = gameData[m - 1][n];
                    }
                }
                for(var n=0; n<gameData[0].length; n ++) {
                    gameData[0][n] = 0;
                }
                i++
            }
        }
        return line;
    }

    //检查游戏结束
    function checkGameOver() {
        var gameOver = false;
        for(var i=0; i<gameData[0].length; i++) {
            if(gameData[1][i] == 1) {
                gameOver = true;
            }
        }
        return gameOver;
    }

    // 游戏结束
    function gameOver(winner) {
        var desc = winner ? "你赢了" : "你输了";
        resultDiv.innerHTML = desc;
    }

    //使用下一个方块
    function performNext(type, dir) {
        cur = next;
        setData();
        next = SquareFactory.prototype.make(type, dir);
        refreshDivs(gameData, gameDivs);
        refreshDivs(next.data, nextDivs);
    }

    // 设置时间
    function setTime(time) {
        timeDiv.innerHTML = time;
    }

    function addScore(line) {
        var s = 0;
        switch(line) {
            case 1:
                s = 10;
                break;
            case 2:
                s = 30;
                break;
            case 3:
                s = 60;
                break;
            case 4:
                s = 100;
                break; 
            default:   
        }
        score += s;
        scoreDiv.innerHTML = score;
    }

    //初始化
    function init(doms, type, dir) {
        gameDiv = doms.gameDiv;
        nextDiv = doms.nextDiv;
        timeDiv = doms.timeDiv;
        scoreDiv = doms.scoreDiv;
        resultDiv = doms.resultDiv;
        next = SquareFactory.prototype.make(type, dir);
        initDivs(gameDiv, gameData, gameDivs);
        initDivs(nextDiv, next.data, nextDivs);
        refreshDivs(next.data, nextDivs);
    }

    // 导出API
    this.init = init;
    this.down = down;
    this.left = left;
    this.right = right;
    this.rotate = rotate;
    this.fall = function() { while(down()){} };
    this.fixed = fixed;
    this.performNext = performNext;
    this.checkClear = checkClear;
    this.checkGameOver = checkGameOver;
    this.setTime = setTime;
    this.addScore = addScore;
    this.gameOver = gameOver;
}