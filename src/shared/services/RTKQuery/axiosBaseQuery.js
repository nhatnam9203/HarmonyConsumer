import Configs from '@src/configs';
import { getAuthToken } from '../../storages/authToken';
import axios from 'axios';
import { Platform } from 'react-native';
import * as RootNavigation from 'navigations/RootNavigation';
import { AlertManager } from '@shared/controllers';

export const axiosHarmony = axios.create({
  baseURL: Configs.API_URL,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'User-Agent': `HarmonyConsumer/${`${Configs.VERSION}`}/${Platform.OS}`,
    // DeviceID: `${encodeURIComponent(deviceName)}_${deviceId}`,
    From: 'POS',
  },
});

// request interceptor to add token to request headers
axiosHarmony.interceptors.request.use(
  async config => {
    const token = await getAuthToken();
    if (token) {
      config.headers = Object.assign({}, config.headers, {
        authorization: `Bearer ${token}`,
      });
    }

    // console.log("retailer axios", config)
    return config;
  },
  error => Promise.reject(error),
);

axiosHarmony.interceptors.response.use(
  response => {
    const { codeStatus = 0, codeNumber = 0, message } = response?.data;
    switch (parseInt(codeNumber, 10)) {
      case 401:
        if (parseInt(codeStatus) === 5) {
          const route = RootNavigation.currentRoute();

          if (route && route?.name !== 'Auth' && route?.name !== 'SignIn') {
            // alert('Permission Denied');
            RootNavigation.navigate('Auth');
            setTimeout(() => {
              AlertManager.alert(
                'Your token login is expired , please login again!',
                'AUTH',
              );
            }, 1000);
          }
        } else {
          // NavigationServices.logout();
        }
        break;

      case 404: // not found
        break;

      case 400: // thieu field
        if (codeStatus !== 2 && codeStatus !== 5 && codeStatus !== 4) {
          // exception cho phone not exist -> checkout
          setTimeout(() => {
            alert(`${message}`);
          }, 100);
        }
        break;

      default:
        break;
    }

    return response;
  },
  async error => {
    console.log(error);
    const config = error?.config;

    if (error?.response?.status === 401 && !config._retry) {
      config._retry = true;
      // localStorage.setItem('token', await refreshAccessToken());

      return axios(config);
    }

    return Promise.reject(error);
  },
);

export const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axiosHarmony({
        url: baseUrl + url,
        method,
        data,
        params,
      });

      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
