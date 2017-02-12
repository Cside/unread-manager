import URI from 'urijs';
import _ from 'underscore';
import initializeEntry from './initializeEntry';

export default function parseSearchIndex(text) {
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
        break;
      }
      default: {
        break;
      }
    }
  });

  entries = _.zip(entries, additionals)
             .map(one => Object.assign(one[0], one[1]))
             .map(entry => initializeEntry(entry));
  // return entries.slice(0, 10);
  return entries;
}
