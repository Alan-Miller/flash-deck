// Action types
const SET_CARDS = 'SET_CARDS';
const SET_DECK_IN_PLAY = 'SET_DECK_IN_PLAY';

// Action creators
export function setCards(cards) {
  return {
    type: SET_CARDS
    ,cards
  }
}

export function setDeckInPlay(deck) {
  return {
    type: SET_DECK_IN_PLAY
    ,deck
  }
}

// initialState
const initialState = {
  cards: []
  ,deckInPlay: []
}

// Reducers
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CARDS:
      return Object.assign({}, state, { cards: [...state.cards, ...action.cards] });
    case SET_DECK_IN_PLAY:
      return Object.assign({}, state, { deckInPlay: action.deck })
    default:
      return state;
  }
}