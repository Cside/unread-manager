import { combineReducers } from 'redux';
import allEntries from './allEntries';
import visibleEntries from './visibleEntries';

export default combineReducers({
  allEntries,
  visibleEntries,
});
