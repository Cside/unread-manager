import React, { Component } from 'react';
import visualwidth from 'visualwidth';

const { arrayOf, shape, string, number, func, bool } = React.PropTypes;

class Entry extends Component {
  static propTypes = {
    onClickSticky: func.isRequired,
    entry: shape({
      id:        number.isRequired,
      title:     string.isRequired,
      tags:      arrayOf(string.isRequired).isRequired,
      comment:   string,
      url:       string.isRequired,
      baseUrl:   string.isRequired,
      count:     number.isRequired,
      date:      string.isRequired,
      forSearch: string.isRequired,
      visible:   bool.isRequired,
    }).isRequired,
  }

  onClickSticky = () => {
    const { entry, onClickSticky } = this.props;
    onClickSticky(entry);
  }

  // TODO state を更新してるつもりだが呼ばれない ... 何故？
  render = () => {
    const { entry } = this.props;

    // XXX これ component を update するたびに計算するの盛大に無駄な気がする ...
    entry.readThisLater = entry.tags.some((tag) => tag === 'あとで読む');
    const comment   = entry.comment ? (<div className="text-muted">{entry.comment}</div>) : null;

    return (
      <tr>
        <td>
          <a href="javascript:void(0)" onClick={this.onClickSticky}>
            <img className="sticky-img" src={`/img/sticky_${entry.readThisLater ? 'on' : 'off'}.png`} />
          </a>
        </td>
        <td width="80">
          <img src={`http://b.st-hatena.com/entry/image/${entry.url}`} />
        </td>
        <td width="35">
          <img src={`http://cdn-ak.favicon.st-hatena.com/?url=${encodeURIComponent(entry.baseUrl)}`} />
        </td>
        <td width="600">
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
