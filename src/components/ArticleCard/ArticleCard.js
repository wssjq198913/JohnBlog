import React, { Component } from 'react';
import styles from './ArticleCard.scss';

export default class ArticleCard extends Component {
    constructor(...props) {
        super(...props);
    }

    render() {

        return (
            <article className={styles['article-card']}>
                <header>
                    <p>开发NodeJS</p>
                </header>
                <section>Charles其实是一款代理服务器，通过成为电脑或者浏览器的代理，然后截取请求和请求结果达到分析抓包的目的。该软件是用Java写的，能够在Windows，Mac，Linux上使用。开发iOS都在Mac系统上吧，安装Charles的时候要先装好Java环境。 </section>
                <footer>
                    <div className={styles.author}>
                        <p>Johnny</p>
                        <p>Jan 15</p>
                    </div>
                    <div className={styles['article-type']}>
                        <p>JavaScript</p>
                    </div>
                </footer>
            </article>
        )
    }
}

