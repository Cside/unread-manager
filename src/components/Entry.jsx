import React, { Component } from 'react';
import visualwidth from 'visualwidth';
import T from '../propTypes';

class Entry extends Component {
  static propTypes = {
    actions: T.shape({
      onClickSticky: T.func.isRequired,
    }),
    entry: T.entry,
  }

  render = () => {
    const { entry, actions } = this.props;

    // XXX これ component を update するたびに計算するの盛大に無駄な気がする ...
    entry.readThisLater = entry.tags.some((tag) => tag === 'あとで読む');

    //     <td width="80">
    //       <img src={`http://b.st-hatena.com/entry/image/${entry.url}`} />
    //     </td>
    //     <td width="35">
    //       <img src={`http://cdn-ak.favicon.st-hatena.com/?url=${encodeURIComponent(entry.baseUrl)}`} />
    //     </td>

    return (
      <tr>
        <td>
          <a href="javascript:void(0)" onClick={() => actions.onClickSticky(entry)}>
            <img
              className="sticky-img"
              src={`/img/sticky_${entry.readThisLater ? 'on' : 'off'}.png`}
            />
          </a>
        </td>
        <td width="600">
          <a href={entry.url} target="_blank" rel="noopener noreferrer">
            {visualwidth.truncate(entry.title, 80, '...')}
          </a>
          {entry.comment ? (<div className="text-muted">{entry.comment}</div>) : null}
        </td>
        <td>
          {entry.date}
        </td>
      </tr>
    );
  }
}

export default Entry;
