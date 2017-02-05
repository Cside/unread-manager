import { PropTypes as T } from 'react';

export default {
  ...T,
  entries: T.shape({
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
    current:  T.string.isRequired,
    hasNexxt: T.bool.isRequired,
  }),
};
