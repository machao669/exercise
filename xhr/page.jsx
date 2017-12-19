import React, { Component } from 'react';
import { Q } from '../util/js/ajax';

export default class XHRPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: null,
        };
    }

    componentDidMount() {
        Q.post(`/v1.0/test`, { json: { a: 1, b: 2, c: 3 } })
            .done((res) => {
                this.setState({ response: res });
            });
    }

    render() {
        return (
            <div>
                {this.state.response}
            </div>
        );
    }
}
