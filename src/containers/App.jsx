import { connect } from 'react-redux';
import { fetchSearchIndex, filterEntries, onClickSticky } from '../actions';
import App from '../components/App';

const mapStateToProps = state => {
  return {
    entries:     state.entries,
    searchQuery: state.searchQuery,
    initialized: state.initialized,
  };
};

const mapDispatchToProps = dispatch => ({
  // XXX これ bindActionCreators に置き換えられるのでは。超冗長
  fetchSearchIndex: ()            => dispatch(fetchSearchIndex()),
  filterEntries:    (searchQuery) => dispatch(filterEntries(searchQuery)),
  onClickSticky:    (entry)       => dispatch(onClickSticky(entry)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
