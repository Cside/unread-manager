import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import App from '../components/App';

const mapStateToProps = state => ({
  entries:     state.entries,
  searchQuery: state.searchQuery,
  initialized: state.initialized,
  pagenation:  state.pagenation,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
