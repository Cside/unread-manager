export default function visibleEntries(state = [], action) {
  switch (action.type) {
    case 'SEARCH':
      if (action.searchQueries.length === 0) {
        return action.allEntries;
      }
      return action.allEntries.filter(
        (entry) => action.searchQueries.every(
          (searchQuery) => entry.forSearch.indexOf(searchQuery.toLowerCase()) >= 0,
        ),
      );
    default:
      return state;
  }
}
