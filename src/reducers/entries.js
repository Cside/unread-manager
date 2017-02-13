import clone from 'clone';
import measureTime     from '../utils/measureTime';
import initializeEntry from '../utils/initializeEntry';

const cloneEntries = (entries) => {
  return measureTime(
    `clone(entries(${entries.length}))`,
    () => clone(entries),
  );
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
    if (entry.id < nextId) return;

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

const initialState = {
  items:      [],
  pagenation: {
    lastId:  0,
    hasNext: false,
  },
};
export default function entriesReducer(state = initialState, action) {
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
      return search({
        entries:      cloneEntries(state.items),
        itemsPerPage: action.itemsPerPage,
        searchQuery:  action.searchQuery,
      });
    }
    case 'READ_MORE': {
      if (!state.pagenation.hasNext) return;
      return search({
        // XXX 本当は append するやつだけ clone できればいいのだが...
        // いや、できるか。できるな。まあ最初はそれ考えずにとりあえず機能要件満たそう。
        entries:      cloneEntries(state.items),
        itemsPerPage: action.itemsPerPage,
        searchQuery:  action.searchQuery,
        nextId:       state.pagenation.nextId,
      });
    }
    default: {
      return state;
    }
  }
}
