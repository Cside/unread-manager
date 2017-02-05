import React, { Component } from 'react';
import SearchBox from '../components/SearchBox';
import Tab       from '../components/Tab';
import Entry     from '../components/Entry';

const { arrayOf, shape, string, number, func, bool } = React.PropTypes;

export default class App extends Component {
  static propTypes = {
    actions: shape({
      fetchSearchIndex: func.isRequired,
      filterEntries:    func.isRequired,
      onClickSticky:    func.isRequired,
    }).isRequired,
    initialized:      bool.isRequired,
    searchQuery:      string.isRequired,
    entries:          arrayOf(
      shape({
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
    ).isRequired,
  };

  componentWillMount = () => {
    const { actions } = this.props;
    actions.fetchSearchIndex();
  }

  render = () => {
    const { searchQuery, initialized, actions } = this.props;

    const Content = initialized ? (
      <table className="table">
        <tbody>
          {
            this.props.entries
            .filter(entry => entry.visible)
            .map(entry => (
              <Entry key={entry.url} entry={entry} onClickSticky={actions.onClickSticky} />
            ))
          }
        </tbody>
      </table>
    ) : (
      <img src="/img/loading.gif" />
    );

    return (
      <div>
        <div>
          <SearchBox filterEntries={actions.filterEntries} searchQuery={searchQuery} />
          {
            [
              { name: '全て',       searchQuery: '' },
              { name: 'あとで読む', searchQuery: 'あとで読む' },
            ].map((data) => {
              return (
                <Tab
                  key={data.name}
                  name={data.name}
                  onClick={() => { actions.filterEntries(data.searchQuery); }}
                />
              );
            })
          }
        </div>
        <div>
          {Content}
        </div>
      </div>
    );
  }
}
