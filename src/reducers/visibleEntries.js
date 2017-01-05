export default function visibleEntries(state = [], action) {
  switch (action.type) {
    case 'SET_VISIBLE_ENTRIES':
      if (action.words.length === 0) {
        return action.allEntries;
      }
      return action.allEntries.filter(
        (entry) => action.words.every((word) => entry.forSearch.indexOf(word.toLowerCase()) >= 0),
      );
    default:
      return state;
  }
}
