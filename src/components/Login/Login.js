import React, { Component } from 'react';

export default class Login extends Component {

  render() {
    return (
      <main className="Login">
        <ul className="Login_ul">
          <h1>Flash Deck</h1>
          <a href={process.env.REACT_APP_LOGIN}><li>Log in</li></a>
        </ul>
      </main>
    )
  }
}