import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCards, setUserId } from '../../redux/reducer';

import { fileReaderUtil } from '../../utils/fileReaderUtil';

import { getUserId } from '../../services/mainService';
import { 
  getAllCards, saveCard, saveCards, editCard,
  getAllCollections, saveCollection, 
  switchBool, deleteCard } from '../../services/cardService';

class Manage extends Component {

  constructor() {
    super()

    this.state = {
      front: ''
      ,back: ''
      ,name: ''
      ,content: ''
      ,editItem: ''
      ,oldContent: ''
      ,collections: []
    }
    this.handleInput = this.handleInput.bind(this);
    this.edit = this.edit.bind(this);
    this.getInfo = this.getInfo.bind(this);
    this.makeCollection = this.makeCollection.bind(this);
    this.handleFileDrop= this.handleFileDrop.bind(this);
  }

  componentDidMount() {
    const dropZone = document.getElementById('dropZone');
    dropZone.addEventListener('dragover', this.handleDragOver);
    dropZone.addEventListener('drop', this.handleFileDrop);
    
    if (this.props.userId) this.getInfo(this.props.userId);
    else {
      getUserId()
      .then(userId => {
        this.props.setUserId(userId);
        this.getInfo(userId);
      })
    }
  }

  getInfo(userId) {
    getAllCards(userId)
      .then(cards => { this.props.setCards(cards); }
    );
    getAllCollections(userId)
      .then(collections => { this.setState({ collections }); }
    );
  }

  handleInput(e, stateVal) {
    this.setState({ [stateVal]: e.target.value });
  }

  makeCard(e, front, back) {
    e.preventDefault();
    if (!front || !back) return;
    
    document.getElementById('newCardFocus').focus();

    saveCard(this.props.userId, front, back)
      .then(cards => { 
        this.setState({front: '', back: ''}); 
        this.props.setCards(cards);
      });
  }

  makeCollection(e) {
    e.preventDefault();
    const { name, content } = this.state;
    const { userId } = this.props;

    document.getElementById('newCollectionFocus').focus();

    saveCollection(userId, name, content)
      .then(collections => { 
        this.setState({collections, name: '', content: ''}); 
      });
  }

  edit(e) {
    e.preventDefault();
    const { editItem, content, cardId } = this.state;
    const { userId } = this.props;

    editCard(editItem, content, cardId, userId)
    .then(cards => {
      this.setState({content: '', editItem: ''});
      this.props.setCards(cards);
    })
  }

  toggleBool(cardId, colName) {
    switchBool(cardId, colName, this.props.userId)
      .then(cards => { this.props.setCards(cards); })
  }

  delete(userId, cardId) {
    deleteCard(userId, cardId)
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
        await saveCards(this.props.userId, newCards);
        let cards = this.props.cards.concat(newCards);
        this.props.setCards(cards);
      }
      createNewCards()
      .then(_ => getAllCards(this.props.userId))
      .then(cards => { this.props.setCards(cards) })
    }, 100);
  }

  render() {
    const { collections, front, back, name, content, editItem, editOptions } = this.state;
    const { userId } = this.props;

    return (
      <section className="Manage" id="dropZone">
        <div className="header" style={{height: editItem ? '400px': null}}>

          <Link to="/"><h1 className="goHome">HOME</h1></Link>

          <ul className="editItems" style={{display: !editItem ? 'flex' : 'none'}}>
            <li onClick={() => { this.setState({editItem: 'newCard'}); }}>Make new card</li>
            <li onClick={() => this.setState({editItem: 'createCollections'})}>Make new collection</li>
          </ul>

          <div className="x" 
            style={{opacity: editItem ? 1 : 0}}
            onClick={() => this.setState({editItem: ''})}>
            x
          </div>

          <div className="editBox" style={{display: editItem ? 'flex' : 'none'}}>

            <form className="newCard form" 
              style={{display: editItem === 'newCard' ? 'flex' : 'none'}}
              onSubmit={e => this.makeCard(e, front, back) }>
              <h1>Make new card</h1>
              <input id="newCardFocus"
                value={front}
                type="text" placeholder="front"
                onChange={e => this.handleInput(e, 'front') }/>
              <input
                value={back}
                type="text" placeholder="back"
                onChange={e => this.handleInput(e, 'back') }/>
              <input className="submit" type="submit" />
              <div
                className="makeCard button"
                onClick={ e => this.makeCard(e, front, back) }>
                Save card
              </div>
            </form>

            <form className="editCard form" 
              onSubmit={this.edit}
              style={{display: editItem === 'front' || editItem === 'back' ? 'flex' : 'none'}}>
              <h1>Edit content for { this.state.editItem } of card</h1>
              <div className="inputAndButton">
                <input
                  value={content}
                  type="text" placeholder="New content"
                  onChange={e => this.handleInput(e, 'content') }/>
                <input className="submit" type="submit" />
                <div
                  className="editCard button"
                  onClick={this.edit}>
                  Edit card
                </div>
              </div>
              <div className="currentContent">
                <p>Current content:</p>
                <p>{this.state.oldContent}</p>
              </div>
            </form>

            <form className="newCollection form" 
              onSubmit={this.makeCollection}
              style={{display: editItem === 'createCollections' ? 'flex' : 'none'}}>
              <h1>Make new collection</h1>
              <input id="newCollectionFocus"
                value={name}
                type="text" placeholder="Name of collection"
                onChange={e => this.handleInput(e, 'name') }/>
              <input
                value={content}
                type="text" placeholder="Description (optional)"
                onChange={e => this.handleInput(e, 'content') }/>
              <input className="submit" type="submit" />
              <div
                className="makeCollection button"
                onClick={this.makeCollection}>
                Save collection
              </div>
            </form>

          </div>
        </div>

        <div className="collectionsList" 
          onMouseOver={() => {document.body.style.overflow = 'hidden'}} 
          onMouseOut={() => {document.body.style.overflow = 'auto'}} 
          style={{display: editOptions === 'assignCollections' ? 'flex' : 'none'}}>
          Collections:
          <div className="collectionListContainer">
            {collections && collections.map((collection, i) => (
              <div className="collectionListItem" key={i}>
                <input id="select"
                  type="checkbox" 
                  onChange={ _ => {} } />
                <label htmlFor="select"><span></span></label>
                {collection.name}
              </div>
            ))}
          </div>
        </div>

        <ul className="Manage__cards" style={{marginTop: editItem ? '440px' : null}}>
          <h3>Choose an option above, or edit cards directly below.</h3>
          <p>PRO TIP: To create many cards at once, simply drag a .csv file and drop it anywhere on this page. Each row of the file will become a new card. The file should have two columns. The first column will become the front of the card, and the second column will become the back.
          </p>

          <div className="Manage__card">
            
            <div className="editOptions">
              <div className="assignCollections" 
                onClick={() => this.setState({editOptions: 'assignCollections'})}>
                Add card to collection
              </div>
              <div className="editCollections">Edit collections</div>
            </div>

            <div className="columnTitles">
              <h2 className="cardTitle">Select all</h2>
              <h2 className="cardTitle">Card front</h2>
              <h2 className="cardTitle">Card back</h2>
              <div className="boolTitle">Stop showing</div>
              <div className="boolTitle">Show less</div>
              <div className="deleteTitle">Delete</div>
            </div>
            
            { this.props.cards && this.props.cards.map((card, i) => (
              <li key={i} className="cardInfo">

                <div className="select">
                  <input id="select"
                    type="checkbox" 
                    onChange={ _ => {} } />
                  <label htmlFor="select"><span></span></label>
                </div>
                
                <div className="front cardContent">
                  {card.front}
                  <div 
                    className="edit"
                    onClick={e => {this.setState({
                      editItem: 'front', 
                      cardId: card.id,
                      oldContent: card.front
                    })}}>
                    EDIT
                  </div>
                </div>

                <div className="back cardContent">
                  {card.back}
                  <div
                    className="edit"
                    onClick={() => {this.setState({
                      editItem: 'back', 
                      cardId: card.id,
                      oldContent: card.back
                    })}}>
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
                  onClick={() => this.delete(card.id, userId)}>
                  X
                </div>
                <div className="collections">
                  Collections:
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
  setCards, setUserId
}

export default connect(mapStateToProps, outputActions)(Manage);