import React, { Component } from 'react';
import classNames from 'classnames/bind';
import $ from 'jquery';
import styles from './Playbar.scss';
import song from '../../../static/我要快乐.mp3';
let cx = classNames.bind(styles);
let tag = false;
let mouseMoveType = null;
const progressLenth = 490;
let interval;
export default class Playbar extends Component {
    constructor(...props) {
        super(...props);
        this.state =
            {
                locked: true,
                isRunning: false,
                progress: 0,
                duration: '00:00',
                playedTime: '00:00',
                buffered: 0,
                loading:false,
                timeWhenLoading:0
            };
    }
    convert(value) {
        return Math.floor(value / 60).toString().padStart(2, '0') + ':' + Math.round(value % 60 ? value % 60 : '00').toString().padStart(2, '0')
    }
    componentDidMount() {
        window.setTimeout(() => {
            $(document).on('mouseup', (event) => {
                if (mouseMoveType == 'progress') {
                    tag = false;
                    event.stopPropagation();
                    $('audio')[0].currentTime = this.state.progress.substring(0, this.state.progress.length - 1) / 100 * $('audio')[0].duration;
                }
                mouseMoveType = null;
            })
            $(document).on('mousemove', (event) => {
                if (tag) {
                    mouseMoveType = 'progress';
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
            vid.onloadeddata = () => {
                this.setState({ 'duration': this.convert(vid.duration) });
            }

            vid.onended = () => {
                window.clearInterval(interval);
            }

            vid.onwaiting = () => {
                this.setState({ 'loading': true });
                this.setState({ 'timeWhenLoading': vid.currentTime });
            }

            vid.src = song;
            // there's a issue with ontimeupdate, the time change is not smooth, so I decided to use setInterval
            // vid.ontimeupdate = () => {
            //     if (!tag) {
            //         this.setState({ 'progress': `${vid.currentTime / vid.duration * 100}%` });
            //         this.setState({ 'playedTime': this.convert(vid.currentTime) });
            //     }

            // };
        }, 0);
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
        let vid = $('audio')[0];
        vid.play();

        interval = window.setInterval(() => {
            if (!tag) {
                this.setState({ 'progress': `${vid.currentTime / vid.duration * 100}%` });
                this.setState({ 'playedTime': this.convert(vid.currentTime) });
                this.setState({ 'buffered': `${vid.buffered.end(0) / vid.duration * 100}%` });
                if (vid.currentTime > this.state.timeWhenLoading) {
                    this.setState({ 'loading': false });
                }
            }
        }, 500);
        this.setState({ isRunning: true });
    }
    pause() {
        $('audio')[0].pause();
        this.setState({ isRunning: false });
        window.clearInterval(interval);
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
            <div>
                <div className={`${styles['playbar-mobile']}`}>
                    <div className={styles.info}>
                        <div className={styles.song}>我要快乐</div>
                        <div className={styles.singer}>曾一鸣</div>
                    </div>
                    <div className={styles.btns}>
                        {this.state.isRunning ? <div onClick={()=>this.pause()} class="iconfont play icon-stop"></div> :
                        <div onClick={()=>this.play()} class="iconfont play icon-play"></div>
                        }
                        <div class="iconfont icon-next"></div>
                        <div class="iconfont icon-list"></div>
                    </div>
                    <div style={{'width': this.state.progress}} className={styles.progress}></div>
                </div>
                <div className={`${playbarClass}`}>
                    <audio></audio>
                    <div className={styles.left}>
                        <div className={styles.wrap}>
                            <div className={styles.btns}>
                                <a className={styles.pre}></a>
                                <a onClick={this.state.isRunning ? () => this.pause() : () => this.play()} className={this.state.isRunning ? styles.pause : styles.play}>
                                    
                                </a>
                                <a className={styles.next}></a>
                            </div>
                            <div className={styles['play-progress']}>
                                <div className={styles.info}>
                                    <span className={styles.title}>我要快乐</span>
                                    <span className={styles.singer}>曾一鸣</span>
                                </div>
                                <div onClick={(e) => this.clickProgressBar(e)} className={styles.progress}>
                                    <div style={{ 'width': this.state.progress }} className={styles.played}></div>
                                    <div style={{ 'width': this.state.buffered }} className={styles.buffered}></div>
                                    <span style={{ 'left': this.state.progress }} onMouseDown={(e) => this.progressMoveStart(e)} className={styles.dot}>
                                        <i className={this.state.loading ? styles.loading : ''}></i>
                                    </span>
                                    <span className={styles.time}>
                                        <span className={styles['played-time']}>{this.state.playedTime}</span>/
                                    {this.state.duration}
                                    </span>
                                </div>
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
            </div>
        )
    }
}

