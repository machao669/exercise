import React, { Component } from 'react';
import { Local } from './local';
import '../css/style.scss';

export default class TetrisPage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const doms = {
            gameDiv: this.gameDiv,
            nextDiv: this.nextDiv,
            timeDiv: this.timeDiv,
            scoreDiv: this.scoreDiv,
            resultDiv: this.resultDiv,
        };
        const local = new Local();
        local.start(doms);
    }

    render() {
        return (
            <div id="tetris-page">
                <div className="game" ref={(ref) => { this.gameDiv = ref; }} />
                <div className="next" ref={(ref) => { this.nextDiv = ref; }} />
                <div className="info">
                    <div>已用时： <span ref={(ref) => { this.timeDiv = ref; }}>0</span>S</div>
                    <div>已得分： <span ref={(ref) => { this.scoreDiv = ref; }}>0</span>分</div>
                    <div ref={(ref) => { this.resultDiv = ref; }} />
                </div>
            </div>
        );
    }
}