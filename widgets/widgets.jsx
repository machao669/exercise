import React, { Component } from 'react';
import { Carousel } from "./js/carousel";
import pei1 from "./img/1.jpg";
import pei2 from "./img/2.jpg";
import pei3 from "./img/3.jpg";
import pei4 from "./img/4.jpg";

export default class WidgetsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            auto: false,
            bullet: true,
            width: 300,
            height: 200,
            
        };
    }

    render() {
        return (
            <div>
                <h3>轮播图</h3>
                <div>
                    <p>
                        <label>
                            <input
                                type="checkbox" name="auto" checked={this.state.auto}
                                onChange={e => this.setState({ auto: e.target.checked })}
                            />
                            自动轮播
                        </label>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <label>
                            <input
                                type="checkbox" name="bullet" checked={this.state.bullet}
                                onChange={e => this.setState({ bullet: e.target.checked })}
                            />
                            bullet
                        </label>
                    </p>
                    <p>宽&nbsp;
                        <input
                            value={this.state.width} type="number"
                            onChange={e => this.setState({ width: e.target.value })}
                        /> px
                    </p>
                    <p>高&nbsp;
                        <input
                            value={this.state.height} type="number"
                            onChange={e => this.setState({ height: e.target.value })}
                        /> px
                    </p>
                </div>
                <div>
                    <Carousel
                        width={this.state.width}
                        height={this.state.height}
                        auto={this.state.auto}
                        bullet={this.state.bullet}
                    >
                        <a href=""><img src={pei1} alt="1.jpg" /></a>
                        <a href=""><img src={pei2} alt="2.jpg" /></a>
                        <a href=""><img src={pei3} alt="3.jpg" /></a>
                        <a href=""><img src={pei4} alt="4.jpg" /></a>
                    </Carousel>
                </div>
            </div>
        );
    }
}

