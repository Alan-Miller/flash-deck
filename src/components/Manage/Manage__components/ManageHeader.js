import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCollectionIDs } from '../../../redux/reducer';

class ManageHeader extends Component {

  componentDidMount() {
    document.addEventListener('scroll', _ => {
      this.props.setParentState('scrollY', window.scrollY);
    });
  }

  render() {
    const { scrollY, collections, collectionID, setParentState, setCollectionIDs } = this.props;
    const colSelect = document.getElementById('colSelect');
    const headerStyles = scrollY > 100 ? 
    {
      'position': 'fixed',
      'top': '0',
      'width': '100vw',
      'height': '80px',
      'justifyContent': 'flex-end'
    } 
    : {};

    return (
      <div id="header" style={headerStyles}>
        <div className="home">
          <Link to="/">HOME</Link>
        </div>

        <ul className="headerList">
          <li onClick={_ => {
            setParentState('reveal', false);
            setParentState('cardMode', 'newCard');
          }}>
            Make new card
          </li>
        </ul>

        <div className="editOptions">
          <div className="editCollections" 
            onClick={_ => {
              setParentState('collectionMode', 'editCollections');
              setCollectionIDs([]);
            }}>
            Edit collections
          </div>
        </div>
        <div className="collectionSelect">
          Filter cards by collection <br/>
          <select id="colSelect" onChange={_ => {setParentState('collectionID', +colSelect.value)}}>
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

function mapStateToProps({collections}) {
  return {collections};
}

export default connect(mapStateToProps, { setCollectionIDs })(ManageHeader);