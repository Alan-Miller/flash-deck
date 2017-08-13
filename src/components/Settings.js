import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Settings extends Component {

    render() {
        return (
            <main className="Settings">
                <h2>SETTINGS COMPONENT</h2>
                <Link to="/"><h4>Home</h4></Link>
            </main>
        )
    }
}