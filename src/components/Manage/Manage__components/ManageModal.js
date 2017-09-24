import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setCards } from '../../../redux/reducer';

import { fileReaderUtil } from '../../../utils/fileReaderUtil';
import { positionCard, styleCard } from '../../../utils/cardStyleUtils';

import { saveCollection } from '../../../services/collectionService';
import { getAllCards, saveCard, saveCards, editCard } from '../../../services/cardService';

import { flipCard } from '../../../utils/deckUtils';
import CollectionsList from '../Manage__components/CollectionsList';
import ApplyCollections from '../Manage__components/ApplyCollections';

class ManageModal extends Component {

  constructor() {
    super()

    this.flip = this.flip.bind(this);
    this.editCard = this.editCard.bind(this);
    this.makeCard = this.makeCard.bind(this);
    this.handleInput = this.handleInput.bind(this);
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
    const { content1, content2, reveal, editItem } = this.props;

    // Tab flips card and focuses cursor
    if (e.which === 9) this.flip();

    // Return (from back of card) saves card
    if (e.which === 13) {
      e.preventDefault();
      if (content1.length && content2.length) {
        if (editItem === 'newCard') this.makeCard();
        if (editItem === 'front' || editItem === 'back') this.editCard();
      }
      else if ((content1 && !reveal) || (content2 && reveal)) this.flip();
    }

    // Esc leaves modal
    if (e.which === 27) { 
      this.props.setParentState('editItem', '');
      this.props.setParentState('content1', '');
      this.props.setParentState('content2', '');
    }
  }

  flip() {
    this.props.setParentState('reveal', !this.props.reveal);
    setTimeout(_ => {
      const textarea = !this.props.reveal ? 
        document.getElementById('frontTextarea') : 
        document.getElementById('backTextarea');
      textarea.focus();
    }, 0);
  }

  editCard() {
    const { editItem, content1, content2, cardID } = this.props;
    console.log('id in ManageModal', cardID);
    const { userID } = this.props;
    const newContent = editItem === 'front' ? content1 : content2;

    editCard(editItem, newContent, cardID, userID)
    .then(cards => {
      this.props.setParentState('editItem', '');
      this.props.setParentState('content1', '');
      this.props.setParentState('content2', '');
      this.props.setCards(cards);
    })
  }

  makeCard() {
    const { content1, content2 } = this.props;
    if (!content1 || !content2) return;

    document.getElementById('frontTextarea').focus();

    saveCard(this.props.userID, content1, content2)
      .then(cards => { 
        // this.props.setParentState('editItem', ''); // Closes modal after making a card
        this.props.setParentState('content1', '');
        this.props.setParentState('content2', '');
        this.props.setParentState('reveal', false);
        this.props.setCards(cards);
      });
  }

  handleInput(e, stateVal) {
    this.props.setParentState(stateVal, e.target.value);
  }

  handleFileDrop(e) {
    const readFile = fileReaderUtil(e);

    setTimeout(() => {
      let createNewCards = async () => {
        const newCards = await readFile();
        await saveCards(this.props.userID, newCards);
        let cards = this.props.cards.concat(newCards);
        this.props.setCards(cards);
      }
      createNewCards()
      .then(_ => getAllCards(this.props.userID))
      .then(cards => { this.props.setCards(cards) })
    }, 100);
  }

  handleDragOver(e) {
    e.preventDefault();
  }

  makeCollection(e) {
    e.preventDefault();
    const { userID, content1 } = this.props;

    document.getElementById('newCollectionFocus').focus();

    saveCollection(userID, content1)
      .then(collections => { 
        // this.setState({content1: ''}); 
        this.props.setParentState(content1, '');
        this.props.setCollections(collections);
      });
  }

  render() {
    const { content1, content2, reveal, editItem } = this.props;
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
        style={{display: editItem ? 'flex' : 'none'}}>

        <div className="editBox" style={{display: editItem ? 'flex' : 'none'}}>

          <div className="x"
            style={{opacity: editItem ? 1 : 0}}
            onClick={_ => {
              this.props.setParentState('editItem', '');
              this.props.setParentState('content1', '');
              this.props.setParentState('content2', '');
            }}>
            x
          </div>

          <div className="card-container"
            style={positionCard(1, 1, 1)}>

            <div className="card" style={flipCard(1, 1, reveal)}>

              <div className="front face" style={styleFront}>
                <form className="newCard form" 
                  style={{display: editItem ? 'flex' : 'none'}}>
                  <textarea id="frontTextarea"
                    value={content1}
                    placeholder="Add content to front"
                    onChange={e => this.handleInput(e, 'content1') }>
                  </textarea>
                </form>
              </div>

              <div className="back face" style={styleBack}>
                <form className="newCard form" 
                  style={{display: editItem ? 'flex' : 'none'}}>
                  <textarea id="backTextarea"
                    value={content2}
                    placeholder="Add content to back"
                    onChange={e => this.handleInput(e, 'content2') }>
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
            <div onClick={this.makeCard}>Save</div>
          </div>

          <div className="editCollections"
            style={{display: editItem === 'editCollections' ? 'flex' : 'none'}}>
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
            <CollectionsList editItem={editItem} />
          </div>

          <ApplyCollections content={content1} editItem={editItem} makeCollection={this.makeCollection} />
        </div>
      </div>
    )
  }
}

function mapStateToProps({userID}) {
  return { userID }
}

export default connect(mapStateToProps, { setCards })(ManageModal);