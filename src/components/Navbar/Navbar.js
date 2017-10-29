import React, { Component } from 'react';
import styles from './Navbar.scss';
import classNames from 'classnames/bind';
let cx = classNames.bind(styles);

export default class Navbar extends Component {
    constructor(...props) {
        super(...props);
    }
    render() {
        let classNames = cx({
            'nav-content': true
        })

        return (
            <nav className={classNames} onClick={e => e.stopPropagation()}>
                <p>主页</p>
                <p>时间</p>
                <p>分类</p>
                <p>标签</p>
                <p>分享</p>
            </nav>
        )
    }
}

