import URI from 'urijs';
import _ from 'underscore';
import clone from 'clone';

// XXX ここに置いていいのか感
export const parseSearchIndex = (text) => {
  const lines = text.split('\n');

  const partitions = _.partition(lines, (line) => {
    return /^(\d+)\t(\d+)$/.test(line);
  });
  let entries = partitions[0];
  const texts = partitions[1];

  entries = entries.map((line) => {
    const [count, date] = line.split('\t');
    const [yyyy, mm, dd] = /^(\d{4})(\d{2})(\d{2})/.exec(date).slice(1, 4);
    return {
      count:   Number(count),
      date:    `${yyyy}/${mm}/${dd}`,
      visible: true,
    };
  });

  const additionals = [];
  let id = 0;
  texts.forEach((line, i) => {
    const index = Math.floor(i / 3);
    switch (i % 3) {
      case 0: {
        additionals[index] = { id: ++id, title: line.trim() };
        break;
      }
      case 1: {
        const tags = [];
        line = line.replace(/(?:\[(.+?)])/g, (all, tag) => {
          tags.push(tag);
          return '';
        });
        line = line.trim();

        additionals[index].tags    = tags;
        additionals[index].comment = line === '' ? null : line;
        break;
      }
      case 2: {
        const uri = new URI(line);
        additionals[index].baseUrl = `${uri.protocol()}://${uri.hostname()}/`;
        additionals[index].url = line;
        additionals[index].forSearch = [
          additionals[index].title,
          additionals[index].tags.join(' '),
          additionals[index].comment || '',
          additionals[index].url,
        ].join(' ').toLowerCase();
        break;
      }
      default: {
        break;
      }
    }
  });

  entries = _.zip(entries, additionals)
             .map((one) => Object.assign(one[0], one[1]));
  // TODO 検証用
  return entries.slice(0, 10);
  // return entries;
};

export default function entries(state = [], action) {
  switch (action.type) {
    case 'RECEIVE_SEARCH_INDEX': {
      // XXX 一応パースの時間測りたい。改善の余地あんま無さそうな気がするけど...
      return parseSearchIndex(action.searchIndex);
    }
    // XXX テスト書きたい
    case 'TOGGLE_STICKY': {
      // XXX fastest-clone というのもあるらしい
      // TODO action.entries じゃなくていいの？
      const entries = clone(state);

      // XXX 計算量ひどいので割りと真剣になんとかしたい ...
      // あと url の文字列比較より id 比較のほうが若干高速なのでは ...
      const i = entries.findIndex((entry)  => entry.url === action.entry.url);
      if (i < 0) {
        console.error(`Entry was not found in state. entry.url = ${action.entry.url}`);
      }
      entries[i] = action.entry;

      return entries;
    }
    // XXX テスト書きたすぎる
    case 'SEARCH': {
      const searchQueries = action.searchQuery.split(/\s+/)
                            .filter(str => str !== '')
                            .map(str => str.toLowerCase());
      if (searchQueries.length === 0) {
        return action.entries;
      }
      return clone(action.entries).map(
        entry => {
          entry.visible = searchQueries.some(
            searchQuery => entry.forSearch.indexOf(searchQuery.toLowerCase()) >= 0,
          );
          return entry;
        },
      );
    }
    default: {
      return state;
    }
  }
}
