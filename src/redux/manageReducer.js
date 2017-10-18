// initialState
const manageState = {
  collections: [],
  collectionInfo: [],
  selectedCardIDs: [],
  selectedCollectionIDs: [],
  cardMode: '',
  scrollY: 0,
  reveal: false,
  content1: '',
  content2: '',
}

// Action constants
const SET_COLLECTIONS = 'SET_COLLECTIONS';
const SET_COLLECTION_INFO = 'SET_COLLECTION_INFO';
const SET_CARD_IDS = 'SET_CARD_IDS';
const SET_COLLECTION_IDS = 'SET_COLLECTION_IDS';
const SET_CARD_MODE = 'SET_CARD_MODE';
const SET_SCROLLY ='SET_SCROLLY';
const SET_REVEAL = 'SET_REVEAL';
const SET_CONTENT1 = 'SET_CONTENT1';
const SET_CONTENT2 = 'SET_CONTENT2';

// Reducer
export default function reducer(state = manageState, action) {
  switch (action.type) {
    case SET_COLLECTIONS:
      return Object.assign({}, state, { collections: action.payload });
    case SET_COLLECTION_INFO:
      return Object.assign({}, state, { collectionInfo: action.payload });
    case SET_CARD_IDS:
      return Object.assign({}, state, { selectedCardIDs: action.payload });
    case SET_COLLECTION_IDS:
      return Object.assign({}, state, { selectedCollectionIDs: action.payload });
    case SET_CARD_MODE: 
      return Object.assign({}, state, { cardMode: action.payload });
    case SET_SCROLLY: 
      return Object.assign({}, state, { scrollY: action.payload })
    case SET_REVEAL: 
      return Object.assign({}, state, { reveal: action.payload })
    case SET_CONTENT1: 
      return Object.assign({}, state, { content1: action.payload })
    case SET_CONTENT2: 
      return Object.assign({}, state, { content2: action.payload })
    default:
      return state;
  }
}

// Action creators
export function setCollections(val) {
  return {
    type: SET_COLLECTIONS,
    payload: val
  }
}
export function setCardIDs(val) {
  return {
    type: SET_CARD_IDS,
    payload: val
  }
}
export function setCollectionIDs(val) {
  return {
    type: SET_COLLECTION_IDS,
    payload: val
  }
}
export function setCollectionInfo(val) {
  return {
    type: SET_COLLECTION_INFO,
    payload: val
  }
}
export function setCardMode(val) {
  return {
    type: SET_CARD_MODE,
    payload: val
  }
}
export function setScrollY(val) {
  return {
    type: SET_SCROLLY,
    payload: val
  }
}
export function setReveal(val) {
  return {
    type: SET_REVEAL,
    payload: val
  }
}
export function setContent1(val) {
  return {
    type: SET_CONTENT1,
    payload: val
  }
}
export function setContent2(val) {
  return {
    type: SET_CONTENT2,
    payload: val
  }
}
