import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { setAppState, SET_userID } from '../../redux/appReducer';
import { getUserID } from '../../services/mainService';
const URL = process.env.REACT_APP_LOGIN;

class Home extends Component {
  
  componentDidMount() {
    if (!this.props.appState.userID) {
      getUserID()
      .then(userID => {
        console.log('THE USER ID ', userID);
        this.props.setAppState(SET_userID, userID);
      })
    }
  }

  render() {
    return (
      <main className="Home">
        <ul className="Home_ul">
          <h1>Flash Deck</h1>
          <Link to="/play"><li>Play</li></Link>
          <Link to="/manage"><li>Manage</li></Link>
          
          { this.props.appState.userID ? 
            <a href={URL + '/logout'}><li>Log out</li></a>
            : 
            <a href={URL}><li>Log in</li></a>
          }
        </ul>
      </main>
    )
  }
}

function mapStateToProps({ appState }) {
  return {
    appState: { userID: appState.userID }
  }
}
const mapDispatchToProps = { setAppState };

export default connect(mapStateToProps, mapDispatchToProps)(Home);


// <Link to="/share"><li>Share</li></Link>
// <Link to="/settings"><li>Settings</li></Link>