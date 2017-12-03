import React, { Component } from 'react';
import styles from './Logo.scss';
import head from '../../../static/head.jpg';

export default class Logo extends Component {
    constructor(...props) {
        super(...props);
    }

    render() {
        return (
            <div className={`${styles['logo']} row`}>
                <div className='col-md-8'>
                    <div className={`${styles['logo-left']}`}>
                        <header>
                            <div>NO PAIN NO GAIN</div>
                        </header>
                        <footer>
                            <img src={head} />
                            <div>Johnny</div>
                        </footer>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className={`${styles['logo-right']}`}>
                        <div>
                            <button className={styles.search + ' mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored'}>
                                <i className="material-icons">search</i>
                            </button>
                        </div>
                        <div>
                            <div className={styles['head-icon']}></div>
                        </div>
                        <div>Johnny's Blog</div>
                    </div>
                </div>
            </div>
        )
    }
}

