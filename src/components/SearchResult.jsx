import React, { Component } from 'react';
import Entry from '../components/Entry';
import T     from '../propTypes';

class SearchResult extends Component {
  static propTypes = {
    actions:    T.actions,
    entries:    T.entries,
  }

  onClickReadMore = () => {
    const { actions } = this.props;
    actions.readMore();
  }

  render = () => {
    const { actions, entries } = this.props;

    return (
      <div>
        <table className="table">
          <tbody>
            {
              entries.items
              .filter(entry => entry.visible)
              .map(entry => (
                <Entry key={entry.url} entry={entry} actions={actions} />
              ))
            }
          </tbody>
        </table>
        {
          entries.pagenation.hasNext ? (
            <button className="btn btn-default" onClick={this.onClickReadMore}>もっと読む</button>
          ) : null
        }
      </div>
    );
  }
}

export default SearchResult;
