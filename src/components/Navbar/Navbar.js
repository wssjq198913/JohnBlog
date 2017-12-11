import React, { Component } from 'react';
import $ from 'jquery';
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
    goToCategory(category) {
        browserHistory.push(`/categories/${category}`);
        $('body').removeClass('menu-collapsed');
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
                    <li className={`${styles['has-sub']} collapsed menu`} data-toggle="collapse" data-target="#category">
                        <i className="material-icons sidebar-material-icons">chrome_reader_mode</i>分类
                    </li>
                    <ul className="collapse" id="category">
                        {
                            this.props.categories.map((itm) => {
                                return <li onClick={() => this.goToCategory(itm.category)} key={itm.id}>{itm.category}<span className={styles['sidebar_archives-count']}>{itm.blogLength}</span></li>
                            })
                        }
                    </ul>
                    
                </ul>
            </nav>
        )
    }
}

