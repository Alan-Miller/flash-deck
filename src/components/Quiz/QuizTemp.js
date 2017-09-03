import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCards, setDeck } from '../../redux/reducer';

import { getAllCards } from '../../services/cardService';

import { buildDeck } from '../../utils/deckUtils';

import { flip, dropCard, moveCard } from '../../utils/cardUtils';

import Header from '../Header/Header';
import Deck from '../Deck/Deck';

class Quiz extends Component {

  constructor() {
    super()

    this.state = {
      route: 'Quiz'
      ,face: 'front'
      ,firstCardIndex: 0
    }
    this.handleKeyDown= this.handleKeyDown.bind(this);
    this.dropCardAndSetDeck = this.dropCardAndSetDeck.bind(this);
    this.moveCardAndSetDeck = this.moveCardAndSetDeck.bind(this);
  }

  componentDidMount() {
    
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

  handleKeyDown(e) {
    const { route, firstCardIndex } = this.state;
    const card = document.getElementById(firstCardIndex)
    if (!card || firstCardIndex > 51) return;

    this.setState({ pointStyle: '' })

    let { face } = this.state;
    let direction = '';

    if (face === 'front') {
      if ( e.which >= 38 && e.which <= 40 ) { flip(e, firstCardIndex); }
      this.setState({ face: 'back' })
    }
    if (face === 'back') {
      if (e.which === 37)                   { flip(e, firstCardIndex); }
      if (e.which === 38 || e.which === 39) { direction = 'left'; }
      if (e.which === 40)                   { direction = 'right'; }
      this.setState({ face: 'front' })
    } 
    // if (direction && route === 'Play') this.dropCardAndSetDeck(e, direction);
    if (direction && route === 'Quiz') this.moveCardAndSetDeck(e, direction);
  }

  buildAndSetDeck(cards) {
    this.setState({firstCardIndex: 0});
    const deck = buildDeck(cards);
    this.props.setDeck(deck);
  }

  dropCardAndSetDeck(e, direction) {
    const { firstCardIndex } = this.state;
    const firstCard = document.getElementById(firstCardIndex);
    dropCard(e, direction, firstCard); // Drop card
    this.setState(Object.assign( {}, {firstCardIndex: firstCardIndex + 1} )) // Set index
    this.props.setDeck(this.props.currentDeck.splice(0)); // Set deck
  }

  moveCardAndSetDeck(e, direction) {
    const { firstCardIndex } = this.state;
    const firstCard = document.getElementById(firstCardIndex);
    let numToAdd = direction === 'right' ? 1 : direction === 'left' ? -1 : null;
    numToAdd = numToAdd < 0 ? 0 : numToAdd;
    
    moveCard(e, direction, firstCard); // Move card

    this.setState(Object.assign( {}, {firstCardIndex: firstCardIndex + numToAdd} )) // Set index
    // this.props.setDeck(this.props.currentDeck.splice(0)); // Set deck
  }

  render() {

    return (
      <section className="Quiz">
        <Header headerText={this.state.firstCardIndex} />
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

          {!this.props.currentDeck ? null : 
            <Deck 
              currentDeck={this.props.currentDeck} 
              firstCardIndex={this.state.firstCardIndex} 
              text1="Show less"
              buttonFn1={ (e) => {this.dropCardAndSetDeck(e, 'left');} }
              text2="Stop showing"
              buttonFn2={ (e) => {this.dropCardAndSetDeck(e, 'right');} }
            />
          }

          <div className="clickBarrier"></div>
        </main> 
      </section>
    )
  }
}

function mapStateToProps({ userId, cards, currentDeck }) {
  // if (!state) return {};
  return { userId, cards, currentDeck };
}

let outputActions = {
  setCards
  ,setDeck
}

export default connect(mapStateToProps, outputActions)(Quiz);