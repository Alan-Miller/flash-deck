import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Quiz extends Component {

    render() {
        return (
            <main className="Quiz">
                <h2>QUIZ COMPONENT</h2>
                <Link to="/"><h4>Home</h4></Link>
            </main>
        )
    }
}