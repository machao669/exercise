import { Game } from './game.js';

export class Remote {

    constructor(socket) {
        // 游戏核心
        this.game = null;
        //时间间隔
        this.INTERVAL = 200;
        //定时器
        this.timer = null;
        //时间数
        this.timeCount = 0;
        this.time = 0;
        this.bindEvent(socket)
    }

    bindEvent(socket) {
        socket.on('init', (data) => {
            console.log(data);
            this.game = new Game(this.doms, data.type, data.dir);
        })

        socket.on('next', (data) => {
            this.game.performNext(data.type, data.dir);
        })

        socket.on("down", (data) => {
            this.game.down();
        })
        
        socket.on("right", (data) => {
            this.game.right();
        })
    
        socket.on("left", (data) => {
            this.game.left();
        })
    
        socket.on("fall", (data) => {
            this.game.fall();
        })
    
        socket.on("rotate", (data) => {
            this.game.rotate();
        })

        socket.on("fixed", (data) => {
            this.game.fixed();
        })

        socket.on("line", (data) => {
            this.game.checkClear()
            this.game.addScore(data);
        })

        socket.on('time', (data) => {
            this.game.setTime(data);
        })

        socket.on('lose', (data) => {
            this.game.gameOver(false);
        })

        socket.on('addTailLines', (data) => {
            this.game.addTailLines(data);
        })
    }

    get doms() {
        return {
            gameDiv: document.getElementById('remote-game'),
            nextDiv: document.getElementById('remote-next'),
            timeDiv: document.getElementById('remote-time'),
            scoreDiv: document.getElementById('remote-score'),
            resultDiv: document.getElementById('remote-result'),
        }
    }
}