import React, { Component } from 'react';
import SearchBox from '../components/SearchBox';
import Tab       from '../components/Tab';
import Entry     from '../components/Entry';

const { arrayOf, shape, string, number, func } = React.PropTypes;

export default class App extends Component {
  static propTypes = {
    searchQuery:      string.isRequired,
    fetchSearchIndex: func.isRequired,
    search:           func.isRequired,
    visibleEntries: arrayOf(
      shape({
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
    ).isRequired,
  };

  componentDidMount = () => {
    const { fetchSearchIndex } = this.props;
    fetchSearchIndex();
  }

  render = () => {
    const { searchQuery, search } = this.props;

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
          {this.props.visibleEntries.map(
            entry => (<Entry key={entry.url} entry={entry} />),
          )}
        </table>
      </div>
    );
  }
}
