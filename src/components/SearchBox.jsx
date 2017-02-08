import React, { Component } from 'react';
import T from '../propTypes';

class SearchBox extends Component {
  static propTypes = {
    actions:     T.actions,
    searchQuery: T.string.isRequired,
  }

  // _.debounce するとなぜか wait = 0 でもテキストエリアの値がおかしくなるので諦めた
  onChange = (value) => this.props.actions.filterEntries({ searchQuery: value })

  render = () => {
    const { searchQuery } = this.props;
    return (
      <input type="text" onChange={(e) => this.onChange(e.target.value)} value={searchQuery} />
    );
  }
}

export default SearchBox;
