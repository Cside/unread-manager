import clone from 'clone';
import elapsedTime from '../utils/elapsedTime';

const cloneEntries = (entries) => {
  const [elapsed, copied] = elapsedTime(() => clone(entries));
  console.debug(`[${elapsed} ms] clone(entries(${entries.length}))`);
  return copied;
};

export default function entriesReducer(state = [], action) {
  switch (action.type) {
    case 'RECEIVE_ENTRIES': {
      return action.entries;
    }
    // XXX テスト書きたい
    case 'TOGGLE_STICKY': {
      // XXX fastest-clone というのもあるらしい
      const entries = cloneEntries(state);

      // XXX 計算量ひどいので割りと真剣になんとかしたい ...
      // あと url の文字列比較より id 比較のほうが若干高速なのでは ...
      const i = entries.findIndex((entry)  => entry.url === action.entry.url);
      if (i < 0) {
        console.error(`Entry was not found in state. entry.url = ${action.entry.url}`);
      }
      entries[i] = action.entry;

      return entries;
    }
    case 'FILTER_ENTRIES': {
      const entries       = cloneEntries(state);
      const searchQueries = action.searchQuery.split(/\s+/)
                            .filter(str => str !== '')
                            .map(str => str.toLowerCase());
      if (searchQueries.length === 0) {
        return entries.map(entry => {
          entry.visible = true;
          return entry;
        });
      }
      return entries.map(
        entry => {
          entry.visible = searchQueries.every(
            searchQuery => entry.forSearch.indexOf(searchQuery.toLowerCase()) >= 0,
          );
          return entry;
        },
      );
    }
    default: {
      return state;
    }
  }
}
