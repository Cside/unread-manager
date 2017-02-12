import { combineReducers } from 'redux';
import entriesReducer from './entries';

export default combineReducers({
  entries:     entriesReducer,
  searchQuery: (state = '', action) => {
    switch (action.type) {
      case 'SEARCH': {
        return action.searchQuery;
      }
      default: {
        return state;
      }
    }
  },
  initialized: (state = false, action) => {
    switch (action.type) {
      case 'RECEIVE_ENTRIES': {
        return true;
      }
      default: {
        return state;
      }
    }
  },
});
