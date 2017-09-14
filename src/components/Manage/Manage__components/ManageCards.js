import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setCardIDs } from '../../../redux/reducer';

import EditContent from './EditContent';
import ColumnTitles from './ColumnTitles';

class ManageCards extends Component {

  constructor() {
    super() 
    this.state = { selectedCardIDs: [] };
    this.handleSelect = this.handleSelect.bind(this);
    this.isACardOnState = this.isACardOnState.bind(this);
    // this.isChecked = this.isChecked.bind(this);
  }

  handleSelect(cardId) {
    const selectedCardIDs = [...this.props.selectedCardIDs];
    const index = selectedCardIDs.indexOf(cardId);
    if (this.isACardOnState(cardId)) selectedCardIDs.splice(index, 1);
    else selectedCardIDs.push(cardId);
    this.props.setCardIDs(selectedCardIDs);
  }

  isACardOnState(cardId) { return this.props.selectedCardIDs.indexOf(cardId) !== -1; }
  // isChecked(cardId) { return this.refs[`card${cardId}`].checked; }

  render() {
    const { userId, cards, editCardContent, 
            toggleBool, deleteThis, setToEdit, setToApply, editItem } = this.props;

    return (
      <div className="Manage__cards" style={{marginTop: editItem ? '440px' : null}}>
        <h3>Choose an option above, or edit cards directly below.</h3>
        <p>PRO TIP: To create many cards at once, simply drag a .csv file and drop it anywhere on this page. Each row of the file will become a new card. The file should have two columns. The first column will become the front of the card, and the second column will become the back.
        </p>

        <div className="Manage__card">

          <div className="editOptions">
            <div className="applyCollections" 
              onClick={setToApply}>
              Add card to collection
            </div>
            <div className="editCollections" 
              onClick={setToEdit}>
              Edit collections
            </div>
          </div>

          <ColumnTitles />
          <ul> 
            {cards && cards.map((card, i) => (
              <li key={i} className="cardInfo">

                <div className="select">
                  <input id="select"
                    type="checkbox" 
                    ref={`card${card.id}`}
                    checked={this.isACardOnState(card.id)}
                    onChange={ _ => this.handleSelect(card.id) } />
                  <label htmlFor="select"><span></span></label>
                </div>

                <div className="front cardContent">
                  {card.front}
                  <EditContent onClick={_ => {editCardContent("front", card)}} />
                </div>

                <div className="back cardContent">
                  {card.back}
                  <EditContent onClick={_ => {editCardContent("back", card)}} />
                </div>

                <div className="stopShowing bool">
                  <input id="stopShowing"
                    type="checkbox" 
                    checked={card.stop_showing} 
                    onChange={() => toggleBool(card.id, 'stop_showing')} />
                  <label htmlFor="stopShowing"><span></span></label>
                </div>

                <div className="showLess bool">
                  <input id="showLess"
                    type="checkbox"
                    checked={card.show_less} 
                    onChange={() => toggleBool(card.id, 'show_less')} />
                  <label htmlFor="showLess"><span></span></label>
                </div>

                <div 
                  className="delete" 
                  onClick={() => deleteThis(card.id, userId)}>
                  X
                </div>
                <div className="collections">
                  Collections:
                </div>
              </li>
            ))}
          </ul>

          
        </div>
      </div>
      

      
    )
  }
}

function mapStateToProps({ cards, userId, selectedCardIDs }) {
  return { cards, userId, selectedCardIDs };
}

export default connect(mapStateToProps, { setCardIDs })(ManageCards);