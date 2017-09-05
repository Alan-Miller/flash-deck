import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCards } from '../../redux/reducer';

import { fileReaderUtil } from '../../utils/fileReaderUtil';

import { 
  getAllCards, 
  saveCard, 
  saveCards, 
  switchBool, 
  deleteCard } from '../../services/cardService';

class Manage extends Component {

  constructor() {
    super()

    this.state = {
      userId: 2
      ,front: ''
      ,back: ''
      ,cards: []
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleFileSelect= this.handleFileSelect.bind(this);
  }

  componentDidMount() {
    const dropZone = document.getElementById('dropZone');
    dropZone.addEventListener('dragover', this.handleDragOver);
    dropZone.addEventListener('drop', this.handleFileSelect);
    
    getAllCards(this.state.userId)
      .then(cards => { this.props.setCards(cards); }
    );
  }

  handleInput(e, stateVal) {
    this.setState({ [stateVal]: e.target.value });
  }

  makeCard(front, back) {
    saveCard(this.state.userId, front, back)
      .then(cards => { 
        this.setState({front: '', back: ''}); 
        this.props.setCards(cards);
      });
  }

  toggleBool(cardId, colName) {
    switchBool(cardId, colName, this.state.userId)
      .then(cards => { this.props.setCards(cards); })
  }

  delete(userId, cardId) {
    deleteCard(userId, cardId)
      .then(cards => { this.props.setCards(cards); });
  }

  handleDragOver(e) {
    e.preventDefault();
  }
  
  handleFileSelect(e) {
    const makeNewCards = fileReaderUtil(e);
    setTimeout(() => {
      const newCards = makeNewCards();
      saveCards(this.props.userId, newCards)
      .then(cards => { console.log(cards) });
      let cards = this.props.cards.concat(newCards);
      this.props.setCards(cards);

      setTimeout(() => {
        getAllCards(this.state.userId)
          .then(cards => { this.props.setCards(cards) }
        );
      }, 200);
    }, 200);
  }

  render() {

    return (
      <section className="Manage" id="dropZone">
        <Link to="/"><h1>HOME</h1></Link>
        
        <form className="newCardForm">
          <h1>Make new card</h1>
          <input
            value={this.state.front}
            type="text" placeholder="front"
            onChange={(e) => this.handleInput(e, 'front')}
          />
          <input
            value={this.state.back}
            type="text" placeholder="back"
            onChange={(e) => this.handleInput(e, 'back')}
          />
          <div
            className="makeCard button"
            onClick={() => this.makeCard(this.state.front, this.state.back)}
          >
            Make card
          </div>
        </form>

        <ul className="Manage__cards">
          <h1>Cards</h1>
          <div className="Manage__card">
            
            <div className="columnTitles">
              <h2 className="cardTitle">Card front</h2>
              <h2 className="cardTitle">Card back</h2>
              <div className="boolTitle">Stop showing</div>
              <div className="boolTitle">Show less</div>
              <div className="deleteTitle">Delete</div>
            </div>
            
            { this.props.cards && this.props.cards.map((card, i) => (
              <li key={i} className="cardInfo">
                <div className="front cardContent">{card.front}</div>

                <div className="back cardContent">{card.back}</div>

                <div className="stopShowing bool">
                  <input id="stopShowing"
                    type="checkbox" 
                    checked={card.stop_showing} 
                    onChange={() => this.toggleBool(card.id, 'stop_showing')} />
                  <label for="stopShowing"><span></span></label>
                </div>

                <div className="showLess bool">
                  <input id="showLess"
                    type="checkbox"
                    checked={card.show_less} 
                    onChange={() => this.toggleBool(card.id, 'show_less')} />
                  <label for="showLess"><span></span></label>
                </div>

                <div 
                  className="delete" 
                  onClick={() => this.delete(card.id, this.state.userId)}>
                  X
                </div>
              </li>
            )) }

          </div>
        </ul>
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
}

export default connect(mapStateToProps, outputActions)(Manage);