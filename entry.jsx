import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

ReactDom.render((
    <BrowserRouter>
        <Switch>
            <Route exact path='/index' component={Home} />
            <Route exact path='/' component={Home} />
        </Switch>
    </BrowserRouter>
), document.getElementById('page-frame-mount-point'));

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                hello world!
            </div>
        )
    }
}
