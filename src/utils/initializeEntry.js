export default function initializeEntry(entry) {
  entry.forSearch = [
    entry.title,
    entry.tags.join(' '),
    entry.comment || '',
    entry.url,
  ].join(' ').toLowerCase();
  return entry;
}
