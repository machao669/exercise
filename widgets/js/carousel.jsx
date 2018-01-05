import React, { Component } from 'react';
import '../css/carousel.scss';

export class Carousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curIndex: 0,
        };
        this.isAnimate = false;
        this.pre = this.onPre.bind(this);
        this.next = this.onNext.bind(this);
        this.init(props);
    }

    componentDidMount() {
        this.toggleInterVal(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.init(nextProps);
        this.toggleInterVal(nextProps);
        this.forceUpdate();
    }

    componentWillUnmount() {
        if (this.timeOutId) {
            window.clearTimeout(this.timeOutId);
            this.timeOutId = null;
        }
        this.clearInterVal();
    }

    onPre() {
        this.onIndexChange(this.state.curIndex - 1);
    }

    onNext() {
        this.onIndexChange(this.state.curIndex + 1);
    }

    onIndexChange(newIndex) {
        if (this.isAnimate) {
            return;
        }
        this.isAnimate = true;
        this.itemsNode.style.transition = this.transition;
        this.itemsNode.style.left = `${-(newIndex * this.width) - this.width}px`;
        this.timeOutId = window.setTimeout(() => {
            this.isAnimate = false;
            if (newIndex < 0) {
                this.toTail();
            } else if (newIndex === this.props.children.length) {
                this.toHead();
            } else {
                this.setState({ curIndex: newIndex });
            }
        }, this.duration);
    }

    init(props) {
        this.width = Number(props.width);
        this.height = Number(props.height);
        this.transition = props.transition;
        this.duration = this.fetchDuration(this.transition);
    }

    toggleInterVal(props) {
        if (props.auto && !this.intervalId) {
            this.intervalId = window.setInterval(() => {
                this.next();
            }, props.autoInterval);
        } else if (!props.auto) {
            this.clearInterVal();
        }
    }

    clearInterVal() {
        if (this.intervalId) {
            window.clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    toHead() {
        this.itemsNode.style.transition = 'none';
        this.itemsNode.style.left = `${-this.width}px`;
        this.setState({ curIndex: 0 });
    }

    toTail() {
        const curIndex = this.props.children.length - 1;
        this.itemsNode.style.transition = 'none';
        this.itemsNode.style.left = `${-(curIndex * this.width) - this.width}px`;
        this.setState({ curIndex });
    }

    get style() {
        return {
            width: `${this.width}px`,
            height: `${this.height}px`,
        };
    }

    get itemCTStyle() {
        return {
            width: `${this.width * (this.props.children.length + 2)}px`,
            height: `${this.height}px`,
        };
    }

    fetchDuration(transition) {
        const durationString = transition.split(" ")[0];
        let duration = 0;
        if (durationString.endsWith('ms')) {
            duration = Number(durationString.replace('ms', ''));
        } else {
            duration = Number(durationString.replace('s', '')) * 1000;
        }
        return duration;
    }

    _renderBullet() {
        if (!this.props.bullet) {
            return null;
        }
        const curIndex = this.state.curIndex;
        return (
            <div className="bullet-ct">
                <ul className="bullet">
                    {this.props.children.map((child, index) => {
                        return (
                            <li
                                className={curIndex === index ? "active" : ""} key={index}
                                onClick={this.onIndexChange.bind(this, index)}
                            />
                        );
                    })}
                </ul>
            </div>
        );
    }

    render() {
        const children = this.props.children;
        if (children.length < 2) {
            return null;
        }
        return (
            <div className="carousel" style={this.style}>
                <ul
                    className="item-ct" style={this.itemCTStyle}
                    ref={(ref) => { this.itemsNode = ref; }}
                >
                    <li className="item" style={this.style}>
                        {children[children.length - 1]}
                    </li>
                    {children.map((child, index) =>
                        <li key={index} className="item" style={this.style}>
                            {child}
                        </li>
                    )}
                    <li className="item" style={this.style}>
                        {children[0]}
                    </li>
                </ul>
                <span className="btn btn-pre" onClick={this.pre}>&lt;</span>
                <span className="btn btn-next" onClick={this.next}>&gt;</span>
                {this._renderBullet()}
            </div>
        );
    }
}

Carousel.defaultProps = {
    bullet: true,
    transition: '.3s',
    auto: true,
    autoInterval: 3000,
};
