import React, { Component } from 'react';
import { Q } from '../util/js/ajax';

export default class XHRPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: null,
            json: JSON.stringify({ a: 1, b: 2, c: 3 }),
        };
        this.submit = this.submitFun.bind(this);
    }

    submitFun() {
        Q.post(`/v1.0/test`, { json: JSON.parse(this.state.json) })
            .done((res) => {
                this.setState({ response: res });
            });
    }

    render() {
        return (
            <div>
                <textarea
                    placeholder="请输入json格式的字符串"
                    value={this.state.json}
                    onChange={(e) => { this.setState({ json: e.target.value }); }}
                />
                <button onClick={this.submit}>提交</button>
                <hr />
                <h3>返回结果</h3>
                {this.state.response}
            </div>
        );
    }
}
