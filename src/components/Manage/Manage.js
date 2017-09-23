import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCards, setUserID, setCollections, setCollectionInfo } from '../../redux/reducer';

import { fileReaderUtil } from '../../utils/fileReaderUtil';
import { getRank, positionCard, styleCard } from '../../utils/cardStyleUtils';

import { getUserID } from '../../services/mainService';
import { getCollections, getAllCollectionInfo, saveCollection } from '../../services/collectionService';
import { getAllCards, saveCard, saveCards, 
         editCard, switchBool, deleteCard } from '../../services/cardService';

import ManageCards from './Manage__components/ManageCards';
import { Card } from '../Card/Card';
import { flipCard } from '../../utils/deckUtils';
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
      ,reveal: false
    }
    this.edit = this.edit.bind(this);
    this.flip = this.flip.bind(this);
    this.getInfo = this.getInfo.bind(this);
    this.toggleBool = this.toggleBool.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleFileDrop = this.handleFileDrop.bind(this);
    this.deleteThisCard = this.deleteThisCard.bind(this);
    this.makeCollection = this.makeCollection.bind(this);
  }

  componentDidMount() {
    const dropZone = document.getElementById('dropZone');
    dropZone.addEventListener('dragover', this.handleDragOver);
    dropZone.addEventListener('drop', this.handleFileDrop);
    document.addEventListener('keydown', this.handleKeyDown);
    // this.refs.editModal.addEventListener('click', function(e) {
    //   e.stopPropagation();
    // });
    
    
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

  handleKeyDown(e) {
    
    const { content1, content2, reveal } = this.state;

    // Tab flips card and focuses cursor
    // if (e.which === 9 || (e.which === 13 && !reveal)) this.flip();
    if (e.which === 9) this.flip();

    // Return (from back of card) saves card
    if (e.which === 13) {
      e.preventDefault();
      if (content1.length && content2.length) this.makeCard(e, content1, content2);
      else if (content1 && !reveal) this.flip();
      else if (content2 && reveal) this.flip();
    }

    // Esc leaves modal
    if (e.which === 27) { 
      this.setState({editItem: '', content1: '', content2: ''});
    }
  }

  makeCard(e, content1, content2) {
    e.preventDefault();
    if (!content1 || !content2) return;
    
    document.getElementById('frontTextarea').focus();

    saveCard(this.props.userID, content1, content2)
      .then(cards => { 
        this.setState({content1: '', content2: '', reveal: false}); 
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

  flip() {
    this.setState({reveal: !this.state.reveal});
    setTimeout(_ => {
      const textarea = !this.state.reveal ? 
        document.getElementById('frontTextarea') : 
        document.getElementById('backTextarea');
      textarea.focus();
    }, 0);
  }

  render() {
    const { content1, content2, editItem, reveal } = this.state;
    const editCardContent = (face, card) => {
      this.setState({ editItem: face, cardID: card.id, content1: card[face] })
    };
    const $redsuit = `#C24444`;
    const $blacksuit = `#205050`;
    const styleFront = {
      backgroundColor: `#C7C7C7`,
      border: `medium solid whitesmoke`,
      color: $blacksuit,
      boxShadow: `17px 17px 17px 0px rgba(22, 22, 22, .7)`
    };
    const styleBack = styleCard(1, 1, 'back');
    const frontTextarea = document.getElementById('frontTextarea');

    return (
      <section className="Manage" id="dropZone">
        <div className="header">
          <Link to="/"><h1 className="goHome">HOME</h1></Link>

          <ul className="editItems">
            <li onClick={() => {
              this.setState({editItem: 'newCard', reveal: false});
              setTimeout(_ => { frontTextarea.focus(); }, 0);
            }}>
              Make new card
            </li>
            <li onClick={() => this.setState({editItem: 'editCollections'})}>
              Edit collections
            </li>
          </ul>
          
        </div>

        <div className="editModal" ref="editModal"
          style={{display: editItem ? 'flex' : 'none'}}>

          <div className="editBox" style={{display: editItem ? 'flex' : 'none'}}>

            <div className="x"
              style={{opacity: editItem ? 1 : 0}}
              onClick={_ => this.setState({editItem: '', content1: '', content2: ''})}>
              x
            </div>

            <div className="card-container"
              style={positionCard(1, 1, 1)}>

              <div className="card" style={flipCard(1, 1, reveal)}>

                <div className="front face" style={styleFront}>
                  <form className="newCard form" 
                    style={{display: editItem === 'newCard' ? 'flex' : 'none'}}>
                    <textarea id="frontTextarea"
                      value={content1}
                      placeholder="Add content to front"
                      onChange={e => this.handleInput(e, 'content1') }>
                    </textarea>
                  </form>
                </div>

                <div className="back face" style={styleBack}>
                  <form className="newCard form" 
                    style={{display: editItem === 'newCard' ? 'flex' : 'none'}}>
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
              <div onClick={e => this.makeCard(e, content1, content2)}>Save</div>
            </div>

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