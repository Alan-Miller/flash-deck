import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCollections, setCollectionIDs } from '../../../redux/manageReducer';
import { updateCollections } from '../../../services/collectionService';

class CollectionsList extends Component {

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
    const { userID, selectedCardIDs, selectedCollectionIDs } = this.props;
    updateCollections(userID, selectedCardIDs, selectedCollectionIDs)
    .then(collections => {this.props.setCollections(collections); console.log('why', this.props.collections)});
  }

  render() {
    const { cardMode } = this.props;

    return (
      <div className="collectionsList"
        onMouseOver={() => {document.body.style.overflow = 'hidden'}} 
        onMouseOut={() => {document.body.style.overflow = 'auto'}}
        style={{display: cardMode === 'applyCollections' ? 'flex' : 'none'}}>
      >
        {this.props.collections && this.props.collections.map((collection, i) => (
          <div className="collectionListItem" key={i}>
            <input id="select"
              type="checkbox" 
              ref={`collection${collection.id}`}
              checked={this.isACollectionOnState(collection.id)}
              onChange={ _ => this.handleSelect(collection.id) } />
            <label htmlFor="select"><span></span></label>
            {collection.name}
          </div>
        )).sort()}
        <div
          className="applyCollection button"
          onClick={this.updateWithSelectedCollections}>
          Save
        </div>
      </div>
    )
  }
}

function mapStateToProps({ userID, collections, collectionInfo, selectedCardIDs, selectedCollectionIDs }) {
  return { userID, collections, collectionInfo, selectedCardIDs, selectedCollectionIDs }
}

export default connect(mapStateToProps, { setCollections, setCollectionIDs })(CollectionsList);