import { LocalStorage } from './storage';

export const saveAuthToken = token => {
  LocalStorage.save({
    key: LocalStorage.Key.authToken,
    data: token,
    // expires: 1000 * 3600,
  });
};

export const getAuthToken = async () => {
  return new Promise((resolve, reject) => {
    return LocalStorage.load({ key: LocalStorage.Key.authToken })
      .then(res => resolve(res))
      .catch(err => {
        // any exception including data not found
        // goes to catch()
        // console.warn(err.message);
        switch (err.name) {
          case 'NotFoundError':
            // TODO;
            break;
          case 'ExpiredError':
            // TODO
            break;
        }
        return resolve(null);
      });
  });
};

export const clearAuthToken = async () => {
  LocalStorage.remove({
    key: LocalStorage.Key.authToken,
  });
};
