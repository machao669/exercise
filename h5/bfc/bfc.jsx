import React, { Component } from 'react';
import './bfc.scss';

export default class BfcPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div id="css-page">
                <h3>bfc 各子元素margin没有重叠</h3>
                <div className="container">
                    <div className="bfc">
                        <section />
                    </div>
                    <div className="bfc">
                        <section />
                    </div>
                    <div className="bfc">
                        <section />
                    </div>
                    <div className="bfc">
                        <section />
                    </div>
                    <div className="bfc">
                        <section />
                    </div>
                </div>
                <h3>无bfc 子元素margin重叠</h3>
                <div className="container">
                    <div>
                        <section />
                    </div>
                    <div>
                        <section />
                    </div>
                    <div>
                        <section />
                    </div>
                    <div>
                        <section />
                    </div>
                    <div>
                        <section />
                    </div>
                </div>
                <h3>有bfc float高度参与计算</h3>
                <div className="container bfc">
                    <div className="img" />
                </div>
                <h3>无BFC 高度坍塌了</h3>
                <div className="container">
                    <div className="img" />
                </div>
            </div>
        );
    }
}

