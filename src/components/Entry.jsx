import React, { Component } from 'react';

const { arrayOf, shape, string } = React.PropTypes;

class Entry extends Component {
  static propTypes = {
    entry: shape({
      title:     string.isRequired,
      tags:      arrayOf(string.isRequired).isRequired,
      comment:   string,
      url:       string.isRequired,
      baseUrl:   string.isRequired,
      count:     string.isRequired,
      date:      string.isRequired,
      forSearch: string.isRequired,
    }).isRequired,
  }

  render = () => {
    const { entry } = this.props;

    const comment = entry.comment ? (<div>{entry.comment}</div>) : null;

    return (
      <div>
        <div>
          <img alt="favicon" src={`http://cdn-ak.favicon.st-hatena.com/?url=${encodeURIComponent(entry.baseUrl)}`} />
          <a href={entry.url} target="_blank" rel="noopener noreferrer">{entry.title}</a>
        </div>
        {comment}
      </div>
    );
  }
}

export default Entry;

