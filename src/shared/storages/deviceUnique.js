import { LocalStorage } from './storage';

export const saveDeviceID = deviceId => {
  LocalStorage.save({
    key: StorageKey.deviceId,
    data: deviceId,
    // expires: 1000 * 3600,
  });
};

export const getDeviceIdStorage = async () => {
  return new Promise((resolve, reject) => {
    return LocalStorage
      .load({ key: LocalStorage.Key.deviceId })
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
