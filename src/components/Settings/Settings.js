import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Settings extends Component {

  constructor() {
    super()

    this.state = {
      userID: 2
      ,friendUsername: ''
      ,friends: []
      ,pending: []
      ,potentialFriends: []
    }
    // this.handleInput = this.handleInput.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // axios.get(`${URL}/friends/${this.state.userID}`)
    //   .then(response => {
    //     const friends = response.data;
    //     this.setState({ friends });
    //   });

    // axios.get(`${URL}/pending/${this.state.userID}`)
    //   .then(response => {
    //     const pending = response.data;
    //     this.setState({ pending });
    //   });
  }

  // handleInput(e) {
  //   this.setState({
  //     friendUsername: e.target.value
  //   });
  // }
  // handleSubmit(e) {
  //   e.preventDefault();
  //   axios.get(`${URL}/user?username=${this.state.friendUsername}`)
  //     .then(response => {
  //       const potentialFriends = response.data;
  //       this.setState({ potentialFriends });
  //     })
  // }

  // inviteFriend(inviteeId) {
  //   axios.post(`${URL}/friends/${this.state.userID}/${inviteeId}`)
  // }

  render() {
    return (
      <section className="Settings">
        <div className="header">
          <ul className="nav">
            <Link to="/"><li>Home</li></Link>
          </ul>
        </div>
        <main>
          <span className="comingSoon">Play mode settings coming soon!</span>
        </main>
        
      </section>
    )
  }
}