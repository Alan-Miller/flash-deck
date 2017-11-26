import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAppState, SET_userID, SET_cards } from '../../redux/appReducer';
import { 
  setManageState,
  SET_collections, 
  SET_collectionInfo
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
    this.getInfo = this.getInfo.bind(this);
  }

  componentDidMount() {
    if (this.props.appState.userID) this.getInfo(this.props.appState.userID);
    else {
      getUserID()
      .then(userID => {
        this.props.setAppState(SET_userID, userID);
        this.getInfo(userID);
      })
    }
  }

  getInfo(userID) {
    getAllCards(userID)
      .then(cards => { this.props.setAppState(SET_cards, cards); }
    );
    getCollections(userID)
      .then(collections => { this.props.setManageState(SET_collections, collections); }
    );
    getAllCollectionInfo(userID)
      .then(collectionInfo => { this.props.setManageState(SET_collectionInfo, collectionInfo); }
    );
  }

  render() {
    const { scrollY } = this.props.manageState;
    return (
      <section className="Manage" style={scrollY > 100 ? {'paddingTop': '230px'} : null}>
        <ManageHeader />
        <ManageCardModal />
        <ManageCollectionModal />
        <ManageCards />
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
  setAppState,
  setManageState
}

export default connect(mapStateToProps, mapDispatchToProps)(Manage);


// setTimeout(_ => { frontTextarea.focus(); }, 0); // When you click Make New Card
// setTimeout(_ => { frontTextarea.focus(); }, 0); // When you click Front of card
// setTimeout(_ => { backTextarea.focus(); }, 0); // When you click Back of card