// Action types
const ADD_CARDS = 'ADD_CARDS';
const SET_DECK_IN_PLAY = 'SET_DECK_IN_PLAY';

// Action creators
export function addCards(cards) {
    return {
        type: ADD_CARDS
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
        case ADD_CARDS:
            return Object.assign({}, state, {cards: [...state.cards, ...action.cards]});
        case SET_DECK_IN_PLAY:
            return Object.assign({}, state, {deckInPlay: action.deck})
        default:
            return state;
    }
}