import React, { Component } from 'react';

export default class Login extends Component {

  render() {
    return (
      <main className="Login">
        <ul className="Login_ul">
          <h1>Flash Deck</h1>
          <a href="http://localhost:3021/auth"><li>Log in</li></a>
        </ul>
      </main>
    )
  }
}