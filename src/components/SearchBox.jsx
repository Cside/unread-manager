import React, { Component } from 'react';
import T from '../propTypes';

class SearchBox extends Component {
  static propTypes = {
    actions:     T.actions,
    searchQuery: T.string.isRequired,
  }

  componentDidMount() {
    document.querySelector('.searchQuery').focus();
  }

  // _.debounce するとなぜか wait = 0 でもテキストエリアの値がおかしくなるので諦めた
  onChange = (value) => this.props.actions.search({ searchQuery: value })

  render = () => {
    const { searchQuery } = this.props;
    return (
      <input className="searchQuery" type="text" onChange={(e) => this.onChange(e.target.value)} value={searchQuery} />
    );
  }
}

export default SearchBox;
