/* global define, it, describe */
import assert from 'power-assert';
import entriesReducer, { applyPagenation } from '../../src/reducers/entries';

describe('RECEIVE_ENTRIES', () => {
  it('does not throw', () => {
    assert.deepEqual(
      entriesReducer(
        { items: [], pagenation: { current: 1, hasNext: false } },
        {
          type: 'RECEIVE_ENTRIES',
          entries: [
            { id: 1, visible: false },
            { id: 2, visible: false },
            { id: 3, visible: false },
          ],
        },
      ),
      {
        items: [
          { id: 1, visible: false },
          { id: 2, visible: false },
          { id: 3, visible: false },
        ],
        pagenation: {
          current: 1,
          hasNext: false,
        },
      },
    );
  });
});

describe('TOGGLE_STICKY', () => {
  const action = { type: 'TOGGLE_STICKY' };
  const pagenation = {
    current: 1,
    hasNext: false,
  };
  const state = {
    items: [
      { id: 1, url: 'http://1.com/', tags: [], visible: true },
      { id: 2, url: 'http://2.com/', tags: [], visible: true },
      { id: 3, url: 'http://3.com/', tags: [], visible: true },
    ],
    pagenation,
  };

  it('replace entry', () => {
    assert.deepEqual(
      entriesReducer(
        state,
        {
          ...action,
          entry: {
            id:      2,
            url:     'http://2.com/',
            tags:    ['foo'],
            visible: true,
          },
        },
      ),
      {
        items: [
          { id: 1, url: 'http://1.com/', tags: [],      visible: true },
          { id: 2, url: 'http://2.com/', tags: ['foo'], visible: true, forSearch: ' foo  http://2.com/' },
          { id: 3, url: 'http://3.com/', tags: [],      visible: true },
        ],
        pagenation,
      },
    );
  });

  it("hasn't changed state", () => {
    assert.deepEqual(
      state,
      {
        items: [
          { id: 1, url: 'http://1.com/', tags: [], visible: true },
          { id: 2, url: 'http://2.com/', tags: [], visible: true },
          { id: 3, url: 'http://3.com/', tags: [], visible: true },
        ],
        pagenation,
      },
    );
  });
});

describe('SEARCH', () => {
  const action = { type: 'SEARCH', page: 1 };
  const pagenation = {
    current: 1,
    hasNext: false,
  };
  let entries;

  it('search by words', () => {
    entries = entriesReducer(
      {
        items: [
          { id: 1, forSearch: 'foo bar', visible: true },
          { id: 2, forSearch: 'bar baz', visible: true },
          { id: 3, forSearch: 'baz foo', visible: true },
        ],
        pagenation,
      },
      { ...action, searchQuery: ' Bar Foo 　' },
    );
    assert.deepEqual(
      entries,
      {
        items: [
          { id: 1, forSearch: 'foo bar', visible: true },
          { id: 2, forSearch: 'bar baz', visible: false },
          { id: 3, forSearch: 'baz foo', visible: false },
        ],
        pagenation,
      },
    );
  });

  it('searcy by empty query', () => {
    assert.deepEqual(
      entriesReducer(
        entries,
        { ...action, searchQuery: '　' },
      ),
      {
        items: [
          { id: 1, forSearch: 'foo bar', visible: true },
          { id: 2, forSearch: 'bar baz', visible: true },
          { id: 3, forSearch: 'baz foo', visible: true },
        ],
        pagenation,
      },
    );
  });
});

describe('applyPagenation', () => {
  const itemsPerPage = 2;

  it("doesn't have next page", () => {
    const page = 1;
    assert.deepEqual(
      applyPagenation(
        [
          { id: 1, visible: false },
          { id: 2, visible: false },
          { id: 3, visible: true },
          { id: 4, visible: true },
        ],
        page,
        itemsPerPage,
      ),
      {
        items: [
          { id: 1, visible: false },
          { id: 2, visible: false },
          { id: 3, visible: true },
          { id: 4, visible: true },
        ],
        pagenation: {
          current: page,
          hasNext: false,
        },
      },
    );
  });

  it('has next page', () => {
    const page = 1;
    assert.deepEqual(
      applyPagenation(
        [
          { id: 1, visible: true },
          { id: 2, visible: true },
          { id: 3, visible: true },
          { id: 4, visible: true },
        ],
        page,
        itemsPerPage,
      ),
      {
        items: [
          { id: 1, visible: true },
          { id: 2, visible: true },
          { id: 3, visible: false },
          { id: 4, visible: false },
        ],
        pagenation: {
          current: page,
          hasNext: true,
        },
      },
    );
  });
});
