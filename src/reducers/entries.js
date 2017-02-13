import clone from 'clone';
import elapsedTime     from '../utils/elapsedTime';
import initializeEntry from '../utils/initializeEntry';

const cloneEntries = (entries) => {
  const [elapsed, copied] = elapsedTime(() => clone(entries));
  console.debug(`[${elapsed} ms] clone(entries(${entries.length}))`);
  return copied;
};

const search = ({ entries, itemsPerPage = 10, nextId = 1, searchQuery = '' }) => {
  let hasNext  = false;
  let findMore = true;
  let found    = 0;

  const searchWords = searchQuery.split(/\s+/)
                      .filter(str => str !== '')
                      .map(str => str.toLowerCase());
  const hasSearchWords = searchWords.length > 0;

  entries.forEach(entry => {
    if (findMore &&
        (!hasSearchWords || searchWords.every(word => entry.forSearch.indexOf(word) >= 0))) {
      found++;
      if (found <= itemsPerPage) {
        entry.visible = true;
      } else {
        hasNext       = true;
        nextId        = entry.id;
        findMore      = false;
        entry.visible = false;
      }
    } else {
      entry.visible = false;
    }
  });

  return {
    items: entries,
    pagenation: {
      hasNext,
      nextId: hasNext ? nextId : null,
    },
  };
};

const defaultEntry = { items: [], pagenation: { lastId: 0, hasNext: false } };
export default function entriesReducer(state = defaultEntry, action) {
  switch (action.type) {
    case 'RECEIVE_ENTRIES': {
      return search({
        entries:      action.entries,
        itemsPerPage: action.itemsPerPage,
      });
    }
    case 'TOGGLE_STICKY': {
      const entry = action.entry;

      return {
        items: state.items.slice(0, entry.id - 1).concat(
          [initializeEntry(entry)],
          state.items.slice(entry.id),
        ),
        pagenation: state.pagenation,
      };
    }
    case 'SEARCH': {
      const entries         = cloneEntries(state.items);

      return search({
        entries,
        itemsPerPage: action.itemsPerPage,
        searchQuery:  action.searchQuery,
      });
    }
    // case 'READ_MORE': {
    //   return state;
    // }
    default: {
      return state;
    }
  }
}
