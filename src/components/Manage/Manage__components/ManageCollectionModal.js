import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  setCollections, setCardIDs, setCollectionIDs, setCollectionInfo 
} from '../../../redux/reducer';
import { updateCollections } from '../../../services/collectionService';

class ManageCollectionModal extends Component {

  constructor() {
    super() 

    this.handleSelect = this.handleSelect.bind(this);
    this.isACollectionOnState = this.isACollectionOnState.bind(this);
    this.updateWithSelectedCollections = this.updateWithSelectedCollections.bind(this);
  }

  handleSelect(collectionId) {
    const selectedCollectionIDs = [...this.props.selectedCollectionIDs];
    const index = selectedCollectionIDs.indexOf(collectionId);
    if (this.isACollectionOnState(collectionId)) selectedCollectionIDs.splice(index, 1);
    else selectedCollectionIDs.push(collectionId);
    this.props.setCollectionIDs(selectedCollectionIDs);
  }
  isACollectionOnState(collectionId) { 
    return this.props.selectedCollectionIDs.indexOf(collectionId) !== -1; 
  }

  updateWithSelectedCollections() {
    const { 
      userID, 
      selectedCardIDs, 
      selectedCollectionIDs, 
      setCardIDs, 
      setCollectionIDs, 
      setParentState 
    } = this.props;
    setCardIDs([]);
    setCollectionIDs([]);
    setParentState('collectionMode', '');
    updateCollections(userID, selectedCardIDs, selectedCollectionIDs)
    .then(collectionInfo => {this.props.setCollectionInfo(collectionInfo);});
  }

  render() {
    const { collectionMode, collections } = this.props;

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

function mapStateToProps({ userID, collections, selectedCardIDs, selectedCollectionIDs }) {
  return { userID, collections, selectedCardIDs, selectedCollectionIDs }
}

const outputActions = { 
  setCollections, 
  setCardIDs,
  setCollectionIDs, 
  setCollectionInfo 
};

export default connect(mapStateToProps, outputActions)(ManageCollectionModal);