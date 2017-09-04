// Action types
const GET_USER_ID = 'GET_USER_ID';
const SET_CARDS = 'SET_CARDS';
const SET_DECK = 'SET_DECK';

// Action creators
export function getUserId() {
  return {
    type: GET_USER_ID
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

// initialState
const initialState = {
  userId: 2
  ,cards: []
  ,deck: []
}

// Reducers
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_ID:
      return state.userId;
    case SET_CARDS:
      return Object.assign({}, state, { cards: action.cards });
    case SET_DECK:
      return Object.assign({}, state, { deck: action.deck });
    default:
      return state;
  }
}