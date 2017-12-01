import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import styles from './Navbar.scss';
import classNames from 'classnames/bind';
let cx = classNames.bind(styles);

export default class Navbar extends Component {
    constructor(...props) {
        super(...props);
    }
    goToMain() {
        browserHistory.push('/');
    }
    render() {
        let classNames = cx({
            'nav-content': true
        })

        return (
            <nav className={classNames} onClick={e => e.stopPropagation()}>
                <div className={styles['navbar-img']}>
                    <div></div>
                    <p>John's Blog</p>
                </div>
                <ul>
                    <li onClick={this.goToMain}>
                        <a>主页</a>
                    </li>
                    <li className={`${styles['has-sub']} collapsed`} data-toggle="collapse" data-target="#category"><span style={{'marginRight': '32px'}} className='glyphicon glyphicon-file'></span>分类</li>
                    <ul class="collapse" id="category">
                        <li>
                            <a>JavaScript</a>
                        </li>
                        <li>
                            <a>HTML</a>
                        </li>
                        <li>
                            <a>css</a>
                        </li>
                    </ul>
                    
                </ul>
            </nav>
        )
    }
}

