import React, { Component } from 'react';
import visualwidth from 'visualwidth';
import T from '../propTypes';
import Sticky from './Sticky';

class Entry extends Component {
  static propTypes = {
    actions: T.actions,
    entry:   T.entry,
  }

  render = () => {
    const { entry, actions } = this.props;

    // XXX これ component を update するたびに計算するの盛大に無駄な気がする ...
    entry.readThisLater = entry.tags.some(tag => tag === 'あとで読む');

    return (
      <tr>
        <td width="33">
          <Sticky actions={actions} entry={entry} />
        </td>
        <td width="30">
          <img src={`http://cdn-ak.favicon.st-hatena.com/?url=${encodeURIComponent(entry.baseUrl)}`} />
        </td>
        <td width="600">
          <a href={entry.url} target="_blank" rel="noopener noreferrer">
            {visualwidth.truncate(entry.title, 80, '...')}
          </a>
          {entry.comment ? (<div className="text-muted">{entry.comment}</div>) : null}
        </td>
        <td width="70">
          {entry.date}
        </td>
        <td width="60">
          <img src={`http://b.st-hatena.com/entry/image/${entry.url}`} />
        </td>
      </tr>
    );
  }
}

export default Entry;
