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
        Q.get(`/v1.0/test`)
            .done((res) => {
                this.setState({ response: res.toString() });
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
