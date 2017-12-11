import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import styles from './ArticleCard.scss';
import head from '../../../static/head.jpg';

export default class ArticleCard extends Component {
    constructor(...props) {
        super(...props);
    }
    componentDidMount() {
        // const imgRandomNumber = Math.ceil(Math.random() * 11).toString().padStart(2, '0');
        // const img = require(`../../../static/card-background/${imgRandomNumber}.jpg`);
        // this.articleHeader.setAttribute('data-src', img)
    }
    goToCategory(category) {
        browserHistory.push(`/categories/${category}`);
    }
    render() {
        return (
            <div className='row'>
                <article className='col-xs-12'>
                    <div className={styles['article-card']}>
                    <header className='lazy' onClick={() => this.props.gotoDetail(this.props.date, this.props.title)} ref={a => this.articleHeader = a}>
                        <p>{this.props.title}</p>
                    </header>
                    <section>{this.props.shortDescription}</section>
                    <footer>
                        <div className={styles['signature']}>
                            <img src={head}/>
                            <div className={styles.author}>
                                <p>{this.props.author}</p>
                                <p>{this.props.date}</p>
                            </div>
                        </div>
                        <div className={styles['article-type']}>
                            <p onClick={() => this.goToCategory(this.props.category)}>{this.props.category}</p>
                        </div>
                    </footer>
                    </div>
                </article>
            </div>
        )
    }
}

