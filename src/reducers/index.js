import { combineReducers } from 'redux';
import allEntries     from './allEntries';
import visibleEntries from './visibleEntries';
import searchQuery    from './searchQuery';

export default combineReducers({
  allEntries,
  visibleEntries,
  searchQuery,
});
