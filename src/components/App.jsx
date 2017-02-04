import React, { Component } from 'react';
import SearchBox from '../components/SearchBox';
import Tab       from '../components/Tab';
import Entry     from '../components/Entry';

const { arrayOf, shape, string, number, func, bool } = React.PropTypes;

export default class App extends Component {
  static propTypes = {
    fetchSearchIndex: func.isRequired,
    search:           func.isRequired,
    onClickSticky:    func.isRequired,
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
    const { fetchSearchIndex } = this.props;
    fetchSearchIndex();
  }

  render = () => {
    const { searchQuery, search, onClickSticky } = this.props;

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
            {
              this.props.entries
              .filter(entry => entry.visible)
              .map(
                entry => (<Entry key={entry.url} entry={entry} onClickSticky={onClickSticky} />),
              )
            }
          </tbody>
        </table>
      </div>
    );
  }
}
