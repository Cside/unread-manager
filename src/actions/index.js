import axios from 'axios';
import Cache from '../utils/Cache';

const receiveSearchIndex = (searchIndex) => {
  return {
    type: 'RECEIVE_SEARCH_INDEX',
    searchIndex,
  };
};

export const search = (searchQuery) => {
  return (dispatch, getState) => {
    dispatch({
      type:          'SEARCH',
      allEntries:    getState().allEntries,
      searchQuery,
      searchQueries: searchQuery.split(/\s+/).filter(str => str !== ''),
    });
  };
};

export const fetchSearchIndex = () => {
  return (dispatch) => {
    Cache.getOrSetForPromise('searchIndex', () => {
      return axios.get('http://localhost:8000/bookmarks/search_index')
        .then(res => res.data);
    }, 60) // FIXME
      .then((data) => {
        dispatch(receiveSearchIndex(data));
        dispatch(search(''));
      });
  };
};
