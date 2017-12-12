export class Square {
    constructor(rotates) {
        // 原点
        this.origin = { x: 0, y: 0 };

        // 旋转方向
        this.dir = 0;
        this.data = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ];
        this.rotates = rotates;
    }

    canRotate(isValid) {
        const d = (this.dir + 1) % 4;
        const test = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ]
        for(let i = 0; i < test.length; i++) {
            for(let j = 0; j < test[0].length; j ++) {
                test[i][j] = this.rotates[d][i][j];
            }
        }
        return isValid(this.origin, test);
    }

    rotate(num = 1) {
        this.dir = (this.dir + num) % 4;
        for(let i = 0; i < this.data.length; i++) {
            for(let j = 0; j < this.data[0].length; j ++) {
                this.data[i][j] = this.rotates[this.dir][i][j];
            }
        }
    }

    canDown(isValid) {
        const test = {};
        test.x = this.origin.x + 1;
        test.y = this.origin.y;
        return isValid(test, this.data);
    }

    down() {
        this.origin.x = this.origin.x + 1;
    }

    canRight(isValid) {
        const test = {};
        test.x = this.origin.x;
        test.y = this.origin.y + 1;
        return isValid(test, this.data);
    }

    right() {
        this.origin.y = this.origin.y + 1;
    }

    canLeft(isValid) {
        const test = {};
        test.x = this.origin.x;
        test.y = this.origin.y - 1;
        return isValid(test, this.data);
    }

    left() {
        this.origin.y = this.origin.y - 1;
    }
}
