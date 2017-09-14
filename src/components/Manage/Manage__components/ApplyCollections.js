import React, { Component } from 'react';
import CollectionsList from './CollectionsList';

class ApplyCollections extends Component {

  constructor() {
    super() 
    this.state = {}; 
  }

  render() {
    const { applyCollection, makeCollection, content, editItem } = this.props;

    return (
      <div className="applyCollections"
        style={{display: editItem === 'applyCollections' ? 'flex' : 'none'}}>
        <div className="formContainer">
          <form className="applyCollections form" onSubmit={applyCollection}>
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
        <CollectionsList editItem={editItem} />
      </div>
    )
  }
}

export default ApplyCollections;