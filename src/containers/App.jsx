import { connect } from 'react-redux';
import { fetchSearchIndex, search } from '../actions';
import App from '../components/App';

const mapStateToProps = state => {
  return {
    visibleEntries: state.visibleEntries,
    searchQuery:    state.searchQuery,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchSearchIndex: ()            => dispatch(fetchSearchIndex()),
  search:           (searchQuery) => dispatch(search(searchQuery)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
