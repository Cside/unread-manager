/* global define, it, describe */
import assert from 'power-assert';
import entriesReducer from '../../src/reducers/entries';

describe('SEARCH', () => {
  const action = { type: 'SEARCH' };

  it('hasNext = false', () => {
    assert.deepEqual(
      entriesReducer(
        {
          items: [
            { id: 1, forSearch: 'foo bar', visible: false },
            { id: 2, forSearch: 'bar baz', visible: false },
            { id: 3, forSearch: 'baz foo', visible: false },
          ],
        },
        { ...action, searchQuery: '' },
      ),
      {
        items: [
          { id: 1, forSearch: 'foo bar', visible: true },
          { id: 2, forSearch: 'bar baz', visible: true },
          { id: 3, forSearch: 'baz foo', visible: true },
        ],
        pagenation: { nextId : 4, hasNext: false },
      },
    );
  });

  it('hasNext = true', () => {
    assert.deepEqual(
      entriesReducer(
        {
          items: [
            { id: 1, forSearch: 'foo bar', visible: true },
            { id: 2, forSearch: 'bar baz', visible: true },
            { id: 3, forSearch: 'baz foo', visible: true },
          ],
        },
        { ...action, searchQuery: '', itemsPerPage: 2 },
      ),
      {
        items: [
          { id: 1, forSearch: 'foo bar', visible: true },
          { id: 2, forSearch: 'bar baz', visible: true },
          { id: 3, forSearch: 'baz foo', visible: false },
        ],
        pagenation: { nextId: 3, hasNext: true },
      },
    );
  });

  // it('search by words', () => {
  //   assert.deepEqual(
  //     entriesReducer(
  //       {
  //         items: [
  //           { id: 1, forSearch: 'foo bar', visible: true },
  //           { id: 2, forSearch: 'bar baz', visible: true },
  //           { id: 3, forSearch: 'baz foo', visible: true },
  //           { id: 4, forSearch: 'baz foo', visible: true },
  //           { id: 5, forSearch: 'baz foo', visible: true },
  //         ],
  //       },
  //       { ...action, searchQuery: '', itemsPerPage: 2 },
  //     ),
  //     {
  //       items: [
  //         { id: 1, forSearch: 'foo bar', visible: true },
  //         { id: 2, forSearch: 'bar baz', visible: true },
  //         { id: 3, forSearch: 'baz foo', visible: true },
  //         { id: 4, forSearch: 'baz foo', visible: true },
  //         { id: 5, forSearch: 'baz foo', visible: true },
  //         { id: 6, forSearch: 'baz foo', visible: true },
  //       ],
  //       pagenation: { nextId: 6, hasNext: true },
  //     },
  //   );
  // });

  // it('searcy by empty query', () => {
  //   assert.deepEqual(
  //     entriesReducer(
  //       entries,
  //       { ...action, searchQuery: '　' },
  //     ),
  //     {
  //       items: [
  //         { id: 1, forSearch: 'foo bar', visible: true },
  //         { id: 2, forSearch: 'bar baz', visible: true },
  //         { id: 3, forSearch: 'baz foo', visible: true },
  //       ],
  //       pagenation: { lastId: 3, hasNext: false },
  //     },
  //   );
  // });
});

// describe('RECEIVE_ENTRIES', () => {
//   it('does not throw', () => {
//     assert.deepEqual(
//       entriesReducer(
//         { items: [], pagenation: { lastId: 0, hasNext: false } },
//         {
//           type: 'RECEIVE_ENTRIES',
//           entries: [
//             { id: 1, visible: false },
//             { id: 2, visible: false },
//             { id: 3, visible: false },
//           ],
//         },
//       ),
//       {
//         items: [
//           { id: 1, visible: false },
//           { id: 2, visible: false },
//           { id: 3, visible: false },
//         ],
//         pagenation: {
//           lastId:  3,
//           hasNext: false,
//         },
//       },
//     );
//   });
// });
// 
// describe('TOGGLE_STICKY', () => {
//   const action = { type: 'TOGGLE_STICKY' };
//   const pagenation = {
//     current: 1,
//     hasNext: false,
//   };
//   const state = {
//     items: [
//       { id: 1, url: 'http://1.com/', tags: [], visible: true },
//       { id: 2, url: 'http://2.com/', tags: [], visible: true },
//       { id: 3, url: 'http://3.com/', tags: [], visible: true },
//     ],
//     pagenation,
//   };
// 
//   it('replace entry', () => {
//     assert.deepEqual(
//       entriesReducer(
//         state,
//         {
//           ...action,
//           entry: {
//             id:      2,
//             url:     'http://2.com/',
//             tags:    ['foo'],
//             visible: true,
//           },
//         },
//       ),
//       {
//         items: [
//           { id: 1, url: 'http://1.com/', tags: [],      visible: true },
//           { id: 2, url: 'http://2.com/', tags: ['foo'], visible: true, forSearch: ' foo  http://2.com/' },
//           { id: 3, url: 'http://3.com/', tags: [],      visible: true },
//         ],
//         pagenation,
//       },
//     );
//   });
// 
//   it("hasn't changed state", () => {
//     assert.deepEqual(
//       state,
//       {
//         items: [
//           { id: 1, url: 'http://1.com/', tags: [], visible: true },
//           { id: 2, url: 'http://2.com/', tags: [], visible: true },
//           { id: 3, url: 'http://3.com/', tags: [], visible: true },
//         ],
//         pagenation,
//       },
//     );
//   });
// });
// 
// describe('applyPagenation', () => {
//   const itemsPerPage = 2;
// 
//   it("doesn't have next page", () => {
//     const page = 1;
//     assert.deepEqual(
//       applyPagenation(
//         [
//           { id: 1, visible: false },
//           { id: 2, visible: false },
//           { id: 3, visible: true },
//           { id: 4, visible: true },
//         ],
//         page,
//         itemsPerPage,
//       ),
//       {
//         items: [
//           { id: 1, visible: false },
//           { id: 2, visible: false },
//           { id: 3, visible: true },
//           { id: 4, visible: true },
//         ],
//         pagenation: {
//           current: page,
//           hasNext: false,
//         },
//       },
//     );
//   });
// 
//   it('has next page', () => {
//     const page = 1;
//     assert.deepEqual(
//       applyPagenation(
//         [
//           { id: 1, visible: true },
//           { id: 2, visible: true },
//           { id: 3, visible: true },
//           { id: 4, visible: true },
//         ],
//         page,
//         itemsPerPage,
//       ),
//       {
//         items: [
//           { id: 1, visible: true },
//           { id: 2, visible: true },
//           { id: 3, visible: false },
//           { id: 4, visible: false },
//         ],
//         pagenation: {
//           current: page,
//           hasNext: true,
//         },
//       },
//     );
//   });
// });
