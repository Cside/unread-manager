import clone from 'clone';
import Cache from            '../utils/Cache';
import ApiClient from        '../utils/ApiClient';
import parseSearchIndex from '../utils/parseSearchIndex';
import elapsedTime from      '../utils/elapsedTime';

// TODO HTTP Request 中の Loading アイコン的なもの
// TODO HTTP Request の Error Handling

export const onClickSticky = (state) => {
  const entry = clone(state);
  const tags  = entry.tags;

  if (entry.readThisLater) {
    entry.tags = tags.filter((tag) => tag !== 'あとで読む');
  } else {
    tags.unshift('あとで読む');
    entry.tags = tags;
  }

  Cache.remove('entries');

  ApiClient.put('/bookmark', {
    url:     entry.url,
    tags:    entry.tags,
    comment: entry.comment,
  })
  .catch(e => console.error(e));

  return {
    type: 'TOGGLE_STICKY',
    entry,
  };
};

export const search = (searchQuery) => {
  return {
    type: 'SEARCH',
    searchQuery,
  };
};

export const fetchSearchIndex = () => {
  return (dispatch) => {
    Cache.getOrSetForPromise('entries', () => {
      return ApiClient.get('/bookmarks/search_index')
        .then(res => {
          const [elapsed, entries] = elapsedTime(() => parseSearchIndex(res.data));
          console.debug(`[${elapsed} ms] parseSearchIndex(index(${res.data.split('\n').length}))`);
          return entries;
        })
        .catch(e => console.error(e));
    }, 60 * 6)
    .then((entries) => {
      dispatch({
        type: 'RECEIVE_ENTRIES',
        entries,
      });
      dispatch(search('あとで読む'));
    });
  };
};
