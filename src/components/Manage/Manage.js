import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCards, setUserID, setCollections, setCollectionInfo } from '../../redux/reducer';

import { fileReaderUtil } from '../../utils/fileReaderUtil';

import { getUserID } from '../../services/mainService';
import { getCollections, getAllCollectionInfo, saveCollection } from '../../services/collectionService';
import { getAllCards, saveCard, saveCards, 
         editCard, switchBool, deleteCard } from '../../services/cardService';

import ManageCards from './Manage__components/ManageCards';
import CollectionsList from './Manage__components/CollectionsList';
import ApplyCollections from './Manage__components/ApplyCollections';

class Manage extends Component {

  constructor() {
    super()

    this.state = {
      content1: ''
      ,content2: ''
      ,editItem: ''
      ,collections: []
    }
    this.edit = this.edit.bind(this);
    this.getInfo = this.getInfo.bind(this);
    this.toggleBool = this.toggleBool.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleFileDrop = this.handleFileDrop.bind(this);
    this.deleteThisCard = this.deleteThisCard.bind(this);
    this.makeCollection = this.makeCollection.bind(this);
  }

  componentDidMount() {
    const dropZone = document.getElementById('dropZone');
    dropZone.addEventListener('dragover', this.handleDragOver);
    dropZone.addEventListener('drop', this.handleFileDrop);
    
    if (this.props.userID) this.getInfo(this.props.userID);
    else {
      getUserID()
      .then(userID => {
        this.props.setUserID(userID);
        this.getInfo(userID);
      })
    }
  }

  getInfo(userID) {
    getAllCards(userID)
      .then(cards => { this.props.setCards(cards); }
    );
    getCollections(userID)
      .then(collections => { this.props.setCollections(collections); }
    );
    getAllCollectionInfo(userID)
      .then(collectionInfo => { this.props.setCollectionInfo(collectionInfo); }
    );
  }

  handleInput(e, stateVal) {
    this.setState({ [stateVal]: e.target.value });
  }

  makeCard(e, front, back) {
    e.preventDefault();
    if (!front || !back) return;
    
    document.getElementById('newCardFocus').focus();

    saveCard(this.props.userID, front, back)
      .then(cards => { 
        this.setState({content1: '', content2: ''}); 
        this.props.setCards(cards);
      });
  }

  makeCollection(e) {
    e.preventDefault();
    const { content1 } = this.state;
    const { userID } = this.props;

    document.getElementById('newCollectionFocus').focus();

    saveCollection(userID, content1)
      .then(collections => { 
        this.setState({content1: ''}); 
        this.props.setCollections(collections);
      });
  }

  edit(e) {
    e.preventDefault();
    const { editItem, content2, cardID } = this.state;
    const { userID } = this.props;

    editCard(editItem, content2, cardID, userID)
    .then(cards => {
      this.setState({content2: '', editItem: ''});
      this.props.setCards(cards);
    })
  }

  toggleBool(cardID, colName) {
    switchBool(cardID, colName, this.props.userID)
      .then(cards => { this.props.setCards(cards); })
  }

  deleteThisCard(userID, cardID) {
    deleteCard(userID, cardID)
      .then(cards => { this.props.setCards(cards); });
  }

  handleDragOver(e) {
    e.preventDefault();
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

  render() {
    const { content1, content2, editItem } = this.state;
    const editCardContent = (face, card) => {
      this.setState({ editItem: face, cardID: card.id, content1: card[face] })
    };

    return (
      <section className="Manage" id="dropZone">
        <div className="header" style={{height: editItem ? '400px': null}}>

          <Link to="/"><h1 className="goHome">HOME</h1></Link>

          <ul className="editItems" style={{display: !editItem ? 'flex' : 'none'}}>
            <li onClick={() => { this.setState({editItem: 'newCard'}); }}>Make new card</li>
            <li onClick={() => this.setState({editItem: 'editCollections'})}>Edit collections</li>
          </ul>

          <div className="x" 
            style={{opacity: editItem ? 1 : 0}}
            onClick={() => this.setState({editItem: ''})}>
            x
          </div>

          <div className="editBox" style={{display: editItem ? 'flex' : 'none'}}>

            <form className="newCard form" 
              style={{display: editItem === 'newCard' ? 'flex' : 'none'}}
              onSubmit={e => this.makeCard(e, content1, content2) }>
              <h1>Make new card</h1>
              <input id="newCardFocus"
                value={content1}
                type="text" placeholder="front"
                onChange={e => this.handleInput(e, 'content1') }/>
              <input
                value={content2}
                type="text" placeholder="back"
                onChange={e => this.handleInput(e, 'content2') }/>
              <input className="submit" type="submit" />
              <div
                className="makeCard button"
                onClick={ e => this.makeCard(e, content1, content2) }>
                Save card
              </div>
            </form>

            <form className="editCard form" 
              onSubmit={this.edit}
              style={{display: editItem === 'front' || editItem === 'back' ? 'flex' : 'none'}}>
              <h1>Edit content for { editItem } of card</h1>
              <div className="inputAndButton">
                <input
                  value={content2}
                  type="text" placeholder="New content"
                  onChange={e => this.handleInput(e, 'content2') }/>
                <input className="submit" type="submit" />
                <div
                  className="editCard button"
                  onClick={this.edit}>
                  Edit card
                </div>
              </div>
              <div className="currentContent">
                <p>Current content:</p>
                <p>{content1}</p>
              </div>
            </form>

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

        <ManageCards 
          setToApply={() => this.setState({editItem: 'applyCollections'})}
          setToEdit={() => this.setState({editItem: 'editCollections'})}
          editItem={editItem}
          deleteThisCard={this.deleteThisCard} 
          editCardContent={editCardContent} 
          toggleBool={this.toggleBool}
        />

      </section>
    )
  }
}

function mapStateToProps({ userID, cards, collections }) {
  return { userID, cards, collections };
}

let outputActions = {
  setCards, setUserID, setCollections, setCollectionInfo
}

export default connect(mapStateToProps, outputActions)(Manage);