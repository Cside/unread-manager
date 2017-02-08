import React, { Component } from 'react';
import SearchBox      from '../components/SearchBox';
import Tab            from '../components/Tab';
import SearchResult   from '../components/SearchResult';
import T              from '../propTypes';

export default class App extends Component {
  static propTypes = {
    initialized: T.bool.isRequired,
    searchQuery: T.string.isRequired,
    pagenation:  T.pagenation,
    actions:     T.actions,
    entries:     T.entries,
  };

  componentWillMount = () => {
    const { actions } = this.props;
    actions.fetchSearchIndex();
  }

  render = () => {
    const { searchQuery, initialized, actions, entries, pagenation } = this.props;

    const Content = initialized ? (
      <SearchResult entries={entries} pagenation={pagenation} actions={actions} />
    ) : (
      <img src="/img/loading.gif" />
    );

    return (
      <div>
        <div>
          <SearchBox actions={actions} searchQuery={searchQuery} />
          {
            [
              { name: '全て',       searchQuery: '' },
              { name: 'あとで読む', searchQuery: 'あとで読む' },
            ].map(data => (
              <Tab
                key={data.name}
                name={data.name}
                onClick={() => actions.filterEntries({ searchQuery: data.searchQuery })}
              />
            ))
          }
        </div>
        <div>
          {Content}
        </div>
      </div>
    );
  }
}
