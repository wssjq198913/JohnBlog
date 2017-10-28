import React, { Component } from 'react';
import styles from './Navbar.scss';

export default class Navbar extends Component {
    constructor(...props) {
        super(...props);
    }

    render() {

        return (
            <nav className={styles['nav-content']}>
                <p>主页</p>
                <p>时间</p>
                <p>分类</p>
                <p>标签</p>
                <p>分享</p>
            </nav>
        )
    }
}

