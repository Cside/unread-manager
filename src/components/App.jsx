import React, { Component } from 'react';
import SearchBox from '../components/SearchBox';
import Tabs      from '../components/Tabs';
import Entry     from '../components/Entry';

const { arrayOf, shape, string, func } = React.PropTypes;

export default class App extends Component {
  static propTypes = {
    onLoad: func.isRequired,
    onInput: func.isRequired,
    visibleEntries: arrayOf(
      shape({
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

  componentDidMount() {
    const { onLoad } = this.props;
    onLoad();
  }

  render() {
    const { onInput } = this.props;

    return (
      <div>
        <SearchBox onInput={onInput} />
        <Tabs />
        {this.props.visibleEntries.map(
          entry => (<Entry key={entry.url} entry={entry} />),
        )}
      </div>
    );
  }
}
