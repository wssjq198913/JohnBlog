import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './Playbar.scss';
let cx = classNames.bind(styles);

export default class Playbar extends Component {
    constructor(...props) {
        super(...props);
        this.state = { locked: false };
    }
    lockPlaybar() {
        this.setState({ locked: !this.state.locked });
    }
    render() {
        let lockClass = cx({
            'lock': true,
            'locked': this.state.locked
        });
        let playbarClass = cx({
            'playbar': true,
            'locked': this.state.locked
        });

        return (
            <div className={playbarClass}>
                <div className={styles.left}></div>
                <div className={styles.right}>
                    <div className={styles['lock-section']}>
                        <div onClick={() => this.lockPlaybar()} className={lockClass}></div>
                    </div>
                    <div className={styles.fill}></div>
                </div>
            </div>
        )
    }
}

