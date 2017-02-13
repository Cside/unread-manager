import clone from 'clone';
import Cache from            '../utils/Cache';
import ApiClient from        '../utils/ApiClient';
import parseSearchIndex from '../utils/parseSearchIndex';
import measureTime      from '../utils/measureTime';

// TODO HTTP Request 中の Loading アイコン的なもの

export const onClickSticky = (origEntry) => {
  const entry = clone(origEntry);
  const tags  = entry.tags;

  if (entry.readThisLater) {
    entry.tags = tags.filter((tag) => tag !== 'あとで読む');
  } else {
    tags.unshift('あとで読む');
    entry.tags = tags;
  }

  Cache.remove('entries');

  // TODO loading 画像出すのがだるいので今はリクエスト投げっぱなしてる
  ApiClient.put('/bookmark', {
    url:     entry.url,
    tags:    entry.tags,
    comment: entry.comment,
  })
  .catch(e => {
    console.error(e);
    alert(`エラー:\n${e}`);
  });

  return {
    type: 'TOGGLE_STICKY',
    entry,
  };
};

export const readMore = () => {
  return (dispatch, getState) => {
    const { searchQuery } = getState();
    dispatch({
      type: 'READ_MORE',
      searchQuery,
    });
  };
};

// TODO
// searchQuery は state から取ってくれば良いのでバケツリレーは無駄。
// searchQuery を set する専用の action があれば良いのでは
export const search = ({ searchQuery }) => ({
  type: 'SEARCH',
  searchQuery,
});

export const fetchSearchIndex = () => {
  return dispatch => {
    Cache.getOrSetAsync('entries', () => {
      return ApiClient.get('/bookmarks/search_index')
        .then(res => {
          return measureTime(
            `parseSearchIndex(index(${res.data.split('\n').length}))`,
            () => parseSearchIndex(res.data),
          );
        })
        .catch(e => console.error(e));
    }, 60 * 6)
    .then(entries => {
      dispatch({
        type: 'RECEIVE_ENTRIES',
        entries,
      });
      dispatch(search({ searchQuery: 'あとで読む' }));
    });
  };
};
