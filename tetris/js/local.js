import { Game } from './game.js';

export class Local {

    constructor(socket) {
        // 游戏核心
        this.game = null;
        //时间间隔
        this.INTERVAL = 300;
        //定时器
        this.timer = null;
        //时间数
        this.timeCount = 0;
        this.time = 0;
        this.socket = socket;
        socket.on("start", () => {
            this.start();
            document.getElementById('wait').innerHTML = "";
        })
        socket.on("lose", () => {
            this.game.gameOver(true);
            this.stop();
        })
        socket.on("leave", () => {
            document.getElementById('local-result').innerHTML = '对方掉线';
            document.getElementById('remote-result').innerHTML = '已掉线';
            this.stop();
        })
        socket.on('bottomLine', (data) => {
            this.game.addTailLines(data);
            socket.emit('addTailLines', data);
        })
    }

    get doms() {
        return {
            gameDiv: document.getElementById('local-game'),
            nextDiv: document.getElementById('local-next'),
            timeDiv: document.getElementById('local-time'),
            scoreDiv: document.getElementById('local-score'),
            resultDiv: document.getElementById('local-result'),
        }
    }

    //绑定按钮事件
    bindKeyEvent() {
        const game = this.game;
        document.onkeydown = (e) => {
            if (e.keyCode == 38) { // up
                game.rotate();
                this.socket.emit("rotate");
            } else if (e.keyCode == 39) { //right
                game.right();
                this.socket.emit("right");
            } else if (e.keyCode == 40) { //down
                game.down();
                this.socket.emit("down");
            } else if (e.keyCode == 37) { //left
                game.left();
                this.socket.emit("left");
            } else if (e.keyCode == 32) { // space
                game.fall();
                this.socket.emit("fall");
            }
        }
    }
    
     move() {
        const game = this.game;
        this.timeFunc();
        if (!game.down()) {
            game.fixed();
            this.socket.emit("fixed");
            const line = game.checkClear();
            if (line) {
                game.addScore(line);
                this.socket.emit("line", line);
                this.socket.emit("bottomLine", this.generataBottomLine(line));
            }
            const gameOver = game.checkGameOver();
            if (gameOver) {
                stop();
                game.gameOver(false);
                document.getElementById('remote-result').innerHTML = "你赢了";
                this.socket.emit('lose');
            } else {
                this.performNext();
            }
        } else {
            this.socket.emit("down");
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
            this.socket.emit('time', this.time);
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

    performNext() {
        const nextType = this.generateType();
        const nextDir = this.generateDir();
        this.game.performNext(nextType, nextDir);
        this.socket.emit("next", { type: nextType, dir: nextDir });
    }

    start(){
        const initType = this.generateType();
        const initDir = this.generateDir();
        this.game = new Game(this.doms, initType, initDir);
        this.socket.emit("init", { type: initType, dir: initDir });

        this.bindKeyEvent();
        this.performNext();
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
