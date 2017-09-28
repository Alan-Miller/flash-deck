import React, { Component } from 'react';
import CollectionsList from './CollectionsList';

class ApplyCollections extends Component {

  constructor() {
    super() 
    this.state = {}; 
  }

  render() {
    const { makeCollection, content, cardMode } = this.props;

    return (
      <div className="applyCollections"
        style={{display: cardMode === 'applyCollections' ? 'flex' : 'none'}}>
        <div className="formContainer">
          <form className="applyCollections form">
            <input id="applyCollectionsFocus"
              value={content}
              type="text" placeholder="Make new collection"
              onChange={e => this.handleInput(e, 'content') }/>
            <input className="submit" type="submit" 
            />
          </form>
          <div
            className="makeCollection button"
            onClick={makeCollection}>
            Save
          </div>
        </div>
        <CollectionsList cardMode={cardMode} />
      </div>
    )
  }
}

export default ApplyCollections;