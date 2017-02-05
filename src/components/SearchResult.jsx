import React, { Component } from 'react';
import Entry from '../components/Entry';
import T     from '../propTypes';

class SearchResult extends Component {
  static propTypes = {
    actions: T.shape({
      onClickSticky: T.func.isRequired,
    }),
    entries:    T.entries,
    pagenation: T.pagenation,
  }

  render = () => {
    const { actions, entries, pagenation } = this.props;

    return (
      <div>
        <table className="table">
          <tbody>
            {
              entries
              .filter(entry => entry.visible)
              .map(entry => (
                <Entry key={entry.url} entry={entry} actions={actions} />
              ))
            }
          </tbody>
        </table>
        {pagenation.hasNext ? (<p>もっと読む</p>) : null}
      </div>
    );
  }
}

export default SearchResult;
