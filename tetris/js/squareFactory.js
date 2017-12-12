import { Square } from './square';

const Square1 = [
    [
        [0, 2, 0, 0],
        [0, 2, 0, 0],
        [0, 2, 0, 0],
        [0, 2, 0, 0],
    ], [
        [0, 0, 0, 0],
        [2, 2, 2, 2],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ], [
        [0, 2, 0, 0],
        [0, 2, 0, 0],
        [0, 2, 0, 0],
        [0, 2, 0, 0],
    ], [
        [0, 0, 0, 0],
        [2, 2, 2, 2],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ],
];

const Square2 = [
    [
        [2, 2, 2, 0],
        [2, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ], [
        [2, 2, 0, 0],
        [0, 2, 0, 0],
        [0, 2, 0, 0],
        [0, 0, 0, 0],
    ], [
        [0, 0, 2, 0],
        [2, 2, 2, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ], [
        [2, 0, 0, 0],
        [2, 0, 0, 0],
        [2, 2, 0, 0],
        [0, 0, 0, 0],
    ],
];

const Square3 = [
    [
        [2, 2, 0, 0],
        [2, 0, 0, 0],
        [2, 0, 0, 0],
        [0, 0, 0, 0],
    ], [
        [2, 2, 2, 0],
        [0, 0, 2, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ], [
        [0, 2, 0, 0],
        [0, 2, 0, 0],
        [2, 2, 0, 0],
        [0, 0, 0, 0],
    ], [
        [2, 0, 0, 0],
        [2, 2, 2, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ],
];

const Square4 = [
    [
        [0, 2, 0, 0],
        [2, 2, 2, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ], [
        [0, 2, 0, 0],
        [0, 2, 2, 0],
        [0, 2, 0, 0],
        [0, 0, 0, 0],
    ], [
        [2, 2, 2, 0],
        [0, 2, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ], [
        [0, 2, 0, 0],
        [2, 2, 0, 0],
        [0, 2, 0, 0],
        [0, 0, 0, 0],
    ],
];

const Square5 = [
    [
        [2, 2, 0, 0],
        [2, 2, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ], [
        [2, 2, 0, 0],
        [2, 2, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ], [
        [2, 2, 0, 0],
        [2, 2, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ], [
        [2, 2, 0, 0],
        [2, 2, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ],
];

const Square6 = [
    [
        [0, 2, 2, 0],
        [2, 2, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ], [
        [2, 0, 0, 0],
        [2, 2, 0, 0],
        [0, 2, 0, 0],
        [0, 0, 0, 0],
    ], [
        [0, 2, 2, 0],
        [2, 2, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ], [
        [2, 0, 0, 0],
        [2, 2, 0, 0],
        [0, 2, 0, 0],
        [0, 0, 0, 0],
    ],
];

const Square7 = [
    [
        [2, 2, 0, 0],
        [0, 2, 2, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ], [
        [0, 2, 0, 0],
        [2, 2, 0, 0],
        [2, 0, 0, 0],
        [0, 0, 0, 0],
    ], [
        [2, 2, 0, 0],
        [0, 2, 2, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ], [
        [0, 2, 0, 0],
        [2, 2, 0, 0],
        [2, 0, 0, 0],
        [0, 0, 0, 0],
    ],
];


export class SquareFactory {
    static make(index, dir) {
        let s = null;
        switch (index) {
            case 0:
                s = Square1;
                break;
            case 1:
                s = Square2;
                break;
            case 2:
                s = Square3;
                break;
            case 3:
                s = Square4;
                break;
            case 4:
                s = Square5;
                break;
            case 5:
                s = Square6;
                break;
            case 6:
                s = Square7;
                break;
            default:
        }
        const sq = new Square(s);
        sq.origin.x = 0;
        sq.origin.y = 3;
        sq.rotate(dir);
        return sq;
    }
}
