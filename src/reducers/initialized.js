export default function initializedReducer(state = '', action) {
  switch (action.type) {
    case 'RECEIVE_ENTRIES':
      return true;
    default:
      return state;
  }
}
