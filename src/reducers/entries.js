import clone from 'clone';
import elapsedTime from '../utils/elapsedTime';

const cloneEntries = (entries) => {
  const [elapsed, copied] = elapsedTime(() => clone(entries));
  console.debug(`[${elapsed} ms] clone(entries(${entries.length}))`);
  return copied;
};

// テストのためだけに export ...
export function applyPagenation(entries, page, itemsPerPage = 10) {
  const maxItems = page * itemsPerPage;
  let hasNext = false;
  let visibleItems = 0;

  const items = entries.map(entry => {
    let visible = false;
    if (entry.visible) {
      visibleItems++;

      if (visibleItems <= maxItems) {
        visible = true;
      } else if (visibleItems === maxItems + 1) {
        hasNext = true;
      }
    }
    return { ...entry, visible };
  });
  return {
    items,
    pagenation: {
      current: page,
      hasNext,
    },
  };
}

// N ページ目を指定で探せるように
// export function search() {
// }

const defaultEntry = { items: [], pagenation: { current: 1, hasNext: false } };
export default function entriesReducer(state = defaultEntry, action) {
  switch (action.type) {
    case 'RECEIVE_ENTRIES': {
      return applyPagenation(action.entries, 1);
    }
    // TODO current page 渡すように改修しないと駄目
    case 'TOGGLE_STICKY': {
      // XXX fastest-clone というのもあるらしい
      const entries = cloneEntries(state.items);

      // XXX 計算量ひどいので割りと真剣になんとかしたい ...
      // あと url の文字列比較より id 比較のほうが若干高速なのでは ...
      const i = entries.findIndex((entry)  => entry.url === action.entry.url);
      if (i < 0) {
        console.error(`Entry was not found in state. entry.url = ${action.entry.url}`);
      }
      entries[i] = action.entry;

      return applyPagenation(entries, state.pagenation.current);
    }
    case 'SEARCH': {
      let entries         = cloneEntries(state.items);
      const searchQueries = action.searchQuery.split(/\s+/)
                            .filter(str => str !== '')
                            .map(str => str.toLowerCase());
      if (searchQueries.length === 0) {
        return applyPagenation(
          entries.map(entry => {
            entry.visible = true;
            return entry;
          }),
          1, // TODO これいらないのでは ...
        );
      }
      entries = entries.map(
        entry => {
          entry.visible = searchQueries.every(
            searchQuery => entry.forSearch.indexOf(searchQuery.toLowerCase()) >= 0,
          );
          return entry;
        },
      );

      return applyPagenation(entries, 1);
    }
    default: {
      return state;
    }
  }
}
