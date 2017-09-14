import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { setUserId } from '../../redux/reducer';
import { getUserId } from '../../services/mainService';
const URL = process.env.REACT_APP_LOGIN;

class Home extends Component {

  componentDidMount() {
    if (!this.props.userID) {
      getUserId()
      .then(userID => {
        this.props.setUserId(userID);
      })
    }
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
          { this.props.userID ? 
            <a href={URL + '/logout'}><li>Log out</li></a>
            : 
            <a href={URL}><li>Log in</li></a>
          }
        </ul>
      </main>
    )
  }
}

function mapStateToProps({userID}) {
  return {userID};
}

export default connect(mapStateToProps, { setUserId })(Home);