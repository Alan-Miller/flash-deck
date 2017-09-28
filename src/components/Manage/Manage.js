import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCards, setUserID, setCardMode, setCollections, setCollectionInfo } from '../../redux/reducer';

import { getUserID } from '../../services/mainService';
import { getCollections, getAllCollectionInfo } from '../../services/collectionService';
import { getAllCards } from '../../services/cardService';

import ManageHeader from './Manage__components/ManageHeader';
import ManageCards from './Manage__components/ManageCards';
import ManageCardModal from './Manage__components/ManageCardModal';
import ManageCollectionModal from './Manage__components/ManageCollectionModal';

class Manage extends Component {

  constructor() {
    super()

    this.state = {
      content1: ''
      ,content2: ''
      ,cardMode: ''
      ,collectionMode: ''
      ,collectionID: 0
      ,scrollY: 0
      ,reveal: false
    }
    this.getInfo = this.getInfo.bind(this);
  }

  componentDidMount() {
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

  editCardContent(face, card) {
    this.setState({ cardMode: face, cardID: card.id });
    if (face === 'front') {
      this.setState({reveal: false, content1: card[face], content2: card.back});
    }
    if (face === 'back') {
      this.setState({reveal: true, content1: card.front, content2: card[face]});
    }
  }

  render() {
    const { collections } = this.props;
    const { 
      reveal 
      ,scrollY 
      ,content1 
      ,content2 
      ,cardID 
      ,cardMode 
      ,collectionID 
      ,collectionMode 
    } = this.state;

    return (
      <section className="Manage" style={scrollY > 100 ? {'paddingTop': '180px'} : null}>
        
        <ManageHeader 
          collections={collections}
          collectionID={collectionID}
          scrollY={scrollY}
          setParentState={(prop, val) => this.setState({[prop]: val})} />

        <ManageCardModal
          cardID={cardID}
          reveal={reveal}
          content1={content1}
          content2={content2}
          cardMode={cardMode}
          setParentState={(prop, val) => this.setState({[prop]: val})} />

        <ManageCollectionModal
          collectionMode={collectionMode}
          setParentState={(prop, val) => this.setState({[prop]: val})} />

        <ManageCards 
          scrollY={scrollY} 
          collectionID={collectionID}
          deleteThisCard={this.deleteThisCard}
          editCardContent={this.editCardContent}
          setParentState={(prop, val) => this.setState({[prop]: val})} />

      </section>
    )
  }
}

function mapStateToProps({ userID, cards, collections }) {
  return { userID, cards, collections };
}

let outputActions = {
  setCards, setUserID, setCardMode, setCollections, setCollectionInfo
}

export default connect(mapStateToProps, outputActions)(Manage);


// setTimeout(_ => { frontTextarea.focus(); }, 0); // When you click Make New Card
// setTimeout(_ => { frontTextarea.focus(); }, 0); // When you click Front of card
// setTimeout(_ => { backTextarea.focus(); }, 0); // When you click Back of card