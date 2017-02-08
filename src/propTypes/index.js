import { PropTypes as T } from 'react';

const propTypes = {
  ...T,
  entry: T.shape({
    id:        T.number.isRequired,
    title:     T.string.isRequired,
    tags:      T.arrayOf(T.string.isRequired).isRequired,
    comment:   T.string,
    url:       T.string.isRequired,
    baseUrl:   T.string.isRequired,
    count:     T.number.isRequired,
    date:      T.string.isRequired,
    forSearch: T.string.isRequired,
    visible:   T.bool.isRequired,
  }).isRequired,
  pagenation: T.shape({
    current:  T.number.isRequired,
    hasNext:  T.bool.isRequired,
  }),
  actions: T.shape({
    fetchSearchIndex: T.func.isRequired,
    filterEntries:    T.func.isRequired,
    onClickSticky:    T.func.isRequired,
  }).isRequired,
};

propTypes.entries = T.arrayOf(propTypes.entry);

export default propTypes;
