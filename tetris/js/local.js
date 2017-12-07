function Local() {
    var game;

    //时间间隔
    var INTERVAL = 200;

    //定时器
    var timer = null;

    //时间数
    var timeCount = 0;
    var time = 0;

    //绑定按钮事件
    function bindKeyEvent() {
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

    // 移动
    function move() {
        timeFunc();
        if (!game.down()) {
            game.fixed();
            var line = game.checkClear();
            if (line) {
                game.addScore(line);
            }
            var gameOver = game.checkGameOver();
            if (gameOver) {
                stop();
                game.gameOver(false);
            } else {
                game.performNext(generateType(), generateDir());
            }
        }
    }

    // 随机生成干扰行
    function generataBottomLine(lineNumber) {
        var lines = [];
        for(var i =0; i<lineNumber; i++) {
            var line=[];
            for(var j=0;j<10;j++) {
                line.push(Math.ceil(Math.random() * 2) - 1);
            }
            lines.push(line);
        }
        return lines;
    }

    // 计算时间
    function timeFunc() {
        timeCount += 1;
        if (timeCount == 5) {
            time += 1;
            timeCount = 0;
            game.setTime(time);
            if (time % 10 === 0) {
                game.addTailLines(generataBottomLine(1));
            }
        }
    }

    // 随机生成方块种类
    function generateType() {
        return Math.floor(Math.random() * 7)
    }

    // 随机生成方块旋转角度
    function generateDir() {
        return Math.floor(Math.random() * 4)
    }

    function start(){
        var doms = {
            gameDiv: document.getElementById('game'),
            nextDiv: document.getElementById('next'),
            timeDiv: document.getElementById('time'),
            scoreDiv: document.getElementById('score'),
            resultDiv: document.getElementById('result'),
        };
        game = new Game();
        game.init(doms, generateType(), generateDir());
        bindKeyEvent();
        game.performNext(generateType(), generateDir());
        timer = setInterval(move, INTERVAL);
    }

    function stop() {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
        document.onkeydown = null;
    }

    this.start = start;
}