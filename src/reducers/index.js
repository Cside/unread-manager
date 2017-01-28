import { combineReducers } from 'redux';
import allEntries from './allEntries';
import visibleEntries from './visibleEntries';

export default combineReducers({
  allEntries,
  visibleEntries,
  searchQuery: (state = '', action) => {
    console.log('state', [state, action]);
    switch (action.type) {
      case 'SEARCH':
        return action.searchQuery;
      default:
        return state;
    }
  },
});
