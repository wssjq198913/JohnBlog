import React, { Component } from 'react';
import classNames from 'classnames/bind';
import $ from 'jquery';
import styles from './Playbar.scss';
let cx = classNames.bind(styles);
let tag = false;
let left = 0;
export default class Playbar extends Component {
    constructor(...props) {
        super(...props);
        this.state = { locked: true, currentTime: 0};
    }
    componentDidMount() {
        $(document).on('mouseup', (event) => {
            tag = false;
            event.stopPropagation();
        })
        $(document).on('mousemove', (event) => {
            if (tag) {
                let originalPageX = $(`.${styles['play-progress']}`).offset().left;
                left = event.pageX - originalPageX;
                if (left <= 0) {
                    left = 0;
                }else if (left > 490) {
                    left = 490;
                }
                $(`.${styles.dot}`).css('left', left);
                event.stopPropagation();
            }
        })
    }
    lockPlaybar() {
        this.setState({ locked: !this.state.locked });
    }
    progressMoveStart(event) {
        tag = true;
        event.stopPropagation();
    }
    clickProgressBar(event) {
        let originalPageX = $(`.${styles['play-progress']}`).offset().left;
        left = event.pageX - originalPageX;
        $(`.${styles.dot}`).css('left', left);
        event.stopPropagation();
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
                            <div onClick={(e) => this.clickProgressBar(e)} className={styles.progress}>
                                <span onMouseDown={(e)=>this.progressMoveStart(e)} className={styles.dot}></span>
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

