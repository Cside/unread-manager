import { combineReducers } from 'redux';
import entriesReducer from './entries';

export default combineReducers({
  entries:     entriesReducer,
  searchQuery: (state = '', action) => {
    switch (action.type) {
      // TODO これは変。searchQuery を set する専用の Action を作れ。
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
