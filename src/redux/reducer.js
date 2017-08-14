// Action types
const ADD_CARDS = 'ADD_CARDS';

// Action creators
export function addCards(cards) {
    return {
        type: ADD_CARDS
        ,cards
    }
}

// initialState
const initialState = {
    cards: []
}

// Reducers
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_CARDS:
            return Object.assign({}, state, {cards: [...state.cards, ...action.cards]})
        default:
            return state;
    }
}