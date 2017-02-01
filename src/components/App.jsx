import React, { Component } from 'react';
import SearchBox from '../components/SearchBox';
import Tab       from '../components/Tab';
import Entry     from '../components/Entry';

const { arrayOf, shape, string, number, func } = React.PropTypes;

export default class App extends Component {
  // TODO 初期化時は visibleEntries とかないので isRequired いらないのでは
  static propTypes = {
    fetchSearchIndex: func.isRequired,
    search:           func.isRequired,
    toggleSticky:     func.isRequired,
    searchQuery:      string.isRequired,
    visibleEntries:   arrayOf(
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
      }).isRequired,
    ).isRequired,
  };

  componentWillMount = () => {
    const { fetchSearchIndex } = this.props;
    fetchSearchIndex();
  }

  render = () => {
    const { searchQuery, search, toggleSticky } = this.props;

    return (
      <div>
        <SearchBox search={search} searchQuery={searchQuery} />
        {
          [
            { name: '全て',       searchQuery: '' },
            { name: 'あとで読む', searchQuery: 'あとで読む' },
          ].map((data) => {
            return (
              <Tab
                key={data.name}
                name={data.name}
                onClick={() => { search(data.searchQuery); }}
              />
            );
          })
        }
        <table className="table">
          <tbody>
            {this.props.visibleEntries.map(
              entry => (<Entry key={entry.url} entry={entry} toggleSticky={toggleSticky} />),
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
