import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { getAllCards, saveCard, switchBool, deleteCard } from '../services/cardService';

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
  }

  componentDidMount() {
    getAllCards(this.state.userId)
      .then(cards => { this.setState({cards}) });
  }

  handleInput(e, stateVal) {
    this.setState({ [stateVal]: e.target.value });
  }

  makeCard(front, back) {
    saveCard(this.state.userId, front, back)
      .then(cards => { this.setState({cards, front: '', back: ''}) });
  }

  toggleBool(cardId, colName) {
    switchBool(cardId, colName, this.state.userId)
      .then(cards => { this.setState({cards}) })
  }

  delete(userId, cardId) {
    deleteCard(userId, cardId)
      .then(cards => { this.setState({cards}) });
  }

  render() {

    return (
      <div className="Manage">
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

        <ul className="collections">
          <h1>Card collections</h1>
          <div className="collection">
            
            <div className="columnNames">
              <h2 className="collectionName">All cards</h2>
              <div className="bool">Stop showing</div>
              <div className="bool">Show less</div>
            </div>
            
            { this.state.cards.map((card, i) => (
              <li key={i} className="card">
                <div className="cardFaces">
                  <div className="front">{card.front}</div>
                  <div className="back">{card.back}</div>
                </div>
                <div 
                  className="stopShowing bool" 
                  onClick={() => this.toggleBool(card.id, 'stop_showing')}
                >
                  {card.stop_showing ? '√' : '-'}
                </div>
                <div 
                  className="showLess bool" 
                  onClick={() => this.toggleBool(card.id, 'show_less')}
                >
                  {card.show_less ? '√' : '-'}
                </div>
                <div 
                  className="delete" 
                  onClick={() => this.delete(card.id, this.state.userId)}
                >
                  DELETE
                </div>
              </li>
            )) }

          </div>
        </ul>
      </div>
    )
  }
}

export default Manage;