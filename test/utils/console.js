import colors from 'colors/safe';

[
  ['debug', 'blue'],
  ['info', 'blue'],
  ['warn', 'yellow'],
  ['error', 'red'],
].forEach(([method, color]) => {
  console[method] = (msg) => console.log(colors[color](msg));
});
