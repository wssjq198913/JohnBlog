import React, { Component } from 'react';
import styles from './ArticleCard.scss';

export default class ArticleCard extends Component {
    constructor(...props) {
        super(...props);
    }

    render() {

        return (
            <article className={styles['article-card']}>
                <header onClick={() => this.props.gotoDetail(this.props.date, this.props.title)}>
                    <p>{this.props.title}</p>
                </header>
                <section>{this.props.shortDescription}</section>
                <footer>
                    <div className={styles.author}>
                        <p>{this.props.author}</p>
                        <p>{this.props.date}</p>
                    </div>
                    <div className={styles['article-type']}>
                        <p>{this.props.category}</p>
                    </div>
                </footer>
            </article>
        )
    }
}

