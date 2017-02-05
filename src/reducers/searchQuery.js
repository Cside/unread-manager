export default function searchQueryReducer(state = '', action) {
  switch (action.type) {
    case 'FILTER_ENTRIES':
      return action.searchQuery;
    default:
      return state;
  }
}
