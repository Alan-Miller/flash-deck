import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCards } from '../../redux/reducer';

import axios from 'axios';

import { fileReaderUtil } from '../../utils/fileReaderUtil';

import { 
  getAllCards, saveCard, saveCards, editCard,
  getAllCollections, saveCollection, 
  switchBool, deleteCard } from '../../services/cardService';

class Manage extends Component {

  constructor() {
    super()

    this.state = {
      userId: 2
      ,front: ''
      ,back: ''
      ,name: ''
      ,content: ''
      ,editItem: ''
      ,oldContent: ''
    }
    this.handleInput = this.handleInput.bind(this);
    this.edit = this.edit.bind(this);
    this.makeCollection = this.makeCollection.bind(this);
    this.handleFileSelect= this.handleFileSelect.bind(this);
  }

  componentDidMount() {
    let user = axios.get('/auth/me').then(user => {
      console.log('user', user);
      return user.data
    });
    
    if (!user) this.props.history.push('/login');

    const dropZone = document.getElementById('dropZone');
    dropZone.addEventListener('dragover', this.handleDragOver);
    dropZone.addEventListener('drop', this.handleFileSelect);
    
    getAllCards(this.state.userId)
      .then(cards => { this.props.setCards(cards); }
    );
    getAllCollections(this.state.userId)
      .then(collections => { this.setState({ collections })}
    );
  }

  handleInput(e, stateVal) {
    this.setState({ [stateVal]: e.target.value });
  }

  makeCard(front, back) {
    saveCard(this.state.userId, front, back)
      .then(cards => { 
        this.setState({front: '', back: ''}); 
        this.props.setCards(cards);
      });
  }

  makeCollection() {
    const { userId, name, content } = this.state;
    saveCollection(userId, name, content)
      .then(collections => { 
        this.setState({collections}); 
      });
  }

  edit() {
    const { editItem, content, cardId, userId } = this.state;
    editCard(editItem, content, cardId, userId)
    .then(cards => {
      this.setState({content: ''});
      this.props.setCards(cards);
    })
  }

  toggleBool(cardId, colName) {
    switchBool(cardId, colName, this.state.userId)
      .then(cards => { this.props.setCards(cards); })
  }

  delete(userId, cardId) {
    deleteCard(userId, cardId)
      .then(cards => { this.props.setCards(cards); });
  }

  handleDragOver(e) {
    e.preventDefault();
  }
  
  handleFileSelect(e) {
    const makeNewCards = fileReaderUtil(e);
    setTimeout(() => {
      const newCards = makeNewCards();
      saveCards(this.props.userId, newCards)
      .then(cards => { console.log(cards) });
      let cards = this.props.cards.concat(newCards);
      this.props.setCards(cards);

      setTimeout(() => {
        getAllCards(this.state.userId)
          .then(cards => { this.props.setCards(cards) }
        );
      }, 200);
    }, 200);
  }

  render() {
    const { collections, userId, front, back, name, content, editItem } = this.state;

    return (
      <section className="Manage" id="dropZone">
        <div className="header" style={{height: editItem ? '400px': null}}>

          <Link to="/"><h1 className="goHome">HOME</h1></Link>

          <ul className="editItems" style={{display: !editItem ? 'flex' : 'none'}}>
            <li onClick={() => this.setState({editItem: 'newCard'})}>Make new card</li>
            <li onClick={() => this.setState({editItem: 'editCollections'})}>Edit collections</li>
          </ul>

          <div className="x" 
            style={{opacity: editItem ? 1 : 0}}
            onClick={() => this.setState({editItem: ''})}>
            x
          </div>

          <div className="editBox" style={{display: editItem ? 'flex' : 'none'}}>

            <form className="newCard form" style={{display: editItem === 'newCard' ? 'flex' : 'none'}}>
              <h1>Make new card</h1>
              <input
                value={front}
                type="text" placeholder="front"
                onChange={(e) => this.handleInput(e, 'front')}/>
              <input
                value={back}
                type="text" placeholder="back"
                onChange={(e) => this.handleInput(e, 'back')}/>
              <div
                className="makeCard button"
                onClick={() => this.makeCard(front, back)}>
                Save card
              </div>
            </form>

            <form className="editCard form" style={{display: editItem === 'front' || editItem === 'back' ? 'flex' : 'none'}}>
              <h1>Edit content for { this.state.editItem } of card</h1>
              <div className="inputAndButton">
                <input
                  value={content}
                  type="text" placeholder="New content"
                  onChange={(e) => this.handleInput(e, 'content')}/>
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

            <form className="newCollection form" style={{display: editItem === 'editCollections' ? 'flex' : 'none'}}>
              <h1>Make new collection</h1>
              <input
                value={name}
                type="text" placeholder="Name of collection"
                onChange={(e) => this.handleInput(e, 'name')}/>
              <input
                value={content}
                type="text" placeholder="Description (optional)"
                onChange={(e) => this.handleInput(e, 'content')}/>
              <div
                className="makeCollection button"
                onClick={this.makeCollection}>
                Save
              </div>
            </form>

            <div className="collectionsList">
              {collections && collections.map((collection, i) => (
                <div key={i}>{collection.name}</div>
              ))}
            </div>

          </div>

        </div>

        <ul className="Manage__cards" style={{marginTop: editItem ? '440px' : null}}>
          <h1>Choose an option above, or edit cards directly</h1>
          <div className="Manage__card">
            
            <div className="columnTitles">
              <h2 className="cardTitle">Card front</h2>
              <h2 className="cardTitle">Card back</h2>
              <div className="boolTitle">Stop showing</div>
              <div className="boolTitle">Show less</div>
              <div className="deleteTitle">Delete</div>
            </div>
            
            { this.props.cards && this.props.cards.map((card, i) => (
              <li key={i} className="cardInfo">
                <div className="front cardContent">
                  {card.front}
                  <div 
                    className="edit"
                    onClick={(e) => {this.setState({
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
  setCards
}

export default connect(mapStateToProps, outputActions)(Manage);