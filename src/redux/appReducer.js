// initialState
const appState = {
  userID: 7, // hard-coded for no-auth dev testing
  // userID: 0, // 0 (falsy) for production
  cards: [],
  deck: [],
}

// Action constants
const SET_USER_ID = 'SET_USER_ID';
const SET_CARDS = 'SET_CARDS';
const SET_DECK = 'SET_DECK';

// Reducer
export default function reducer(state = appState, action) {
  switch (action.type) {
    case SET_USER_ID:
      return Object.assign({}, state, { userID: action.payload });
    case SET_CARDS:
      return Object.assign({}, state, { cards: action.payload });
    case SET_DECK:
      return Object.assign({}, state, { deck: action.payload });
    default:
      return state;
  }
}

// Action creators
export function setUserID(userID) {
  return {
    type: SET_USER_ID,
    payload: userID
  }
}
export function setCards(cards) {
  return {
    type: SET_CARDS,
    payload: cards
  }
}
export function setDeck(deck) {
  return {
    type: SET_DECK,
    payload: deck
  }
}
