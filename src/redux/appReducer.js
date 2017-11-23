// initialState
const appState = {
  // userID: 7, // hard-coded for no-auth dev testing
  userID: 0, // 0 (falsy) for production
  cards: [],
  deck: [],
}

// Action constants
export const SET_userID = 'SET_userID';
export const SET_cards = 'SET_cards';
export const SET_deck = 'SET_deck';

// Action creator
export function setAppState(type, payload) {
  return { type, payload }
}

// Reducer
export default function reducer(state = appState, action) {
  const propName = action.type.replace('SET_', '');
  
  if (appState.hasOwnProperty(propName)) {
    return Object.assign({}, state, { [propName]: action.payload });
  }
  else return state;
}