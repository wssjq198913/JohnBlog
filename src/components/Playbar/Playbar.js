import React, { Component } from 'react';
import classNames from 'classnames/bind';
import $ from 'jquery';
import styles from './Playbar.scss';
import song from '../../../static/我要快乐.mp3';
let cx = classNames.bind(styles);
let tag = false;
const progressLenth = 490;
export default class Playbar extends Component {
    constructor(...props) {
        super(...props);
        this.state =
            {
                locked: true,
                isRunning: false,
                progress: 0
            };
    }
    componentDidMount() {
        $(document).on('mouseup', (event) => {
            tag = false;
            event.stopPropagation();
            $('audio')[0].currentTime = this.state.progress * $('audio')[0].duration;
        })
        $(document).on('mousemove', (event) => {
            if (tag) {
                let originalPageX = $(`.${styles['play-progress']}`).offset().left;
                let progress = (event.pageX - originalPageX) / progressLenth;
                if (event.pageX - originalPageX <= 0) {
                    progress = 0;
                } else if (event.pageX - originalPageX > progressLenth) {
                    progress = 100 / progressLenth;
                }
                this.setState({ 'progress': `${progress * 100}%` });
                event.stopPropagation();
            }
        })
        let vid = $('audio')[0];
        vid.ontimeupdate = () => {
            if (!tag) {
                this.setState({ 'progress': `${vid.currentTime / vid.duration * 100}%` });
            }

        };
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
        const progress = (event.pageX - originalPageX) / progressLenth;
        this.setState({ 'progress': `${progress * 100}%` });
        $('audio')[0].currentTime = progress * $('audio')[0].duration;
        event.stopPropagation();
    }
    play() {
        $('audio')[0].play();
        this.setState({ isRunning: true });
    }
    pause() {
        $('audio')[0].pause();
        this.setState({ isRunning: false });
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
                <audio src={song}></audio>
                <div className={styles.left}>
                    <div className={styles.wrap}>
                        <div className={styles.btns}>
                            <a className={styles.pre}></a>
                            <a onClick={this.state.isRunning ? () => this.pause() : () => this.play()} className={this.state.isRunning ? styles.pause : styles.play}></a>
                            <a className={styles.next}></a>
                        </div>
                        <div className={styles['play-progress']}>
                            <div className={styles.info}>
                                <span className={styles.title}>我要快乐</span>
                                <span className={styles.singer}>曾一鸣</span>
                            </div>
                            <div onClick={(e) => this.clickProgressBar(e)} className={styles.progress}>
                                <div style={{ 'width': this.state.progress }} className={styles.played}></div>
                                <span style={{ 'left': this.state.progress }} onMouseDown={(e) => this.progressMoveStart(e)} className={styles.dot}></span>
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

