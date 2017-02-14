export default function makeBookmarkEntryUrl(url) {
  return url.replace(/^https?:\/\//, (match) => {
    return match === 'http://' ? 'http://b.hatena.ne.jp/entry/'
                               : 'http://b.hatena.ne.jp/entry/s/';
  });
}
