import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setCards } from '../../../redux/appReducer';
import { 
  setManageState, 
  SET_selectedCardIDs,
  SET_collectionInfo,
  SET_collectionID,
  SET_cardMode,
  SET_reveal, 
  SET_content1,
  SET_content2
} from '../../../redux/manageReducer';
import { unapplyCollection } from '../../../services/collectionService';

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
    this.editCardContent = this.editCardContent.bind(this);
    this.unapplyThisCollection = this.unapplyThisCollection.bind(this);
  }

  handleSelect(cardID) {
    const selectedCardIDs = [...this.props.manageState.selectedCardIDs];
    const index = selectedCardIDs.indexOf(cardID);
    if (this.isACardOnState(cardID)) selectedCardIDs.splice(index, 1);
    else selectedCardIDs.push(cardID);
    this.props.setManageState(SET_selectedCardIDs, selectedCardIDs);
  }

  toggleBool(cardID, colName) {
    switchBool(cardID, colName, this.props.appState.userID)
      .then(cards => { this.props.setCards(cards); })
  }

  unapplyThisCollection(cardsInCollectionsID) {
    unapplyCollection(this.props.appState.userID, cardsInCollectionsID)
    .then(collectionInfo => { 
      this.props.setManageState(SET_collectionInfo, collectionInfo); 
    });
  }

  isACardOnState(cardID) { return this.props.manageState.selectedCardIDs.indexOf(cardID) !== -1; }

  cardFilter(card, index, cards) {
    const info = this.props.manageState.collectionInfo;
    const { collectionID } = this.props.manageState;

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

  editCardContent(face, card) {
    const { setManageState } = this.props;
    setManageState('cardID', card.id)
    setManageState(SET_reveal, false);
    setManageState(SET_cardMode, face)
    if (face === 'front') {
      setManageState(SET_content1, card[face]);
      setManageState(SET_content2, card.back);
    }
    if (face === 'back') {
      setManageState(SET_content1, card.front);
      setManageState(SET_content2, card[face]);
    }
  }

  render() {
    const { setManageState } = this.props;
    const { userID, cards } = this.props.appState;
    const { collectionInfo, scrollY } = this.props.manageState;
    const headerStyles = scrollY > 100 ? 
    {
      'position': 'fixed',
      'left': '50%',
      'transform': 'translate(-50%)',
      'top': '80px',
      'zIndex': '2',
      'height': '50px',
      'width': '80vw'
    } 
    : {};

    return (
      <div className="ManageCards">

        <div className="Manage__card">

          <div className="columnTitles" style={headerStyles}>
            <h2 className="cardTitle L">L</h2>
            <h2 className="cardTitle">Card front</h2>
            <h2 className="cardTitle">Card back</h2>
            <div className="boolTitle">Stop showing</div>
            <div className="boolTitle">Show less</div>
            <div className="deleteTitle">Delete</div>
          </div>
          
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
                  <div 
                    className="edit"
                    onClick={_ => {this.editCardContent("front", card)}}>
                    EDIT
                  </div>
                </div>

                <div className="back cardContent">
                  {card.back}
                  <div 
                    className="edit"
                    onClick={_ => {this.editCardContent("back", card)}}>
                    EDIT
                  </div>
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
                      <span onClick={_ => setManageState(SET_collectionID, info.id)}>{info.name}</span>
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

function mapStateToProps({ appState, manageState }) {
  return {
    appState: {
      userID: appState.userID,
      cards: appState.cards
    },
    manageState: {
      selectedCardIDs: manageState.selectedCardIDs,
      collectionInfo: manageState.collectionInfo,
      scrollY: manageState.scrollY,
      collectionID: manageState.collectionID
    }
  }
}

export default connect(mapStateToProps, { setCards, setManageState })(ManageCards);



/* <h3>Choose an option above, or edit cards directly below.</h3>
<p>PRO TIP: To create many cards at once, simply drag a .csv file and drop it anywhere on this page. Each row of the file will become a new card. The file should have two columns. The first column will become the front of the card, and the second column will become the back.
</p> */