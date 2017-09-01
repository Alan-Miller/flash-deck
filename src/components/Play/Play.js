import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCards, setDeckInPlay } from '../../redux/reducer';

import { getAllCards } from '../../services/cardService';

import { buildDeck } from '../../utils/deckUtils';
import { flip, dropCard } from '../../utils/cardUtils';
import { tallyPoints } from '../../utils/playUtils';

import Header from '../Header/Header';
import Deck from '../Deck/Deck';

class Play extends Component {

  constructor() {
    super()

    this.state = {
      firstCardIndex: 0
      ,face: 'front'
      ,score: 0
      ,points: 0
      ,pointStyle: ''
      ,displayName: ''
    }
    this.handleKeyDown= this.handleKeyDown.bind(this);
    this.dropCardAndSetDeck = this.dropCardAndSetDeck.bind(this);
    this.updateScore = this.updateScore.bind(this);
  }

  componentDidMount() {
    // getDisplayName().then(displayName => { this.setState({ displayName }) });
    
    document.addEventListener('keydown', this.handleKeyDown);

    getAllCards(this.props.userId)
      .then(cards => { 
        this.props.setCards(cards);
        const promise = new Promise((resolve, reject) => {
          if (this.props.cards) resolve('Cards are now on props');
          else reject(new Error('Something bad happened'));
        });
        promise.then(fulfilled => {this.buildAndSetDeck(this.props.cards);});
      }
    );

  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  updateScore(sign) {
    const { points, pointStyle } = tallyPoints(this.state.firstCardIndex, sign);
    const score = this.state.score + points;
    this.setState({points, score, pointStyle});
  }


  handleKeyDown(e) {
    const firstIndex = this.state.firstCardIndex;
    const card = document.getElementById(firstIndex)
    if (!card || firstIndex > 51) return;

    this.setState({ pointStyle: '' })

    let { face } = this.state;
    let direction = '';

    if (face === 'front') {
      if ( e.which >= 38 && e.which <= 40 ) { flip(e, firstIndex); }
      this.setState({ face: 'back' })
    }
    if (face === 'back') {
      if (e.which === 37)                   { flip(e, firstIndex); }
      if (e.which === 38 || e.which === 39) { direction = 'left'; this.updateScore(1); }
      if (e.which === 40)                   { direction = 'right'; this.updateScore(-1); }
      this.setState({ face: 'front' })
    } 
    direction && this.dropCardAndSetDeck(e, direction);
  }

  buildAndSetDeck(cards) {
    this.setState({firstCardIndex: 0, score: 0});
    const playMode = true;
    const deck = buildDeck(cards, playMode);
    this.props.setDeckInPlay(deck);
  }

  dropCardAndSetDeck(e, direction) {
    const { firstCardIndex } = this.state;
    const firstCard = document.getElementById(firstCardIndex);
    dropCard(e, direction, firstCard); // Drop card
    this.setState(Object.assign( {}, {firstCardIndex: firstCardIndex + 1} )) // Set index
    this.props.setDeckInPlay(this.props.deckInPlay.splice(0)); // Set deck
  }

  render() {

    return (
      <section className="Play">
        <Header 
          score={this.state.score} 
          points={this.state.points} 
          pointStyle={this.state.pointStyle} 
        />
        <main className="main">
          <div 
            className="button" 
            onClick={() => this.buildAndSetDeck(this.props.cards)}>
            Make random deck
          </div>

          <div className="nav">
            <h2>PLAY COMPONENT</h2>
            <Link to="/"><h4>Home</h4></Link>
          </div>

          {!this.props.deckInPlay ? null : 
            <Deck 
              deckInPlay={this.props.deckInPlay} 
              firstCardIndex={this.state.firstCardIndex} 
              text1="Right"
              buttonFn1={(e) => { 
                this.dropCardAndSetDeck(e, 'left'); 
                this.updateScore(1); }
              }
              text2="Wrong"
              buttonFn2={(e) => {
                this.dropCardAndSetDeck(e, 'right'); 
                this.updateScore(-1); }
              }
            />
          }

          <div className="clickBarrier"></div>
        </main> 
      </section>
    )
  }
}

function mapStateToProps({ userId, cards, deckInPlay }) {
  // if (!state) return {};
  return { userId, cards, deckInPlay };
}

let outputActions = {
  setCards
  ,setDeckInPlay
}

export default connect(mapStateToProps, outputActions)(Play);