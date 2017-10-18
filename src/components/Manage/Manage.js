import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCards, setUserID } from '../../redux/appReducer';
import { 
  setCardMode, 
  setCollections, 
  setCollectionInfo, 
  setReveal, 
  setContent1,
  setContent2
} from '../../redux/manageReducer';

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
      cardMode: ''
      ,collectionMode: ''
      ,collectionID: 0
    }
    this.getInfo = this.getInfo.bind(this);
    this.editCardContent = this.editCardContent.bind(this);
  }

  componentDidMount() {
    if (this.props.appState.userID) this.getInfo(this.props.appState.userID);
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
      this.props.setReveal(false);
      this.props.setContent1(card[face]);
      this.props.setContent2(card.back);
    }
    if (face === 'back') {
      this.props.setReveal(true);
      this.props.setContent1(card.front);
      this.props.setContent2(card[face]);
    }
  }

  render() {
    const { 
      cardID 
      ,cardMode 
      ,collectionID 
      ,collectionMode 
    } = this.state;
    const { scrollY, content1, content2 } = this.props.manageState;

    return (
      <section className="Manage" style={scrollY > 100 ? {'paddingTop': '230px'} : null}>
        
        <ManageHeader 
          collectionID={collectionID} 
          setParentState={(prop, val) => this.setState({[prop]: val})}/>

        <ManageCardModal
          cardID={cardID}
          content1={content1}
          content2={content2}
          cardMode={cardMode}
          setParentState={(prop, val) => this.setState({[prop]: val})} />

        <ManageCollectionModal
          collectionMode={collectionMode}
          setParentState={(prop, val) => this.setState({[prop]: val})} />

        <ManageCards 
          collectionID={collectionID}
          editCardContent={this.editCardContent}
          setParentState={(prop, val) => this.setState({[prop]: val})} />

      </section>
    )
  }
}

function mapStateToProps({ appState, manageState }) {
  return {
    appState: { userID: appState.userID },
    manageState: { scrollY: manageState.scrollY }
  }
}

const mapDispatchToProps = {
  setCards, 
  setUserID, 
  setCardMode, 
  setCollections, 
  setCollectionInfo, 
  setReveal,
  setContent1,
  setContent2
}

export default connect(mapStateToProps, mapDispatchToProps)(Manage);


// setTimeout(_ => { frontTextarea.focus(); }, 0); // When you click Make New Card
// setTimeout(_ => { frontTextarea.focus(); }, 0); // When you click Front of card
// setTimeout(_ => { backTextarea.focus(); }, 0); // When you click Back of card