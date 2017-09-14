// Action types
const GET_USER_ID = 'GET_USER_ID';
const SET_USER_ID = 'SET_USER_ID';
const SET_CARDS = 'SET_CARDS';
const SET_DECK = 'SET_DECK';
const SET_CARD_IDS = 'SET_CARD_IDS';
const SET_COLLECTIONS = 'SET_COLLECTIONS';
const SET_COLLECTION_IDS = 'SET_COLLECTION_IDS';

// Action creators
export function getUserId() {
  return {
    type: GET_USER_ID
  }
}
export function setUserId(userId) {
  return {
    type: SET_USER_ID
    ,userId
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

// initialState
const initialState = {
  userId: 7
  ,cards: []
  ,deck: []
  ,collections: []
  ,selectedCardIDs: []
  ,selectedCollectionIDs: []
}

// Reducers
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_ID:
      return state.userId;
    case SET_USER_ID:
      return Object.assign({}, state, { userId: action.userId });
    case SET_CARDS:
      return Object.assign({}, state, { cards: action.cards });
    case SET_DECK:
      return Object.assign({}, state, { deck: action.deck });
    case SET_CARD_IDS:
      return Object.assign({}, state, { selectedCardIDs: action.cardIDs });
    case SET_COLLECTIONS:
      return Object.assign({}, state, { collections: action.collections });
    case SET_COLLECTION_IDS:
      return Object.assign({}, state, { selectedCollectionIDs: action.collectionIDs });
    default:
      return state;
  }
}