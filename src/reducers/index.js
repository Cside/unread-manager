import { combineReducers } from 'redux';
import entriesReducer     from './entries';
import searchQueryReducer from './searchQuery';
import initializedReducer from './initialized';

export default combineReducers({
  entries:     entriesReducer,
  searchQuery: searchQueryReducer,
  initialized: initializedReducer,
});
