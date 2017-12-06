import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './Playbar.scss';
let cx = classNames.bind(styles);

export default class Playbar extends Component {
    constructor(...props) {
        super(...props);
        this.state = { locked: true };
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
                <div className={styles.left}>
                    <div className={styles.wrap}>
                        <div className={styles.btns}>
                            <a className={styles.pre}></a>
                            <a className={styles.play}></a>
                            <a className={styles.next}></a>
                        </div>
                        <div className={styles['play-progress']}>
                            <div className={styles.info}>
                                <span className={styles.title}>我要快乐</span>
                                <span className={styles.singer}>张惠妹</span>
                            </div>
                            <div className={styles.progress}>
                                <span className={styles.dot}></span>
                            </div>
                            <div className={styles.time}></div>
                        </div>
                    </div>
                </div>
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

