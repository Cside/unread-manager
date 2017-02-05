export default function initializedReducer(state = false, action) {
  switch (action.type) {
    case 'RECEIVE_ENTRIES':
      return true;
    default:
      return state;
  }
}
