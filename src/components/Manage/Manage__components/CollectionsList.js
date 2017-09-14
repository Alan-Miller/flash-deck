import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCollectionIDs } from '../../../redux/reducer';
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
    const { userId, selectedCardIDs, selectedCollectionIDs } = this.props;
    updateCollections(userId, selectedCardIDs, selectedCollectionIDs);
  }

  render() {
    return (
      <div className="collectionsList"
        onMouseOver={() => {document.body.style.overflow = 'hidden'}} 
        onMouseOut={() => {document.body.style.overflow = 'auto'}}
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

function mapStateToProps({ userId, collections, selectedCardIDs, selectedCollectionIDs }) {
  return { userId, collections, selectedCardIDs, selectedCollectionIDs }
}

export default connect(mapStateToProps, {setCollectionIDs })(CollectionsList);