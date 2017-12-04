function Square() {
    // 方块数据
    this.data = [
        [0, 2, 0, 0],
        [0, 2, 0, 0],
        [0, 2, 0, 0],
        [0, 2, 0, 0],
    ]
    // 原点
    this.origin = {
        x: 0,
        y: 0,
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