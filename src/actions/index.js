import clone     from 'clone';
import Cache     from '../utils/Cache';
import ApiClient from '../utils/ApiClient';

// TODO HTTP Request 中の Loading アイコン的なもの
// TODO HTTP Request の Error Handling

export const onClickSticky = (state) => {
  const entry = clone(state);
  return (dispatch) => {
    const tags = entry.tags;
    entry.tags = entry.readThisLater
           ? tags.filter((tag) => tag !== 'あとで読む')
           : (() => { tags.unshift('あとで読む'); return tags; })();

    // XXX こういうのとか別関数に切り出すべきでは...
    dispatch({
      type: 'TOGGLE_STICKY',
      entry,
    });

    Cache.remove('searchIndex');

    ApiClient.put('/bookmark', {
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
      type:    'SEARCH',
      entries: getState().entries,
      searchQuery,
    });
  };
};

export const fetchSearchIndex = () => {
  return (dispatch) => {
    Cache.getOrSetForPromise('searchIndex', () => {
      return ApiClient.get('/bookmarks/search_index')
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
      dispatch(search('あとで読む'));
    });
  };
};
