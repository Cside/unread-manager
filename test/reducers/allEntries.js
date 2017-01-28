/* global define, it, describe */
import assert from 'power-assert';

const { parseSearchIndex } = require(`${process.cwd()}/src/reducers/allEntries`);

describe('parseSearchIndex', () => {
  it('parses text', () => {
    const result = parseSearchIndex(`title1

http://example.coom/1
title2
[tag1]
http://example.coom/2
title3
comment
http://example.coom/3
title4
[tag1][tag2]comment
http://example.coom/4
13\t20161228000023
265\t20161227230047
5\t20161226225603
3\t20161225211201`);
    assert.deepEqual(result, [
      {
        id:        1,
        title:     'title1',
        tags:      [],
        comment:   null,
        url:       'http://example.coom/1',
        baseUrl:   'http://example.coom/',
        count:     13,
        date:      '2016/12/28',
        forSearch: 'title1   http://example.coom/1',
      },
      {
        id:        2,
        title:     'title2',
        tags:      ['tag1'],
        comment:   null,
        url:       'http://example.coom/2',
        baseUrl:   'http://example.coom/',
        count:     265,
        date:      '2016/12/27',
        forSearch: 'title2 tag1  http://example.coom/2',
      },
      {
        id:        3,
        title:     'title3',
        tags:      [],
        comment:   'comment',
        url:       'http://example.coom/3',
        baseUrl:   'http://example.coom/',
        count:     5,
        date:      '2016/12/26',
        forSearch: 'title3  comment http://example.coom/3',
      },
      {
        id:        4,
        title:     'title4',
        tags:      ['tag1', 'tag2'],
        comment:   'comment',
        url:       'http://example.coom/4',
        baseUrl:   'http://example.coom/',
        count:     3,
        date:      '2016/12/25',
        forSearch: 'title4 tag1 tag2 comment http://example.coom/4',
      },
    ]);
  });
});
