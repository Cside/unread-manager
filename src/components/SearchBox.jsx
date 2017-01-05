import React, { Component } from 'react';

const { func } = React.PropTypes;

class SearchBox extends Component {
  static propTypes = {
    onInput: func.isRequired,
  }

  onChange = (e) => {
    const { onInput } = this.props;
    onInput(e.target.value);
  }

  render = () => {
    return (
      <input type="text" onChange={this.onChange} />
    );
  }
}

export default SearchBox;
