// initialState
const initialState = {
  userID: 7 // hard-coded for no-auth dev testing
  // userID: 0 // 0 (falsy) for production
  ,cards: []
  ,deck: []
  ,collections: []
  ,collectionInfo: []
  ,selectedCardIDs: []
  ,selectedCollectionIDs: []
}

// Action types
const GET_USER_ID = 'GET_USER_ID';
const SET_USER_ID = 'SET_USER_ID';
const SET_CARDS = 'SET_CARDS';
const SET_DECK = 'SET_DECK';
const SET_CARD_IDS = 'SET_CARD_IDS';
const SET_CARD_MODE = 'SET_CARD_MODE';
const SET_COLLECTIONS = 'SET_COLLECTIONS';
const SET_COLLECTION_IDS = 'SET_COLLECTION_IDS';
const SET_COLLECTION_INFO = 'SET_COLLECTION_INFO';

// Action creators
export function getUserID() {
  return {
    type: GET_USER_ID
  }
}
export function setUserID(userID) {
  return {
    type: SET_USER_ID
    ,userID
  }
}
export function setCards(cards) {
  return {
    type: SET_CARDS
    ,cards
  }
}
export function setDeck(deck) {
  return {
    type: SET_DECK
    ,deck
  }
}
export function setCardIDs(cardIDs) {
  return {
    type: SET_CARD_IDS
    ,cardIDs
  }
}
export function setCardMode(cardMode) {
  return {
    type: SET_CARD_MODE
    ,cardMode
  }
}
export function setCollections(collections) {
  return {
    type: SET_COLLECTIONS
    ,collections
  }
}
export function setCollectionIDs(collectionIDs) {
  return {
    type: SET_COLLECTION_IDS
    ,collectionIDs
  }
}
export function setCollectionInfo(collectionInfo) {
  return {
    type: SET_COLLECTION_INFO
    ,collectionInfo
  }
}

// Reducers
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_ID:
      return state.userID;
    case SET_USER_ID:
      return Object.assign({}, state, { userID: action.userID });
    case SET_CARDS:
      return Object.assign({}, state, { cards: action.cards });
    case SET_DECK:
      return Object.assign({}, state, { deck: action.deck });
    case SET_CARD_IDS:
      return Object.assign({}, state, { selectedCardIDs: action.cardIDs });
    case SET_CARD_MODE: 
      return Object.assign({}, state, { cardMode: action.cardMode });
    case SET_COLLECTIONS:
      return Object.assign({}, state, { collections: action.collections });
    case SET_COLLECTION_INFO:
      return Object.assign({}, state, { collectionInfo: action.collectionInfo });
    case SET_COLLECTION_IDS:
      return Object.assign({}, state, { selectedCollectionIDs: action.collectionIDs });
    default:
      return state;
  }
}