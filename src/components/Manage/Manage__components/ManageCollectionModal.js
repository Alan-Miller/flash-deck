import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  setManageState, 
  SET_selectedCardIDs, 
  SET_selectedCollectionIDs, 
  SET_collectionInfo ,
  SET_collectionMode
} from '../../../redux/manageReducer';
import { updateCollections } from '../../../services/collectionService';

class ManageCollectionModal extends Component {

  constructor() {
    super() 
    this.handleSelect = this.handleSelect.bind(this);
    this.isACollectionOnState = this.isACollectionOnState.bind(this);
    this.updateWithSelectedCollections = this.updateWithSelectedCollections.bind(this);
  }

  handleSelect(collectionId) {
    const selectedCollectionIDs = [...this.props.manageState.selectedCollectionIDs];
    const index = selectedCollectionIDs.indexOf(collectionId);
    if (this.isACollectionOnState(collectionId)) selectedCollectionIDs.splice(index, 1);
    else selectedCollectionIDs.push(collectionId);
    this.props.setManageState(SET_selectedCollectionIDs, selectedCollectionIDs);
  }
  isACollectionOnState(collectionId) { 
    return this.props.manageState.selectedCollectionIDs.indexOf(collectionId) !== -1; 
  }

  updateWithSelectedCollections() {
    const { setManageState } = this.props;
    const { userID } = this.props.appState;
    const { 
      selectedCardIDs, 
      selectedCollectionIDs, 
    } = this.props.manageState;

    setManageState(SET_selectedCardIDs, []);
    setManageState(SET_selectedCollectionIDs, []);
    setManageState(SET_collectionMode, '');
    
    updateCollections(userID, selectedCardIDs, selectedCollectionIDs)
    .then(collectionInfo => {this.props.setManageState(SET_collectionInfo, collectionInfo);});
  }

  render() {
    const { collections, collectionMode } = this.props.manageState;

    return (
      <div className="collectionsModal" 
        style={{display: collectionMode === 'editCollections' ? 'flex' : 'none'}}
      >
        <div className="collectionsContainer"
          onMouseOver={() => {document.body.style.overflow = 'hidden'}} 
          onMouseOut={() => {document.body.style.overflow = 'auto'}}
        >
          {collections && collections.map((collection, i) => (
            <div className="collectionItem" key={i}>
              <input id="select"
                type="checkbox" 
                ref={`collection${collection.id}`}
                checked={this.isACollectionOnState(collection.id)}
                onChange={ _ => this.handleSelect(collection.id) } />
              <label htmlFor="select"><span className="checkboxCircle"></span></label>
              {collection.name}
            </div>
          )).sort()}
          <div
            className="button"
            onClick={this.updateWithSelectedCollections}>
            Save
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ appState, manageState }) {
  return {
    appState: {
      userID: appState.userID
    },
    manageState: {
      collections: manageState.collections,
      collectionMode: manageState.collectionMode,
      selectedCardIDs: manageState.selectedCardIDs,
      selectedCollectionIDs: manageState.selectedCollectionIDs
    }
  }
}

const mapDispatchToProps = { 
  setManageState
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCollectionModal);