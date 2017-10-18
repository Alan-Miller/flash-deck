import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  setManageState, 
  SET_selectedCollectionIDs, 
  SET_scrollY, 
  SET_reveal,
  SET_cardMode,
  SET_collectionMode,
  SET_collectionID
} from '../../../redux/manageReducer';

class ManageHeader extends Component {

  componentDidMount() {
    document.addEventListener('scroll', _ => {
      this.props.setManageState(SET_scrollY, window.scrollY);
    });
  }

  render() {
    const { setManageState } = this.props;
    const { collections, scrollY, collectionID } = this.props.manageState;
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
            setManageState(SET_reveal, false);
            setManageState(SET_cardMode, 'newCard');
          }}>
            Make new card
          </li>
        </ul>

        <div className="editOptions">
          <div className="editCollections" 
            onClick={_ => {
              setManageState(SET_collectionMode, 'editCollections');
              setManageState(SET_selectedCollectionIDs, []);
            }}>
            Edit collections
          </div>
        </div>
        <div className="collectionSelect">
          Filter cards by collection <br/>
          <select id="colSelect" onChange={_ => {setManageState(SET_collectionID, +colSelect.value)}}>
            <option defaultValue value="0">ALL COLLECTIONS</option>
            {collections.map((collection, i) => (
              <option key={i} value={collection.id} selected={collection.id === collectionID}>
                { collection.name }
              </option>
            ))}
          </select>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ manageState }) {
  return {
    manageState: { 
      collections: manageState.collections,
      scrollY: manageState.scrollY,
      collectionMode: manageState.collectionMode,
      collectionID: manageState.collectionID
    }
  }
}
const mapDispatchToProps = { setManageState };

export default connect(mapStateToProps, mapDispatchToProps)(ManageHeader);