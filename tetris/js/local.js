function Local() {
    var game;

    function bindKeyEvent() {
        document.onkeydown = function(e) {
            if (e.keyCode == 38) { // up

            } else if (e.keyCode == 39) { //right
                game.right();
            } else if (e.keyCode == 40) { //down
                game.down();
            } else if (e.keyCode == 37) { //left
                game.left();
            } else if (e.keyCode == 32) { // space

            }
        }
    }

    function start(){
        var doms = {
            gameDiv: document.getElementById('game'),
            nextDiv: document.getElementById('next'),
        };
        game = new Game();
        game.init(doms);
        bindKeyEvent();
    }

    this.start = start;
}