import AsyncStorage from '@react-native-community/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import Reactotron from '../../../ReactotronConfig';
import rootReducers from '../reducers';
import sagaRoot from '../sagas';
import { rootReducers as toolKitReducers } from '../slices';

const middleware = [];
let sagaMiddleware = createSagaMiddleware();
if (__DEV__) {
  const sagaMonitor = Reactotron.createSagaMonitor();
  sagaMiddleware = createSagaMiddleware({ sagaMonitor });
}

// middleware.push(authMiddleware);
middleware.push(sagaMiddleware);
// if (Configs.CHROME_DEBUG_LOGGER && isDevelopmentMode) {
// }

let enhancers;
if (__DEV__) {
  enhancers = [Reactotron.createEnhancer()];
}

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  blacklist: [
    'app',
    'todoReducer',
    'storeReducer',
    'buygiftReducer',
    'creditAndBankReducer',
    'appReducer',
    'appointmentReducer',
    'cardReducer',
    'paymentReducer',
    'inboxReducer',
    'generalReducer',
    'bookingReducer',
  ],
  debug: __DEV__, //to get useful logging
};

const reducers = combineReducers(
  Object.assign({}, rootReducers, toolKitReducers),
);
const persistedReducer = persistReducer(persistConfig, reducers);

// const enhancers = [applyMiddleware(...middleware)];
// const persistConfig: any = { enhancers };
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const composeEnhancers = composeWithDevTools({
//   // Specify name here, actionsBlacklist, actionsCreators and other options if needed
// });

const initialState = {};

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middleware),
  preloadedState: initialState,
  devTools: __DEV__,
  enhancers: enhancers,
});

const persistor = persistStore(store);

const reduxStore = () => {
  return { persistor, store };
};

sagaMiddleware.run(sagaRoot);

module.exports = reduxStore;
