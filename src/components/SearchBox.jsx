import React, { Component } from 'react';
// import _ from 'underscore';

const { string, func } = React.PropTypes;

class SearchBox extends Component {
  static propTypes = {
    search:      func.isRequired,
    searchQuery: string.isRequired,
  }

  // wait = 0 でもなぜかテキストエリアの値がおかしくなる
  // onChange = _.debounce((value) => this.props.search(value), 0);
  onChange = (value) => this.props.search(value)

  render = () => {
    const { searchQuery } = this.props;
    return (
      <input type="text" onChange={(e) => this.onChange(e.target.value)} value={searchQuery} />
    );
  }
}

export default SearchBox;
