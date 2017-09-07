import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCards } from '../../redux/reducer';

import { fileReaderUtil } from '../../utils/fileReaderUtil';

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
    }
    this.handleInput = this.handleInput.bind(this);
    this.edit = this.edit.bind(this);
    this.makeCollection = this.makeCollection.bind(this);
    this.handleFileSelect= this.handleFileSelect.bind(this);
  }

  componentDidMount() {

    getAllCards(this.props.userId)
      .then(cards => { this.props.setCards(cards); }
    );
    getAllCollections(this.props.userId)
      .then(collections => { this.setState({ collections }); }
    );

    const dropZone = document.getElementById('dropZone');
    dropZone.addEventListener('dragover', this.handleDragOver);
    dropZone.addEventListener('drop', this.handleFileSelect);

  }

  handleInput(e, stateVal) {
    this.setState({ [stateVal]: e.target.value });
  }

  makeCard(e, front, back) {
    e.preventDefault();
    if (!front || !back) return;
    
    document.getElementById('firstInput').focus();

    saveCard(this.props.userId, front, back)
      .then(cards => { 
        this.setState({front: '', back: ''}); 
        this.props.setCards(cards);
      });
  }

  makeCollection() {
    const { name, content } = this.state;
    const { userId } = this.props;

    saveCollection(userId, name, content)
      .then(collections => { 
        this.setState({collections}); 
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
  
  handleFileSelect(e) {
    const makeNewCards = fileReaderUtil(e);
    setTimeout(() => {
      const newCards = makeNewCards();
      saveCards(this.props.userId, newCards)
      .then(cards => { console.log(cards) });
      let cards = this.props.cards.concat(newCards);
      this.props.setCards(cards);

      setTimeout(() => {
        getAllCards(this.props.userId)
          .then(cards => { this.props.setCards(cards) }
        );
      }, 200);
    }, 200);
  }

  render() {
    const { collections, front, back, name, content, editItem } = this.state;
    const { userId } = this.props;

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
              onSubmit={e => this.makeCard(e, front, back) }>
              <h1>Make new card</h1>
              <input id="firstInput"
                value={front}
                type="text" placeholder="front"
                onChange={e => this.handleInput(e, 'front') }/>
              <input
                value={back}
                type="text" placeholder="back"
                onChange={e => this.handleInput(e, 'back') }/>
              <input type="submit" />
              <div
                className="makeCard button"
                onClick={ _ => this.makeCard(null, front, back) }>
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
                <input type="submit" />
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
                onChange={e => this.handleInput(e, 'name') }/>
              <input
                value={content}
                type="text" placeholder="Description (optional)"
                onChange={e => this.handleInput(e, 'content') }/>
              <div
                className="makeCollection button"
                onClick={this.makeCollection}>
                Save
              </div>
            </form>

            <div className="collectionsList" style={{display: editItem === 'editCollections' ? 'flex' : 'none'}}>
              Collections:
              {collections && collections.map((collection, i) => (
                <div key={i}>{collection.name}</div>
              ))}
            </div>

          </div>

        </div>

        <ul className="Manage__cards" style={{marginTop: editItem ? '440px' : null}}>
            <h3>Choose an option above, or edit cards directly below.</h3>
            <p>PRO TIP: To create many cards at once, simply drag a .csv file and drop it anywhere on this page. Each row of the file will become a new card. The file should have two columns. The first column will become the front of the card, and the second column will become the back.
            </p>
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
  setCards
}

export default connect(mapStateToProps, outputActions)(Manage);