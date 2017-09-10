import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux'
import { setUserId } from '../../redux/reducer';
import { getUserId } from '../../services/mainService';
const URL = process.env.REACT_APP_LOGIN;
// import { getAllCollections, getAllCards } from '../../services/cardService';

class Home extends Component {

  constructor() {
    super()
  }

  componentDidMount() {
    if (!this.props.userId) {
      getUserId()
      .then(userId => {
        this.props.setUserId(userId);
      })
    }
  }

  // logout() {
  //   axios.get('/auth/logout')
  //   .then(response => {
  //     console.log(response);
  //     // this.props.history.push('/login');
  //   });
  // }

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
          { this.props.userId ? 
            <a href={URL + '/logout'}><li>Log out</li></a>
            : 
            <a href={URL}><li>Log in</li></a>
          }
        </ul>
      </main>
    )
  }
}

function mapStateToProps({userId}) {
  return {userId};
}

export default connect(mapStateToProps, { setUserId })(Home);