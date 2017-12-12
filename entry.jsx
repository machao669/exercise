import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import './base.scss';
import TetrisPage from './tetris/js/tetris';

function Home() {
    return (
        <ul>
            <li>
                <Link to="/tetris">火拼俄罗斯方块</Link>
            </li>
        </ul>
    );
}

ReactDom.render((
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/index' component={Home} />
            <Route exact path='/tetris' component={TetrisPage} />
        </Switch>
    </BrowserRouter>
), document.getElementById('page-frame-point'));
