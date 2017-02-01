import axios from 'axios';
import clone from 'clone';
import Cache from '../utils/Cache';

// TODO HTTP Request 中の Loading アイコン的なもの
// TODO HTTP Request の Error Handling

const httpClient = axios.create({
  baseURL: 'http://localhost:7999',
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
});

// XXX stickey を toggle する以外にもいろいろやることあるので
// onClickSticky みたいな抽象的な名前のほうがよさげ
export const toggleSticky = (state) => {
  const entry = clone(state);
  return (dispatch) => {
    const tags = entry.tags;
    entry.tags = entry.readThisLater
           ? tags.filter((tag) => tag !== 'あとで読む')
           : (() => { tags.unshift('あとで読む'); return tags; })();

    dispatch({
      type: 'TOGGLE_STICKY',
      entry,
    });

    Cache.remove('searchIndex');

    httpClient.put('/bookmark', {
      url:     entry.url,
      tags:    entry.tags,
      comment: entry.comment,
    })
    .catch(e => console.error(e));
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
      return httpClient.get('/bookmarks/search_index')
        .then(res => res.data)
        .catch(e => console.error(e));
    }, 60 * 6)
    .then((searchIndex) => {
      if (searchIndex) {
        dispatch({
          type: 'RECEIVE_SEARCH_INDEX',
          searchIndex,
        });
      }
      dispatch(search(''));
    });
  };
};
