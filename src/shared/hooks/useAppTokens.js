import { LocalStorage } from '@shared/storages';

export const useAppTokens = () => {
  const AuthTokenKey = LocalStorage.Key.authToken;
  const FcmTokenKey = LocalStorage.Key.fcmToken;

  return {
    saveAuthToken: async authToken => {
      await LocalStorage.save({
        key: AuthTokenKey,
        data: authToken,
      });
    },

    getAuthToken: async () => {
      return new Promise((resolve, reject) => {
        return LocalStorage.load({ key: AuthTokenKey })
          .then(res => resolve(res))
          .catch(err => {
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
    },

    clearAuthToken: async () => {
      LocalStorage.remove({
        key: AuthTokenKey,
      });
    },

    saveFcmToken: async token => {
      await LocalStorage.save({
        key: FcmTokenKey,
        data: token,
        // expires: 1000 * 3600,
      });
    },

    getFcmToken: async () => {
      return new Promise((resolve, reject) => {
        return LocalStorage.load({ key: FcmTokenKey })
          .then(res => resolve(res))
          .catch(err => {
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
    },
  };
};
