import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
          getUsers,
          getUserFriends,
          postFriendshipInvite,
          getPendingFriendships  } from '../services/friendService';

export default class Share extends Component {

  constructor() {
    super()

    this.state = {
      userId: 2
      ,searchValue: ''
      ,friends: []
      ,pending: []
      ,searchResults: []
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    getUserFriends(this.state.userId)
      .then(friends => { this.setState({ friends }) });

    getPendingFriendships(this.state.userId)
      .then(pending => { this.setState({ pending }) });
  }

  handleInput(e) {
    this.setState({ searchValue: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.searchValue.length < 1) return;
    this.setState({ searchValue: '' });

    getUsers(this.state.searchValue)
      .then(searchResults => { this.setState({ searchResults }) });
  }

  inviteFriend(inviteeId) {
    postFriendshipInvite(this.state.userId, inviteeId)
      .then(pending => {
        console.log('pending', pending);
        this.setState({ pending });
      });
  }

  render() {
    return (
      <main className="Share">
        <Link to="/"><h4>Home</h4></Link>
        
        <form className="findFriend" onSubmit={this.handleSubmit}>
          <h2>Invite new friend by username</h2>
          <input
            type="text"
            placeholder="username"
            value={this.state.searchValue}
            onChange={this.handleInput} />
        </form>

        <ul className="friends list">
          <h3>Friends</h3>
          {this.state.friends.map((friend, i) => (
            <li key={i} className="listItem">
              {friend.display_name}
            </li>
          ))}
        </ul>

        <ul className="searchResults list">
          <h3>Search results</h3>
          {this.state.searchResults.map((result, i) => (
            <li key={i} className="listItem">
              {result.display_name}: {result.username}
              <div
                className="friendInvite"
                onClick={() => this.inviteFriend(result.id)}>
                invite
              </div>
            </li>
          ))}
        </ul>

        <ul className="pending list">
          <h3>Pending invitations</h3>
          {this.state.pending.map((pending, i) => (
            <li key={i} className="listItem">
              {pending.display_name}
            </li>
          ))}
        </ul>

      </main>
    )
  }
}