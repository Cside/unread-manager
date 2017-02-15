import React, { Component } from 'react';
import visualwidth from 'visualwidth';
import T from '../propTypes';
import makeBookmarkEntry from '../utils/makeBookmarkEntryUrl';
import Sticky from './Sticky';

class Entry extends Component {
  static propTypes = {
    actions: T.actions,
    entry:   T.entry,
  }

  render = () => {
    const { entry, actions } = this.props;

    // TODO
    // 必要な計算は初期化時にまとめてやったほうが、インクリメンタルサーチの速度が向上する。
    // truncate とか makeBookmarkEntry とかも同様。
    entry.readThisLater = entry.tags.some(tag => tag === 'あとで読む');

    return (
      <tr>
        <td width="33">
          <Sticky actions={actions} entry={entry} />
        </td>
        <td width="30">
          <img src={`http://cdn-ak.favicon.st-hatena.com/?url=${encodeURIComponent(entry.url)}`} />
        </td>
        <td width="600">
          <a href={entry.url} target="_blank" rel="noopener noreferrer">
            {visualwidth.truncate(entry.title, 80, '...')}
          </a>
          {entry.comment ? (<div className="text-muted">{entry.comment}</div>) : null}
        </td>
        <td width="60">
          <a href={makeBookmarkEntry(entry.url)} target="_blank" rel="noopener noreferrer">
            <img src={`http://b.st-hatena.com/entry/image/${entry.url.replace(/#/g, '%23')}`} />
          </a>
        </td>
        <td width="70">
          {entry.date}
        </td>
      </tr>
    );
  }
}

export default Entry;
