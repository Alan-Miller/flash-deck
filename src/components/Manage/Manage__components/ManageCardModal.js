import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setAppState, SET_cards } from '../../../redux/appReducer';
import { 
  setManageState, 
  SET_reveal, 
  SET_content1, 
  SET_content2, 
  SET_cardMode 
} from '../../../redux/manageReducer';

import { fileReaderUtil } from '../../../utils/fileReaderUtil';
import { positionCard, styleCard } from '../../../utils/cardStyleUtils';

import { saveCollection } from '../../../services/collectionService';
import { getAllCards, saveCard, saveCards, editCard } from '../../../services/cardService';

import { flipCard } from '../../../utils/deckUtils';
import ApplyCollections from '../Manage__components/ApplyCollections';

class ManageCardModal extends Component {

  constructor() {
    super()
    this.flip = this.flip.bind(this);
    this.editCard = this.editCard.bind(this);
    this.makeCard = this.makeCard.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleFileDrop = this.handleFileDrop.bind(this);
    this.makeCollection = this.makeCollection.bind(this);
  }

  componentDidMount() {
    const dropZone = document.getElementById('dropZone');
    dropZone.addEventListener('dragover', this.handleDragOver);
    dropZone.addEventListener('drop', this.handleFileDrop);
    document.addEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(e) {
    const { reveal, content1, content2, cardMode } = this.props.manageState;
    const { setManageState } = this.props;

    // 'Tab' flips card and focuses cursor
    if (e.which === 9) this.flip();

    // 'Return' (from back of card) saves card
    if (e.which === 13) {
      e.preventDefault();
      if (content1.length && content2.length) {
        if (cardMode === 'newCard') this.makeCard();
        if (cardMode === 'front' || cardMode === 'back') this.editCard();
      }
      else if ((content1 && !reveal) || (content2 && reveal)) this.flip();
    }

    // 'Esc' leaves modal
    if (e.which === 27) { 
      setManageState(SET_cardMode, '');
      setManageState(SET_content1, '');
      setManageState(SET_content2, '');
    }
  }

  flip() {
    this.props.setManageState(SET_reveal, !this.props.manageState.reveal);
    setTimeout(_ => {
      const textarea = !this.props.manageState.reveal ? 
        document.getElementById('frontTextarea') : 
        document.getElementById('backTextarea');
      textarea.focus();
    }, 0);
  }

  editCard() {
    const { userID } = this.props.appState;
    const { cardID, content1, content2, cardMode } = this.props.manageState;
    const newContent = cardMode === 'front' ? content1 : content2;
    const { setManageState } = this.props;
    // if (cardMode === 'back') this.flip();

    editCard(cardMode, newContent, cardID, userID)
    .then(cards => {
      setManageState(SET_content1, '');
      setManageState(SET_content2, '');
      setManageState(SET_cardMode, '');
      this.props.setAppState(SET_cards, cards);
    })
  }

  makeCard() {
    const { userID } = this.props.appState;
    const { content1, content2 } = this.props.manageState;
    const { setManageState } = this.props;

    if (!content1 || !content2) return;

    document.getElementById('frontTextarea').focus();
    saveCard(userID, content1, content2)
      .then(cards => { 
        setManageState(SET_reveal, false);
        setManageState(SET_content1, '');
        setManageState(SET_content2, '');
        this.props.setAppState(SET_cards, cards);
      });
  }

  handleFileDrop(e) {
    e.preventDefault();
    const readFile = fileReaderUtil(e);

    setTimeout(() => {
      let createNewCards = async () => {
        const newCards = await readFile();
        await saveCards(this.props.appState.userID, newCards);
        let cards = this.props.appState.cards.concat(newCards);
        this.props.setAppState(SET_cards, cards);
      }
      createNewCards()
      .then(_ => getAllCards(this.props.appState.userID))
      .then(cards => { this.props.setAppState(SET_cards, cards) })
    }, 100);
  }

  handleDragOver(e) {
    console.log('e', e);
    e.preventDefault();
  }

  makeCollection(e) {
    e.preventDefault();
    const { userID } = this.props.appState;
    const { content1 } = this.props.manageState;

    document.getElementById('newCollectionFocus').focus();

    saveCollection(userID, content1)
      .then(collections => { 
        this.props.setManageState(SET_content1, '');
        this.props.setCollections(collections);
      });
  }

  render() {
    const { reveal, content1, content2, cardMode } = this.props.manageState;  
    const { setManageState } = this.props; 
    // const $redsuit = `#C24444`;
    const $blacksuit = `#205050`;
    const styleFront = {
      backgroundColor: `#C7C7C7`,
      border: `medium solid whitesmoke`,
      color: $blacksuit,
      boxShadow: `17px 17px 17px 0px rgba(22, 22, 22, .7)`
    };
    const styleBack = styleCard(1, 1, 'back');


    return (
      <div className="editModal" ref="editModal" id="dropZone"
        style={{display: cardMode ? 'flex' : 'none'}}>

        <div className="editBox" style={{display: cardMode ? 'flex' : 'none'}}>

          <div className="x"
            style={{opacity: cardMode ? 1 : 0}}
            onClick={_ => {
              setManageState(SET_cardMode, '');
              setManageState(SET_content1, '');
              setManageState(SET_content2, '');
            }}>
            x
          </div>

          <div className="card-container"
            style={positionCard(1, 1, 1)}>

            <div className="card" style={flipCard(1, 1, reveal)}>

              <div className="front face" style={styleFront}>
                <form className="newCard form" 
                  style={{display: cardMode ? 'flex' : 'none'}}>
                  <textarea id="frontTextarea"
                    value={content1}
                    placeholder="Add content to front"
                    onChange={e => this.props.setManageState(SET_content1, e.target.value) }>
                  </textarea>
                </form>
              </div>

              <div className="back face" style={styleBack}>
                <form className="newCard form" 
                  style={{display: cardMode ? 'flex' : 'none'}}>
                  <textarea id="backTextarea"
                    value={content2}
                    placeholder="Add content to back"
                    onChange={e => this.props.setManageState(SET_content2, e.target.value) }>
                  </textarea>
                </form>
              </div>

            </div>

          </div> 

          <div className="flipButtonContainer">
            <div onClick={this.flip}>Flip</div>
            <span>Click to flip, or press 'Tab'</span>
          </div>
          <div className="saveButtonContainer">
            <span>Click to save, or press 'Return'</span>
            <div onClick={cardMode === 'newCard' ? this.makeCard : this.editCard}>Save</div>
          </div>

          <div className="editCollections"
            style={{display: cardMode === 'editCollections' ? 'flex' : 'none'}}>
            <form className="newCollection form" onSubmit={this.makeCollection}>
              <input id="newCollectionFocus"
                value={content1}
                type="text" placeholder="Name of collection"
                onChange={e => this.handleInput(e, 'content1') }/>
              <input className="submit" type="submit" />
              <div
                className="makeCollection button"
                onClick={this.makeCollection}>
                Save
              </div>
            </form>
            
          </div>

          <ApplyCollections content={content1} cardMode={cardMode} makeCollection={this.makeCollection} />
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
      reveal: manageState.reveal,
      cardID: manageState.cardID,
      content1: manageState.content1,
      content2: manageState.content2,
      cardMode: manageState.cardMode
    }
  }
}
const mapDispatchToProps = { setAppState, setManageState };

export default connect(mapStateToProps, mapDispatchToProps)(ManageCardModal);