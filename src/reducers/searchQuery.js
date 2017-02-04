export default function searchQueryReducer(state = '', action) {
  switch (action.type) {
    case 'SEARCH':
      return action.searchQuery;
    default:
      return state;
  }
}
