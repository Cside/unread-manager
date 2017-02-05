import { combineReducers } from 'redux';
import entriesReducer from './entries';

export default combineReducers({
  entries:     entriesReducer,
  searchQuery: (state = '', action) => {
    switch (action.type) {
      case 'FILTER_ENTRIES': {
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
  pagenation: (state = { current: 1, hasNext: false }, action) => {
    switch (action.type) {
      case 'FILTER_ENTRIES': {
        const pagenation = { ...state, ...action.pagenation };
        return pagenation;
      }
      default: {
        return state;
      }
    }
  },
});
