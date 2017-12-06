function Square() {

    // 原点
    this.origin = {
        x: 0,
        y: 0,
    }

    // 旋转方向
    this.dir = 0;

    this.canRotate = function(isValid) {
        var d = (this.dir + 1) % 4;
        var test = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ]
        for(var i=0; i < test.length; i++) {
            for(var j=0; j < test[0].length; j ++) {
                test[i][j] = this.rotates[d][i][j];
            }
        }
        return isValid(this.origin, test);
    }

    this.rotate = function(num = 1) {
        this.dir = (this.dir + num) % 4;
        for(var i=0; i < this.data.length; i++) {
            for(var j=0; j < this.data[0].length; j ++) {
                this.data[i][j] = this.rotates[this.dir][i][j];
            }
        }
    }

    this.canDown = function(isValid) {
        var test = {};
        test.x = this.origin.x + 1;
        test.y = this.origin.y;
        return isValid(test, this.data);
    }

    this.down = function() {
        this.origin.x = this.origin.x + 1;
    }

    this.canRight = function(isValid) {
        var test = {};
        test.x = this.origin.x;
        test.y = this.origin.y + 1;
        return isValid(test, this.data);
    }

    this.right = function() {
        this.origin.y = this.origin.y + 1;
    }

    this.canLeft = function(isValid) {
        var test = {};
        test.x = this.origin.x;
        test.y = this.origin.y - 1;
        return isValid(test, this.data);
    }

    this.left = function() {
        this.origin.y = this.origin.y - 1;
    }
}