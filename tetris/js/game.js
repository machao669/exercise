import { SquareFactory } from './squareFactory';

export class Game {

    constructor(doms, type, dir) {
        // dom元素
        this.gameDiv = doms.gameDiv;;
        this.nextDiv = doms.nextDiv;
        this.timeDiv = doms.timeDiv;
        this.scoreDiv = doms.scoreDiv;
        this.resultDiv = doms.resultDiv;

        //方块
        this.cur = null;
        this.next = SquareFactory.make(type, dir);

        // 得分
        this.score = 0;

         // 游戏矩阵
        this.nextData = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0], 
        ];
        this.gameData = [
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

        //divs
        this.nextDivs = [];
        this.gameDivs = [];

        this.initDivs(this.gameDiv, this.gameData, this.gameDivs);
        this.initDivs(this.nextDiv, this.next.data, this.nextDivs);
        this.refreshNextDivs()
        this.isValidFun = this.isValid.bind(this);
    }
    
    //init function
    initDivs(container, data, divs) {
        for(let i = 0; i < data.length; i ++) {
            const div = [];
            for (let j = 0; j < data[0].length; j++) {
                const newNode = document.createElement('div');
                newNode.className = 'none';
                newNode.style.top = (i * 20) + 'px';
                newNode.style.left = (j * 20) + 'px';
                container.appendChild(newNode);
                div.push(newNode);
            }
            divs.push(div);
        }
    }

    refreshNextDivs() {
        this.refreshDivs(this.next.data, this.nextDivs);
    }

    refreshContentDivs() {
        this.refreshDivs(this.gameData, this.gameDivs);
    }

    //refresh 
    refreshDivs(data, divs) {
        for(let i = 0; i < data.length; i++) {
            for(let j = 0; j < data[0].length; j++){
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
    check(pos, x, y) {
        const gameData = this.gameData;
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
    isValid(pos, data) {
        for(let i = 0; i < data.length; i++){
            for(let j=0; j < data[0].length; j++) {
                if(data[i][j] != 0 && !this.check(pos, i, j)) {
                    return false;
                }
            }
        }
        return true;
    }

    //清除数据
    clearData() {
        const cur = this.cur;
        for(let i = 0; i < cur.data.length; i++) {
            for(let j = 0; j < cur.data[0].length; j++) {
                if(this.check(cur.origin, i, j)) {
                    this.gameData[i+cur.origin.x][j+cur.origin.y] = 0;
                }
            }
        }
    }

    //设置数据
    setData() {
        const cur = this.cur;
        for(let i = 0; i < cur.data.length; i++) {
            for(let j = 0; j < cur.data[0].length; j++) {
                if(this.check(cur.origin, i, j)) {
                    this.gameData[i+cur.origin.x][j+cur.origin.y] = cur.data[i][j];
                }
            }
        }
    }

    // 下
    down() {
        if (this.cur.canDown(this.isValidFun)) {
            this.clearData();
            this.cur.down();
            this.setData();
            this.refreshContentDivs();
            return true;
        } else {
            return false;
        }
    }

    // 右
    right() {
        if (this.cur.canRight(this.isValidFun)) {
            this.clearData();
            this.cur.right();
            this.setData();
            this.refreshContentDivs();
        }
    }

    // 左
    left() {
        if (this.cur.canLeft(this.isValidFun)) {
            this.clearData();
            this.cur.left();
            this.setData();
            this.refreshContentDivs();
        }
    }

     // 旋转
     rotate() {
        if (this.cur.canRotate(this.isValidFun)) {
            this.clearData();
            this.cur.rotate();
            this.setData();
            this.refreshContentDivs();
        }
    }

    // 方块移动到底部，给它固定
    fixed() {
        const cur = this.cur;
        const gameData = this.gameData;
        for(let i = 0; i < cur.data.length; i ++) {
            for(let j = 0; j < cur.data[0].length; j ++) {
                if(this.check(cur.origin, i, j)) {
                    if(gameData[cur.origin.x + i][cur.origin.y + j] == 2) {
                        gameData[cur.origin.x + i][cur.origin.y + j] = 1;
                    }
                }
            }
        }
        this.refreshContentDivs();
    }

    // 消除方块
    checkClear() {
        const gameData = this.gameData;
        let line = 0;
        for(let i = gameData.length -1; i >= 0; i--) {
            let clear = true;
            for(let j = 0; j<gameData[0].length; j ++) {
                if (gameData[i][j] != 1) {
                    clear = false;
                    break;
                }
            }
            if (clear) {
                line += 1;
                for(let m = i; m > 0; m--) {
                    for(let n = 0; n < gameData[0].length; n ++) {
                        gameData[m][n] = gameData[m - 1][n];
                    }
                }
                for(let n = 0; n < gameData[0].length; n ++) {
                    gameData[0][n] = 0;
                }
                i++
            }
        }
        return line;
    }

    //检查游戏结束
    checkGameOver() {
        const gameData = this.gameData;
        let gameOver = false;
        for(let i = 0; i < gameData[0].length; i++) {
            if(gameData[1][i] == 1) {
                gameOver = true;
            }
        }
        return gameOver;
    }

    // 游戏结束
    gameOver(winner) {
        this.resultDiv.innerHTML = winner ? "你赢了" : "你输了";
    }

    // 底部增加行
    addTailLines(lines) {
        const gameData = this.gameData;
        const cur = this.cur;
        for(let i = 0; i < gameData.length - lines.length; i++) {
            gameData[i] = gameData[i + lines.length];
        }
        for(let i = 0; i < lines.length; i++) {
            gameData[gameData.length - lines.length + i] = lines[i];
        }
        cur.origin.x -= lines.length;
        if (cur.origin.x < 0) {
            cur.origin.x = 0;
        }
        this.refreshContentDivs();
    }

    //使用下一个方块
    performNext(type, dir) {
        this.cur = this.next;
        this.setData();
        this.next = SquareFactory.make(type, dir);
        this.refreshContentDivs();
        this.refreshNextDivs();
    }

    // 设置时间
    setTime(time) {
        this.timeDiv.innerHTML = time;
    }

    addScore(line) {
        let s = 0;
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
        this.scoreDiv.innerHTML = score;
    }

    fall() {
        while(this.down()) {}
    }
}