import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Play extends Component {

    render() {
        return (
            <main className="Play">
                <h2>PLAY COMPONENT</h2>
                <Link to="/"><h4>Home</h4></Link>
            </main>
        )
    }
}