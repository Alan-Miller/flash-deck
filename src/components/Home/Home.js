import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux'
import { setUserId } from '../../redux/reducer';
import { URL } from '../../services/cardService';
// import { getAllCollections, getAllCards } from '../../services/cardService';

class Home extends Component {

  constructor() {
    super()

    this.logout = this.logout.bind(this);
  }

  componentWillMount() {
    
    // Check for user's auth id
    axios.get('/auth/me').then(response => {
      return response.data.id;
    })
    // Send auth id to db to retrieve user id
    .then(userAuthId => {
      axios.get(`${URL}/user/${userAuthId}`)
      .then(response => {
        const userId = response.data[0].id;
        this.props.setUserId(userId);
        return userId;
      });
    });
    // if (!user) this.props.history.push('/login');

  }

  logout() {
    axios.get('/auth/logout')
    .then(response => {
      console.log(response);
      // this.props.history.push('/login');
    });
  }

  render() {
    return (
      <main className="Home">
        <ul className="Home_ul">
          <h1>Flash Deck</h1>
          <Link to="/play"><li>Play</li></Link>
          <Link to="/quiz"><li>Quiz</li></Link>
          <Link to="/share"><li>Share</li></Link>
          <Link to="/manage"><li>Manage</li></Link>
          <Link to="/settings"><li>Settings</li></Link>
          <Link to=""><li onClick={this.logout} >Log out</li></Link>
        </ul>
      </main>
    )
  }
}

export default connect(null, { setUserId })(Home);