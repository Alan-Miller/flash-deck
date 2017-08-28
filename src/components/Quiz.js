import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getDisplayName } from '../services/service';

export default class Quiz extends Component {

  constructor() {
    super()
    this.state = { displayName: '' }
  }

  componentDidMount() {
    getDisplayName().then(displayName => { this.setState({ displayName }) })
  }

  render() {
    return (
      <main className="Quiz">
        <h2>QUIZ COMPONENT</h2>
        <h4>Welcome to Quiz{this.state.displayName && `, ${this.state.displayName}`}</h4>
        <Link to="/"><h4>Home</h4></Link>
      </main>
    )
  }
}