import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import SearchBox from '../components/SearchBox';
import Tabs      from '../components/Tabs';
import Entry     from '../components/Entry';

class App extends React.Component {
  static propTypes = {};

  render() {
    return (
      <div>
        <SearchBox />
        <Tabs />
        { [1, 2, 3].map(n => (<Entry key={n} />)) }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { foo: state }; // TODO
};
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
