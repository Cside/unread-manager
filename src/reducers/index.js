import { combineReducers } from 'redux';
import entriesReducer     from './entries';
import searchQueryReducer from './searchQuery';

export default combineReducers({
  entries:     entriesReducer,
  searchQuery: searchQueryReducer,
});
