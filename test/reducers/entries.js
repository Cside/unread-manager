/* global define, it, describe */
import assert from 'power-assert';
import entriesReducer from '../../src/reducers/entries';

describe('TOGGLE_STICKY', () => {
  const action = { type: 'TOGGLE_STICKY' };
  const state = [
    { id: 1, url: 'http://1.com/', tags: [], visible: true },
    { id: 2, url: 'http://2.com/', tags: [], visible: true },
    { id: 3, url: 'http://3.com/', tags: [], visible: true },
  ];

  it('replace entry', () => {
    assert.deepEqual(
      entriesReducer(
        state,
        {
          ...action,
          entry: { id: 2, url: 'http://2.com/', tags: ['foo'], visible: true },
        },
      ),
      [
        { id: 1, url: 'http://1.com/', tags: [],      visible: true },
        { id: 2, url: 'http://2.com/', tags: ['foo'], visible: true },
        { id: 3, url: 'http://3.com/', tags: [],      visible: true },
      ],
    );
  });

  it("hasn't changed state", () => {
    assert.deepEqual(
      state,
      [
        { id: 1, url: 'http://1.com/', tags: [], visible: true },
        { id: 2, url: 'http://2.com/', tags: [], visible: true },
        { id: 3, url: 'http://3.com/', tags: [], visible: true },
      ],
    );
  });
});

describe('SEARCH', () => {
  const action = { type: 'SEARCH' };

  it('apply search query', () => {
    const entries = entriesReducer(
      [
        { id: 1, forSearch: 'foo bar', visible: true },
        { id: 2, forSearch: 'bar baz', visible: true },
        { id: 3, forSearch: 'baz foo', visible: true },
      ],
      { ...action, searchQuery: ' Bar Foo 　' },
    );
    assert.deepEqual(
      entries,
      [
        { id: 1, forSearch: 'foo bar', visible: true },
        { id: 2, forSearch: 'bar baz', visible: false },
        { id: 3, forSearch: 'baz foo', visible: false },
      ],
    );
    assert.deepEqual(
      entriesReducer(
        entries,
        { ...action, searchQuery: '　' },
      ),
      [
        { id: 1, forSearch: 'foo bar', visible: true },
        { id: 2, forSearch: 'bar baz', visible: true },
        { id: 3, forSearch: 'baz foo', visible: true },
      ],
    );
  });
});
