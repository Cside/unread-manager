import React, { Component } from 'react';
import visualwidth from 'visualwidth';

const { arrayOf, shape, string, number } = React.PropTypes;

class Entry extends Component {
  static propTypes = {
    entry: shape({
      id:        number.isRequired,
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

    const comment = entry.comment ? (<div className="text-muted">{entry.comment}</div>) : null;

    return (
      <tr>
        <td className="favicon">
          <img alt="" src={`http://cdn-ak.favicon.st-hatena.com/?url=${encodeURIComponent(entry.baseUrl)}`} />
        </td>
        <td>
          <a href={entry.url} target="_blank" rel="noopener noreferrer">
            {visualwidth.truncate(entry.title, 80, '...')}
          </a>
          {comment}
        </td>
        <td>
          {entry.date}
        </td>
      </tr>
    );
  }
}

export default Entry;
