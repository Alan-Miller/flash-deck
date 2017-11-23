import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAppState, SET_deck } from '../../redux/appReducer';
import { getAllCards } from '../../services/cardService';
import { buildDeck } from '../../utils/deckUtils';
import { tallyPoints } from '../../utils/playUtils';
import CardTable from '../CardTable/CardTable';

class Play extends Component {

  constructor() {
    super()
    this.state = {
      currentCardIndex: -1
      ,reveal: true
      ,points: 0
      ,score: 0
    }
    this.advance = this.advance.bind(this);
    this.updateScore = this.updateScore.bind(this);
    this.handleKeyDown= this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
    
    const playMode = true;
    getAllCards(this.props.appState.userID)
    .then(cards => {
      this.props.setAppState(SET_deck, buildDeck(cards, playMode));
    });
  }
  
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  advance(amt) {
    const { deck } = this.props.appState;
    const { currentCardIndex, reveal } = this.state;
    let nextIndex = this.state.currentCardIndex + amt;

    if (amt === 1) {
      if (currentCardIndex >= deck.length) return;
      if (reveal) this.setState({currentCardIndex: nextIndex, reveal: false});
      else this.setState({reveal: true});
    }
    else if (amt === -1) {
      if (currentCardIndex <= -1) this.setState({currentCardIndex: deck.length});
      else {
        if (!reveal) this.setState({currentCardIndex: nextIndex, reveal: true});
        else this.setState({reveal: false});
      }
    }
    else if (!amt) this.setState({reveal: !reveal});
  }

  handleKeyDown(e) {
    // if (e.which === 37) this.advance(-1);
    if (e.which === 38) {
      this.updateScore(true);
      this.advance(1);
    }
    if (e.which === 40) {
      this.updateScore(false);
      this.advance(1);
    }
    if (e.which === 39) { this.setState({reveal: !this.state.reveal})}
  }

  updateScore(correct) {
    const { currentCardIndex, score, reveal } = this.state;
    if (currentCardIndex === -1 || !reveal) return;
    
    const points = tallyPoints(currentCardIndex, correct);
    this.setState({points, score: score + points})
  }

  render() {
    const { currentCardIndex, points, score, reveal } = this.state;
    const { deck } = this.props.appState;
    
    return(
      <section className="Play">

        <div className="header">
          <ul className="info">
            {deck && <li># Cards in deck: {deck.length}</li>}
            <li>Points: {points}</li>
            <li>Score: {score}</li>
          </ul>
        </div>

        <main className="main">

        <CardTable 
          passedProps={ 
            { 
              deck, 
              reveal, 
              currentCardIndex, 
              playMode: true, 
              advance: this.advance, 
              buttonText: ['Right', 'Wrong']
            }
          } />
          
        </main>

        <div className="footer">
          <ul className="nav">
            <Link to="/"><li>Home</li></Link>
            <Link to="/settings"><li><span className="altText">Settings</span></li></Link>
          </ul>
        </div>

      </section>
    )
  }
}

function mapStateToProps({ appState }) {
  return {
    appState: { 
      userID: appState.userID, 
      deck: appState.deck
    }
  }
}
const mapDispatchToProps = { setAppState };

export default connect(mapStateToProps, mapDispatchToProps)(Play);