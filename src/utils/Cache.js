import lscache from 'lscache';

class Cache {
  static getOrSetForPromise(key, callback, expires) {
    const cache = lscache.get(key);
    if (cache) {
      console.debug(`Cache exists. key: ${key}`);
      return Promise.resolve(cache);
    }
    console.debug(`Cache expired. key: ${key}`);
    return callback()
      .then((data) => {
        lscache.set(key, data, expires);
        return data;
      });
  }
}

export default Cache;
