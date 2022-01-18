import { LocalStorage } from './storage';

export const saveFcmToken = token => {
  LocalStorage.save({
    key: LocalStorage.Key.fcmToken,
    data: token,
    // expires: 1000 * 3600,
  });
};

export const getFcmToken = async () => {
  return new Promise((resolve, reject) => {
    return LocalStorage.load({ key: LocalStorage.Key.fcmToken })
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
