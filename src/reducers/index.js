import { combineReducers } from 'redux';
import entries     from './entries';
import searchQuery from './searchQuery';

export default combineReducers({
  entries,
  searchQuery,
});
