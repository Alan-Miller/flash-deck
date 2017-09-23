import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setCardIDs } from '../../../redux/reducer';
import { unapplyCollection } from '../../../services/collectionService';

import EditContent from './EditContent';
import ColumnTitles from './ColumnTitles';

class ManageCards extends Component {

  constructor() {
    super() 
    this.state = { selectedCardIDs: [] };
    this.cardFilter = this.cardFilter.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.isACardOnState = this.isACardOnState.bind(this);
    this.unapplyThisCollection = this.unapplyThisCollection.bind(this);
  }

  handleSelect(cardID) {
    const selectedCardIDs = [...this.props.selectedCardIDs];
    const index = selectedCardIDs.indexOf(cardID);
    if (this.isACardOnState(cardID)) selectedCardIDs.splice(index, 1);
    else selectedCardIDs.push(cardID);
    this.props.setCardIDs(selectedCardIDs);
  }

  unapplyThisCollection(userID) {
    unapplyCollection(userID)
    .then(collections => { this.props.setCollections(collections); });
  }

  isACardOnState(cardID) { return this.props.selectedCardIDs.indexOf(cardID) !== -1; }

  cardFilter(card, index, cards) {
    const info = this.props.collectionInfo;
    console.log('card', card)
    console.log('info', info) // card_id, id 18, name
    if (!this.state.filter) return card;
    else for (let i = 0; i < info.length; i++) {
      if (info[i].card_id === card.id && info[i].id === this.state.filter) return card;
    }
  }

  render() {
    const { 
      userID, collections, collectionInfo, cards, editCardContent, 
      deleteThisCard, setParentState, toggleBool, editItem 
    } = this.props;

    return (
      <div className="Manage__cards">
        <h3>Choose an option above, or edit cards directly below.</h3>
        <p>PRO TIP: To create many cards at once, simply drag a .csv file and drop it anywhere on this page. Each row of the file will become a new card. The file should have two columns. The first column will become the front of the card, and the second column will become the back.
        </p>

        <div className="Manage__card">

          <div className="editOptions">
            <div className="applyCollections" 
              onClick={_ => setParentState('editItem', 'applyCollections')}>
              Add card to collection
            </div>
            <div className="editCollections" 
              onClick={_ => setParentState('editItem', 'editCollections')}>
              Edit collections
            </div>
          </div>

          <ColumnTitles />
          <ul> 
            {cards && cards.filter(this.cardFilter).map((card, i) => (
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
                  onClick={() => deleteThisCard(card.id, userID)}>
                  X
                </div>
                <div className="collections">
                  { collectionInfo && collectionInfo.filter(info => info.card_id === card.id).map((info, i) => (
                    <div className="collection" key={i} onClick={_ => this.setState({filter: info.id})} >
                      {info.name}
                      <span className="unapply" 
                        onClick={() => this.unapplyThisCollection(userID)}>
                        x
                      </span>
                    </div>
                  ))}
                </div>

              </li>
            ))}
          </ul>

          
        </div>
      </div>
      

      
    )
  }
}

function mapStateToProps({ cards, collections, collectionInfo, userID, selectedCardIDs }) {
  return { cards, collections, collectionInfo, userID, selectedCardIDs };
}

export default connect(mapStateToProps, { setCardIDs })(ManageCards);