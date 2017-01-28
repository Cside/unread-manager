import React, { Component } from 'react';

const { string, func } = React.PropTypes;

class SearchBox extends Component {
  static propTypes = {
    search:      func.isRequired,
    searchQuery: string.isRequired,
  }

  render = () => {
    const { searchQuery, search } = this.props;
    return (
      <input type="text" onChange={(e) => search(e.target.value)} value={searchQuery} />
    );
  }
}

export default SearchBox;
