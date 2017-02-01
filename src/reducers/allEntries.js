import URI from 'urijs';
import _ from 'underscore';
import clone from 'clone';

// ここに置いていいのか感
export const parseSearchIndex = (text) => {
  const lines = text.split('\n');

  const partitions = _.partition(lines, (line) => {
    return /^(\d+)\t(\d+)$/.test(line);
  });
  let countAndTimess = partitions[0];
  const texts        = partitions[1];

  countAndTimess = countAndTimess.map((line) => {
    const [count, date] = line.split('\t');
    const [yyyy, mm, dd] = /^(\d{4})(\d{2})(\d{2})/.exec(date).slice(1, 4);
    return { count: Number(count), date: `${yyyy}/${mm}/${dd}` };
  });

  const result = [];
  let id = 0;
  texts.forEach((line, i) => {
    const index = Math.floor(i / 3);
    switch (i % 3) {
      case 0: {
        result[index] = { id: ++id, title: line.trim() };
        break;
      }
      case 1: {
        const tags = [];
        line = line.replace(/(?:\[(.+?)])/g, (all, tag) => {
          tags.push(tag);
          return '';
        });
        line = line.trim();

        result[index].tags    = tags;
        result[index].comment = line === '' ? null : line;
        break;
      }
      case 2: {
        const uri = new URI(line);
        result[index].baseUrl = `${uri.protocol()}://${uri.hostname()}/`;
        result[index].url = line;
        result[index].forSearch = [
          result[index].title,
          result[index].tags.join(' '),
          result[index].comment || '',
          result[index].url,
        ].join(' ').toLowerCase();
        break;
      }
      default: {
        break;
      }
    }
  });

  // return _.zip(countAndTimess, result).map((one) => {
  //   return Object.assign(one[0], one[1]);
  // });
  // TODO 検証用
  const entries = _.zip(countAndTimess, result)
                   .map((one) => Object.assign(one[0], one[1]));
  return entries.slice(0, 10);
};

export default function allEntries(state = [], action) {
  switch (action.type) {
    case 'RECEIVE_SEARCH_INDEX': {
      // XXX 一応パースの時間測りたい。改善の余地あんま無さそうな気がするけど...
      return parseSearchIndex(action.searchIndex);
    }
    case 'TOGGLE_STICKY': {
      // XXX fastest-clone というのもあるらしい
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
    default: {
      return state;
    }
  }
}
