import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getHandle } from '../services/service';

export default class Quiz extends Component {

    constructor() {
        super() 
        this.state = {handle: ''}
    }

    componentDidMount() {
        // getHandle().then(handle => { this.setState({ handle }) })
    }

    render() {
        return (
            <main className="Quiz">
                <h2>QUIZ COMPONENT</h2>
                <h4>Welcome to Quiz{this.state.handle && `, ${this.state.handle}`}</h4>
                <Link to="/"><h4>Home</h4></Link>
            </main>
        )
    }
}