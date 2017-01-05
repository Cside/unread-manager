import { connect } from 'react-redux';
import { fetchSearchIndex, setVisibleEntries } from '../actions';
import App from '../components/App';

const mapStateToProps = state => {
  return {
    visibleEntries: state.visibleEntries,
  };
};
const mapDispatchToProps = dispatch => ({
  onLoad:  () => dispatch(fetchSearchIndex()),
  onInput: (words) => dispatch(setVisibleEntries(words)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
