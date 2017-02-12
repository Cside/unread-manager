import clone from 'clone';
import elapsedTime     from '../utils/elapsedTime';
// import initializeEntry from '../utils/initializeEntry';

const cloneEntries = (entries) => {
  const [elapsed, copied] = elapsedTime(() => clone(entries));
  console.debug(`[${elapsed} ms] clone(entries(${entries.length}))`);
  return copied;
};

const defaultEntry = { items: [], pagenation: { lastId: 0, hasNext: false } };
export default function entriesReducer(state = defaultEntry, action) {
  switch (action.type) {
    // case 'RECEIVE_ENTRIES': {
    //   return applyPagenation(action.entries);
    // }
    // case 'TOGGLE_STICKY': {
    //   const entry = action.entry;

    //   return applyPagenation(
    //     state.items.slice(0, entry.id - 1).concat(
    //       [initializeEntry(entry)],
    //       state.items.slice(entry.id),
    //     ),
    //     state.pagenation.lastId,
    //   );
    // }
    case 'SEARCH': {
      const entries         = cloneEntries(state.items);

      const itemsPerPage = action.itemsPerPage || 10;
      let   nextId       = state.nextId || null;
      let   hasNext      = false;
      let   found        = 0;

      const searchWords = action.searchQuery.split(/\s+/)
                          .filter(str => str !== '')
                          .map(str => str.toLowerCase());

      let findMore = true;

      entries.forEach(entry => {
        if (findMore && searchWords.every(word => entry.forSearch.indexOf(word) >= 0)) {
          found++;
          if (found <= itemsPerPage) {
            entry.visible = true;
          } else {
            hasNext = true;
            nextId = entry.id;
            findMore = false;
            entry.visible = false;
          }
        } else {
          entry.visible = false;
        }
      });

      return {
        items: entries,
        pagenation: {
          nextId,
          hasNext,
        },
      };

      // const searchQueries = action.searchQuery.split(/\s+/)
      //                       .filter(str => str !== '')
      //                       .map(str => str.toLowerCase());
      // if (searchQueries.length === 0) {
      //   return applyPagenation(
      //     entries.map(entry => {
      //       entry.visible = true;
      //       return entry;
      //     }),
      //   );
      // }
      // entries = entries.map(
      //   entry => {
      //     entry.visible = searchQueries.every(
      //       searchQuery => entry.forSearch.indexOf(searchQuery.toLowerCase()) >= 0,
      //     );
      //     return entry;
      //   },
      // );

      // return applyPagenation(entries);
    }
    // case 'READ_MORE': {
    //   return state;
    // }
    default: {
      return state;
    }
  }
}
