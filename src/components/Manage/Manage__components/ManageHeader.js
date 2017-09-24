import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ManageHeader extends Component {

  constructor() {
    super() 
    // this.state = {scrollY: 0}
  }

  componentDidMount() {
    document.addEventListener('scroll', _ => {
      this.props.setParentState('scrollY', window.scrollY);
    });
  }

  render() {
    const { scrollY, collections, collectionID, setParentState } = this.props;
    const colSelect = document.getElementById('colSelect');
    const headerStyles = scrollY > 100 ? 
    {
      'position': 'fixed',
      'top': '0',
      'width': '100vw',
      'height': '80px',
      'justifyContent': 'flex-end'
    } : {};

    return (
      <div id="header" style={headerStyles}>
        <div className="home">
          <Link to="/">HOME</Link>
        </div>

        <ul className="headerList">
          <li onClick={_ => {
            setParentState('reveal', false);
            setParentState('editItem', 'newCard');
          }}>
            Make new card
          </li>
        </ul>

        <div className="editOptions">
          <div className="applyCollections" 
            onClick={_ => setParentState('editItem', 'applyCollections')}>
            Add card to collection
          </div>
          <div className="editCollections" 
            onClick={_ => setParentState('editItem', 'editCollections')}>
            Edit collections
          </div>
        </div>
        <div className="collectionSelect">
          Filter cards by collection <br/>
          <select id="colSelect" onChange={_ => {console.log('ID', collectionID); setParentState('collectionID', +colSelect.value)}}>
            <option defaultValue value="0">ALL COLLECTIONS</option>
            {collections.map((col, i) => (
              <option key={i} value={col.id} selected={col.id === collectionID}>
                { col.name }
              </option>
            ))}
          </select>
        </div>
      </div>
    )
  }
}

export default ManageHeader;