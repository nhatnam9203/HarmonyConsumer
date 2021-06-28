import rootReducers from "../reducers";
import { persistStore } from "redux-persist";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import rootSaga from "../sagas";
const sagaMiddleware = createSagaMiddleware();
const createAppStore = composeWithDevTools(applyMiddleware(sagaMiddleware))(createStore);

const store = createAppStore(rootReducers);
let persistor = persistStore(store);
sagaMiddleware.run(rootSaga);

module.exports = {
  store,
  persistor,
};
