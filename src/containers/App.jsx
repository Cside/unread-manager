import { connect } from 'react-redux';
import { fetchSearchIndex, search, toggleSticky } from '../actions';
import App from '../components/App';

const mapStateToProps = state => {
  return {
    // visibleEntries: state.visibleEntries,
    visibleEntries: state.allEntries,
    searchQuery:    state.searchQuery,
  };
};

const mapDispatchToProps = dispatch => ({
  // XXX これ bindActionCreators に置き換えられるんとちゃうか
  fetchSearchIndex: ()            => dispatch(fetchSearchIndex()),
  search:           (searchQuery) => dispatch(search(searchQuery)),
  toggleSticky:     (entry)       => dispatch(toggleSticky(entry)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
