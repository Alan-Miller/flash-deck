import { createStore, combineReducers } from 'redux';
import appReducer from './appReducer';
import manageReducer from './manageReducer';

const reducer = combineReducers({appState: appReducer, manageState: manageReducer});
const store = createStore(reducer);
export default store;