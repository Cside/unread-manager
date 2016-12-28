import React from 'react';
import { connect } from 'react-redux';


class App extends React.Component {
  static propTypes() {
    return { children: React.PropTypes.node };
  }

  render() {
    const { children } = this.props;
    return (
      <div>
        {children}
      </div>
    );
  }
}

// const mapStateToProps = (state, ownProps) => ({
//   errorMessage: state.errorMessage,
//   inputValue: ownProps.location.pathname.substring(1)
// })

export default connect()(App);
