import { Game } from './game.js';

export class Local {

    constructor(doms) {
        // 游戏核心
        this.game = new Game(doms, this.generateType(), this.generateDir());
        //时间间隔
        this.INTERVAL = 200;
        //定时器
        this.timer = null;
        //时间数
        this.timeCount = 0;
        this.time = 0;
    }

    //绑定按钮事件
    bindKeyEvent() {
        const game = this.game;
        document.onkeydown = function(e) {
            if (e.keyCode == 38) { // up
                game.rotate();
            } else if (e.keyCode == 39) { //right
                game.right();
            } else if (e.keyCode == 40) { //down
                game.down();
            } else if (e.keyCode == 37) { //left
                game.left();
            } else if (e.keyCode == 32) { // space
                game.fall();
            }
        }
    }
    
     move() {
        const game = this.game;
        this.timeFunc();
        if (!game.down()) {
            game.fixed();
            const line = game.checkClear();
            if (line) {
                game.addScore(line);
            }
            const gameOver = game.checkGameOver();
            if (gameOver) {
                stop();
                game.gameOver(false);
            } else {
                game.performNext(this.generateType(), this.generateDir());
            }
        }
    }

    // 随机生成干扰行
    generataBottomLine(lineNumber) {
        const lines = [];
        for(let i = 0; i < lineNumber; i++) {
            const line=[];
            for(let j = 0; j < 10; j++) {
                line.push(Math.ceil(Math.random() * 2) - 1);
            }
            lines.push(line);
        }
        return lines;
    }

    // 计算时间
    timeFunc() {
        this.timeCount += 1;
        if (this.timeCount == 5) {
            this.time += 1;
            this.timeCount = 0;
            this.game.setTime(this.time);
            if (this.time % 10 === 0) {
                this.game.addTailLines(this.generataBottomLine(1));
            }
        }
    }

    // 随机生成方块种类
    generateType() {
        return Math.floor(Math.random() * 7)
    }

    // 随机生成方块旋转角度
    generateDir() {
        return Math.floor(Math.random() * 4)
    }

    start(doms){
        this.bindKeyEvent();
        this.game.performNext(this.generateType(), this.generateDir());
        this.timer = setInterval(this.move.bind(this), this.INTERVAL);
    }

    stop() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        document.onkeydown = null;
    }
}
