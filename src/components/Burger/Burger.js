import React, { Component } from 'react';
import styles from './Burger.scss';
export default class Navbar extends Component {
    constructor(...props) {
        super(...props);
    }
    render() {
        return (
            <div className={styles.burger} onClick={this.props.click}>
                <p></p>
                <p></p>
                <p></p>
            </div>
        )
    }
}

