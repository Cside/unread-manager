/* global define, it, describe */
import assert from 'power-assert';
import makeBookmarkEntryUrl from '../../src/utils/makeBookmarkEntryUrl';

describe('makeBookmarkEntryUrl', () => {
  it('http', () => {
    assert(
      makeBookmarkEntryUrl('http://www.asahi.com/articles/ASK234D1CK23PLZB00B.html') ===
      'http://b.hatena.ne.jp/entry/www.asahi.com/articles/ASK234D1CK23PLZB00B.html',
    );
  });
  it('https', () => {
    assert(
      makeBookmarkEntryUrl('https://note.mu/etomiho/n/nd3b3c62bac22') ===
      'http://b.hatena.ne.jp/entry/s/note.mu/etomiho/n/nd3b3c62bac22',
    );
  });
});
