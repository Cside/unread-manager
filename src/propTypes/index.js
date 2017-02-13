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
  actions: T.shape({
    fetchSearchIndex: T.func.isRequired,
    search:    T.func.isRequired,
    onClickSticky:    T.func.isRequired,
    readMore:         T.func.isRequired,
  }).isRequired,
};

propTypes.entries = T.shape({
  items:      T.arrayOf(propTypes.entry),
  pagenation: T.shape({
    netId:    T.number,
    hasNext:  T.bool.isRequired,
  }),
});

export default propTypes;
