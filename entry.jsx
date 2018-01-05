import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import './base.scss';
import TetrisPage from './tetris/js/tetris';
import XHRPage from './xhr/page';
import CssPage from './h5/css';
import WidgetsPage from './widgets/widgets';

function Home() {
    return (
        <ul>
            <li><Link to="/tetris">火拼俄罗斯方块</Link></li>
            <li><Link to="/xhr">xhr</Link></li>
            <li><Link to="/cssdemo">cssdemo</Link></li>
            <li><Link to="/widgets">widgets</Link></li>
        </ul>
    );
}

ReactDom.render((
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/index' component={Home} />
            <Route exact path='/tetris' component={TetrisPage} />
            <Route exact path='/xhr' component={XHRPage} />
            <Route exact path='/cssdemo' component={CssPage} />
            <Route exact path='/widgets' component={WidgetsPage} />
        </Switch>
    </BrowserRouter>
), document.getElementById('page-frame-point'));
