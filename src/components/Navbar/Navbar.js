import React, { Component } from 'react';
import styles from './Navbar.scss';

export default class Navbar extends Component {
    constructor(...props) {
        super(...props);
    }

    render() {

        return (
            <nav>
                <div className={styles['nav-content']}>
                    this is navbar
                    <div></div>
                </div>
            </nav>
        )
    }
}

