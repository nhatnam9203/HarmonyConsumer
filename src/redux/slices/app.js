import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const reducerName = 'app';
const initialState = {
  appLoading: false,
  deviceId: null,
  deviceName: null,
  merchantID: null,
  rememberMID: false,
  appCallUpdate: null
};

let appSlice = createSlice({
  name: reducerName,
  initialState: initialState,
  reducers: {
    showLoading: {
      reducer: (state, action) => {
        state.appLoading = true;
      },
    },
    hideLoading: {
      reducer: (state, action) => {
        state.appLoading = false;
      },
    },
    setDeviceInfo: {
      reducer: (state, action) => {
        return Object.assign({}, state, action.payload);
      },
    },

    saveMerchantID: {
      reducer: (state, action) => {
        state.merchantID = action.payload;
      },
    },
    rememberMID: {
      reducer: (state, action) => {
        state.rememberMID = action.payload;
      },
    },
    setError: {
      reducer: (state, action) => {
        state.error = action.payload;
      },
    },
    updateApp: {
      reducer: (state, action) => {
        state.appCallUpdate = action.payload;
      },
    }
  },
});

let { actions, reducer } = appSlice;

let appReducer = persistReducer(
  {
    key: 'app',
    storage: AsyncStorage,
    whitelist: ['merchantID', 'rememberMID'],
  },
  reducer,
);

module.exports = {
  reducer: appReducer,
  actions: { ...actions },
};
