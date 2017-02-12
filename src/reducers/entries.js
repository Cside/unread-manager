import clone from 'clone';
import elapsedTime     from '../utils/elapsedTime';
import initializeEntry from '../utils/initializeEntry';

const cloneEntries = (entries) => {
  const [elapsed, copied] = elapsedTime(() => clone(entries));
  console.debug(`[${elapsed} ms] clone(entries(${entries.length}))`);
  return copied;
};

// テストのためだけに export ...
export function applyPagenation(entries, page = 1, itemsPerPage = 10) {
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
      return applyPagenation(action.entries);
    }
    case 'TOGGLE_STICKY': {
      const entry = action.entry;

      return applyPagenation(
        state.items.slice(0, entry.id - 1).concat(
          [initializeEntry(entry)],
          state.items.slice(entry.id),
        ),
        state.pagenation.current,
      );
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

      return applyPagenation(entries);
    }
    case 'READ_MORE': {
      return state;
    }
    default: {
      return state;
    }
  }
}
