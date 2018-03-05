import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import './base.scss';
import TetrisPage from './tetris/js/tetris';
import XHRPage from './xhr/page';
import BfcPage from './h5/bfc/bfc';
import Layout from './h5/layout/layout';
import WidgetsPage from './widgets/widgets';
import Grid9 from './h5/layout/grid9';

function Home() {
    return (
        <ul>
            <li><Link to="/tetris">火拼俄罗斯方块</Link></li>
            <li><Link to="/xhr">xhr</Link></li>
            <li><Link to="/widgets">widgets</Link></li>
            <li><Link to="/bfc">bfc</Link></li>
            <li><Link to="/layout">layout</Link></li>
            <li><Link to="/grid9">九宫格</Link></li>
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
            <Route exact path='/bfc' component={BfcPage} />
            <Route exact path='/widgets' component={WidgetsPage} />
            <Route exact path='/layout' component={Layout} />
            <Route exact path='/grid9' component={Grid9} />
        </Switch>
    </BrowserRouter>
), document.getElementById('page-frame-point'));
