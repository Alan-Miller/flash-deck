import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setCards, setCardIDs, setCollectionInfo } from '../../../redux/reducer';
import { unapplyCollection } from '../../../services/collectionService';

import EditContent from './EditContent';
import ColumnTitles from './ColumnTitles';

import { switchBool, deleteCard } from '../../../services/cardService';


class ManageCards extends Component {

  constructor() {
    super() 
    this.state = { selectedCardIDs: [] };
    this.cardFilter = this.cardFilter.bind(this);
    this.toggleBool = this.toggleBool.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.isACardOnState = this.isACardOnState.bind(this);
    this.deleteThisCard = this.deleteThisCard.bind(this);
    this.unapplyThisCollection = this.unapplyThisCollection.bind(this);
  }

  handleSelect(cardID) {
    const selectedCardIDs = [...this.props.selectedCardIDs];
    const index = selectedCardIDs.indexOf(cardID);
    if (this.isACardOnState(cardID)) selectedCardIDs.splice(index, 1);
    else selectedCardIDs.push(cardID);
    this.props.setCardIDs(selectedCardIDs);
  }

  toggleBool(cardID, colName) {
    switchBool(cardID, colName, this.props.userID)
      .then(cards => { this.props.setCards(cards); })
  }

  unapplyThisCollection(cardsInCollectionsID) {
    unapplyCollection(this.props.userID, cardsInCollectionsID)
    .then(collectionInfo => { 
      this.props.setCollectionInfo(collectionInfo); 
    });
  }

  isACardOnState(cardID) { return this.props.selectedCardIDs.indexOf(cardID) !== -1; }

  cardFilter(card, index, cards) {
    const info = this.props.collectionInfo;
    const collectionID = this.props.collectionID;

    // If nothing to filter by, do not filter
    if (!collectionID) return card; 
    // Otherwise, filter cards where card ID and this.state.collectionID match collectionInfo
    else for (let i = 0; i < info.length; i++) {
      if (info[i].card_id === card.id && info[i].id === collectionID) return card;
    }
  }

  deleteThisCard(userID, cardID) {
    deleteCard(userID, cardID)
      .then(cards => { this.props.setCards(cards); });
  }

  render() {
    const { userID, collectionInfo, cards, editCardContent, setParentState } = this.props;

    return (
      <div className="ManageCards">

        <div className="Manage__card">

          <ColumnTitles />
          <ul> 
            {cards && cards.filter(this.cardFilter).map((card, i) => (
              <li key={i} className="cardInfo">

                <div id="select">
                  <input id="select"
                    type="checkbox" 
                    ref={`card${card.id}`}
                    checked={this.isACardOnState(card.id)}
                    onChange={ _ => this.handleSelect(card.id) } />
                  <label htmlFor="select"><span className="checkboxCircle"></span></label>
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
                    onChange={() => this.toggleBool(card.id, 'stop_showing')} />
                  <label htmlFor="stopShowing"><span></span></label>
                </div>

                <div className="showLess bool">
                  <input id="showLess"
                    type="checkbox"
                    checked={card.show_less} 
                    onChange={() => this.toggleBool(card.id, 'show_less')} />
                  <label htmlFor="showLess"><span></span></label>
                </div>

                <div 
                  className="delete" 
                  onClick={() => this.deleteThisCard(card.id, userID)}>
                  X
                </div>
                <div className="collections">
                  { collectionInfo && collectionInfo.filter(info => info.card_id === card.id).map((info, i) => (
                    <div className="collection" key={i} >
                      <span onClick={_ => setParentState('collectionID', info.id)}>{info.name}</span>
                      <span className="unapply" 
                        onClick={() => {this.unapplyThisCollection(info.info_id)}}>
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

function mapStateToProps({ cards, collectionInfo, userID, selectedCardIDs }) {
  return { cards, collectionInfo, userID, selectedCardIDs };
}

export default connect(mapStateToProps, { setCards, setCardIDs, setCollectionInfo })(ManageCards);



/* <h3>Choose an option above, or edit cards directly below.</h3>
<p>PRO TIP: To create many cards at once, simply drag a .csv file and drop it anywhere on this page. Each row of the file will become a new card. The file should have two columns. The first column will become the front of the card, and the second column will become the back.
</p> */