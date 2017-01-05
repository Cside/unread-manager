import lscache from 'lscache';

class Cache {
  static getOrSetForPromise(key, callback, expires) {
    const cache = lscache.get(key);
    if (cache) {
      return Promise.resolve(cache);
    }
    return callback()
      .then((data) => {
        lscache.set(key, data, expires);
        return data;
      });
  }
}

export default Cache;
