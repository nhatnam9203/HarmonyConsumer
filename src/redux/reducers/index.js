import todoReducer from "./todoReducer";
import datalocalReducer from "./datalocalReducer";
import storeReducer from "./storeReducer";
import generalReducer from "./generalReducer";
import appointmentReducer from "./appointmentReducer";
import staffReducer from "./staffReducer";
import bookingReducer from "./bookingReducer";
import buygiftReducer from "./buygiftReducer";
import creditAndBankReducer from "./creditAndBankReducer";
import appReducer from "./appReducer";
import inboxReducer from "./inboxReducer";
import customerReducer from "./customerReducer";
import authReducer from "./authReducer";

import cardReducer from "./cardReducer";
import paymentReducer from "./paymentReducer";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import AsyncStorage from "@react-native-community/async-storage";

const rootPersistConfig = {
  key: "root",
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  blacklist: [
    "todoReducer",
    "storeReducer",
    "buygiftReducer",
    "creditAndBankReducer",
    "appReducer",
    "appointmentReducer",
    "cardReducer",
    "paymentReducer",
    "inboxReducer",
    "generalReducer",
    "bookingReducer",
  ],
};
const rootReducers = combineReducers({
  todoReducer,
  datalocalReducer,
  storeReducer,
  generalReducer,
  appointmentReducer,
  staffReducer,
  bookingReducer,
  buygiftReducer,
  creditAndBankReducer,
  appReducer,
  inboxReducer,
  customerReducer,
  cardReducer,
  paymentReducer,
  authReducer,
});
const persistedReducer = persistReducer(rootPersistConfig, rootReducers);
export default persistedReducer;
