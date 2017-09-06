import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Settings extends Component {

  constructor() {
    super()

    this.state = {
      userId: 2
      ,friendUsername: ''
      ,friends: []
      ,pending: []
      ,potentialFriends: []
    }
    // this.handleInput = this.handleInput.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // axios.get(`${URL}/friends/${this.state.userId}`)
    //   .then(response => {
    //     const friends = response.data;
    //     this.setState({ friends });
    //   });

    // axios.get(`${URL}/pending/${this.state.userId}`)
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
  //   axios.post(`${URL}/friends/${this.state.userId}/${inviteeId}`)
  // }

  render() {
    return (
      <main className="Settings">
        <Link to="/"><h4>Home</h4></Link>
      </main>
    )
  }
}