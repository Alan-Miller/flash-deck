import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {

    render() {
        return (
            <main className="Home">
                <ul className="Home_ul">
                    <Link to=""><h1>Flash Deck</h1></Link>
                    <Link to="/play"><li>Play</li></Link>
                    <Link to="/quiz"><li>Quiz</li></Link>
                    <Link to="/share"><li>Share</li></Link>
                    <Link to="/settings"><li>Settings</li></Link>
                </ul>
            </main>
        )
    }
}