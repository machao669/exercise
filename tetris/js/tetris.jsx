import React, { Component } from 'react';
import { Local } from './local';
import { Remote } from './remote';
import '../css/style.scss';

const conf = require('../../conf');

export default class TetrisPage extends Component {
    componentDidMount() {
        const socket = window.io.connect(conf.ws);
        const local = new Local(socket);
        const remote = new Remote(socket);
        socket.on('waiting', (desc) => {
            document.getElementById('wait').innerHTML = desc;
        });
    }

    render() {
        return (
            <div id="tetris-page">
                <div>请用方向键和空格键进行操作，上：旋转，左：左移，下：下移，右：右移，空格：坠落</div>
                <div id="wait" />
                <div id="local" className="square">
                    <div className="title">我的游戏区域</div>
                    <div className="game" id="local-game" />
                    <div className="next" id="local-next" />
                    <div className="info">
                        <div>已用时： <span id="local-time">0</span>S</div>
                        <div>已得分： <span id="local-score">0</span>分</div>
                        <div id="local-result" />
                    </div>
                </div>
                <div id="remote" className="square">
                    <div className="title">对方游戏区域</div>
                    <div className="game" id="remote-game" />
                    <div className="next" id="remote-next" />
                    <div className="info">
                        <div>已用时： <span id="remote-time">0</span>S</div>
                        <div>已得分： <span id="remote-score">0</span>分</div>
                        <div id="remote-result" />
                    </div>
                </div>
            </div>
        );
    }
}
