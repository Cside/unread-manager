import axios from 'axios';
import Cache from '../utils/Cache';

const receiveSearchIndex = (searchIndex) => {
  return {
    type: 'RECEIVE_SEARCH_INDEX',
    searchIndex,
  };
};

export const setVisibleEntries = (words) => {
  return (dispatch, getState) => {
    dispatch({
      type:       'SET_VISIBLE_ENTRIES',
      allEntries: getState().allEntries,
      words:      words.split(/\s+/).filter(str => str !== ''),
    });
  };
};

export const fetchSearchIndex = () => {
  return (dispatch) => {
    Cache.getOrSetForPromise('searchIndex', () => {
      return axios.get('http://localhost:8000/bookmarks/search_index')
        .then(res => res.data);
    }, 3)
      .then((data) => {
        dispatch(receiveSearchIndex(data));
        dispatch(setVisibleEntries(''));
      });
  };
};
