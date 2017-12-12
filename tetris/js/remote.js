import { Game } from './game';

export class Remote {
    constructor(socket) {
        // 游戏核心
        this.game = null;
        // 时间间隔
        this.INTERVAL = 200;
        // 定时器
        this.timer = null;
        // 时间数
        this.timeCount = 0;
        this.time = 0;
        this.bindEvent(socket);
    }

    bindEvent(socket) {
        socket.on('init', (data) => {
            this.game = new Game(this.doms, data.type, data.dir);
        });

        socket.on('next', (data) => {
            this.game.performNext(data.type, data.dir);
        });

        socket.on("down", () => {
            this.game.down();
        });

        socket.on("right", () => {
            this.game.right();
        });

        socket.on("left", () => {
            this.game.left();
        });

        socket.on("fall", () => {
            this.game.fall();
        });

        socket.on("rotate", () => {
            this.game.rotate();
        });

        socket.on("fixed", () => {
            this.game.fixed();
        });

        socket.on("line", (data) => {
            this.game.checkClear();
            this.game.addScore(data);
        });

        socket.on('time', (data) => {
            this.game.setTime(data);
        });

        socket.on('lose', () => {
            this.game.gameOver(false);
        });

        socket.on('addTailLines', (data) => {
            this.game.addTailLines(data);
        });
    }

    get doms() {
        return {
            gameDiv: document.getElementById('remote-game'),
            nextDiv: document.getElementById('remote-next'),
            timeDiv: document.getElementById('remote-time'),
            scoreDiv: document.getElementById('remote-score'),
            resultDiv: document.getElementById('remote-result'),
        };
    }
}
