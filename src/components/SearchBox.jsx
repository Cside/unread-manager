import React, { Component } from 'react';
// import _ from 'underscore';

const { string, func } = React.PropTypes;

class SearchBox extends Component {
  static propTypes = {
    filterEntries: func.isRequired,
    searchQuery:   string.isRequired,
  }

  // _.debounce するとなぜか wait = 0 でもテキストエリアの値がおかしくなるので諦めた
  onChange = (value) => this.props.filterEntries({ searchQuery: value })

  render = () => {
    const { searchQuery } = this.props;
    return (
      <input type="text" onChange={(e) => this.onChange(e.target.value)} value={searchQuery} />
    );
  }
}

export default SearchBox;
