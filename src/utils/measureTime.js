export default function measureTime(msg, callback) {
  const start   = new Date();
  const result  = callback();
  const elapsed = (new Date() - start).toLocaleString();

  console.debug(`[${elapsed} ms] ${msg}`);
  return result;
}
