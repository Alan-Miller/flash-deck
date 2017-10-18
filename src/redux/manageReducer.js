// Initial state
const manageState = {
  collections: [],
  collectionInfo: [],
  selectedCardIDs: [],
  selectedCollectionIDs: [],
  cardMode: '',
  collectionMode: '',
  scrollY: 0,
  reveal: false,
  content1: '',
  content2: '',
  cardID: 0,
  collectionID: 0,
}

// Action constants
export const SET_collections = 'SET_collections';
export const SET_collectionInfo = 'SET_collectionInfo';
export const SET_selectedCardIDs = 'SET_selectedCardIDs';
export const SET_selectedCollectionIDs = 'SET_selectedCollectionIDs';
export const SET_cardMode = 'SET_cardMode';
export const SET_collectionMode = 'SET_collectionMode';
export const SET_scrollY ='SET_scrollY';
export const SET_reveal = 'SET_reveal';
export const SET_content1 = 'SET_content1';
export const SET_content2 = 'SET_content2';
export const SET_cardID ='SET_cardID';
export const SET_collectionID = 'SET_collectionID';

// Action creator
export function setManageState(type, payload) {
  return { type, payload }
}

// Reducer
export default function reducer(state = manageState, action) {
  const propName = action.type.replace('SET_', '');
  if (manageState.hasOwnProperty(propName)) {
    return Object.assign({}, state, { [propName]: action.payload });
  }
  else return state;
}