import React from 'react';
import qImg from './img/layout.png';
import './layout.scss';

export default function Layout() {
    return (
        <div id="layout">
            <section>
                <h3>问题</h3>
                <img src={qImg} />
            </section>
            <section>
                <h3>解决方法一：浮动</h3>
                <article className="layout float">
                    <div className="left" />
                    <div className="right" />
                    <div className="center">
                        这是中间内容，这是中间内容
                    </div>
                </article>
            </section>
            <section>
                <h3>解决方法二：绝对布局</h3>
                <article className="layout absolute">
                    <div className="left" />
                    <div className="right" />
                    <div className="center">
                        这是中间内容，这是中间内容
                    </div>
                </article>
            </section>
            <section>
                <h3>解决方法三：flex</h3>
                <article className="layout flex">
                    <div className="left" />
                    <div className="center">
                        这是中间内容，这是中间内容
                    </div>
                    <div className="right" />
                </article>
            </section>
            <section>
                <h3>解决方法四：表格布局</h3>
                <article className="layout table">
                    <div className="left" />
                    <div className="center">
                        这是中间内容，这是中间内容
                    </div>
                    <div className="right" />
                </article>
            </section>
            <section>
                <h3>解决方法五：grid布局</h3>
                <article className="layout grid">
                    <div className="left" />
                    <div className="center">
                        这是中间内容，这是中间内容
                    </div>
                    <div className="right" />
                </article>
            </section>
        </div>
    );
}
