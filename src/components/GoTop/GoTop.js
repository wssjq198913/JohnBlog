import React, { Component } from 'react';
import $ from 'jquery';
import styles from './GoTop.scss';

export default class GoTop extends Component {
    componentDidMount() {
        $(window).scroll(() => {
            const goTop = $('.' + styles['go-top']);
            if($(window).scrollTop() < 200) {
                goTop.removeClass(styles['show']);
            }
            else {
                goTop.addClass(styles['show']);
            }
        })
    }
    goTop() {
        $('html,body').animate({scrollTop: '0px'}, 300);
    }
    render() {
        return (
            <div className={styles['go-top']} onClick={this.goTop}>
                <span>
                    <span>></span>
                </span>
            </div>
        )
    }
}

