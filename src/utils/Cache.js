import lscache from 'lscache';
import _ from 'underscore';

class Cache {
  // expires = min
  static getOrSetAsync(key, callback, expires) {
    const cache = lscache.get(key);
    if (cache) {
      console.debug(`Cache exists. key: ${key}`);
      return Promise.resolve(cache);
    }
    console.debug(`Cache expired. key: ${key}`);
    return callback()
    .then((data) => {
      if (_.isNull(data)) {
        console.error('Return value of callback === null');
      } else if (_.isUndefined(data)) {
        console.error('Return value of callback === undefined');
      } else if (data === '') {
        console.error("Return value of callback === ''");
      } else {
        lscache.set(key, data, expires);
      }
      return data;
    });
  }

  static remove(key) {
    lscache.remove(key);
  }
}

export default Cache;
