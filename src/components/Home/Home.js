import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { setUserID } from '../../redux/reducer';
import { getUserID } from '../../services/mainService';
const URL = process.env.REACT_APP_LOGIN;

class Home extends Component {
  
  componentDidMount() {
    if (!this.props.userID) {
      getUserID()
      .then(userID => {
        this.props.setUserID(userID);
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
          {/* <Link to="/share"><li>Share</li></Link> */}
          <Link to="/manage"><li>Manage</li></Link>
          {/* <Link to="/settings"><li>Settings</li></Link> */}
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

export default connect(mapStateToProps, { setUserID })(Home);