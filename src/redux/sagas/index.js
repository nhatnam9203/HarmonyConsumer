import todoSaga from "./todoSaga";
import storeSaga from "./storeSaga";
import authSaga from "./authSaga";
import appointmentSaga from "./appointmentSaga";
import staffSaga from "./staffSaga";
import buygiftSaga from "./buygiftSaga";
import creditAndBankSaga from "./creditAndBankSaga";
import inboxSaga from "./inboxSaga";
import customerSaga from "./customerSaga";
import cardSaga from "./cardSaga";
import paymentSaga from "./paymentSaga";
import { all } from "redux-saga/effects";

export default function* sagaRoot() {
  yield all([
    todoSaga(),
    storeSaga(),
    authSaga(),
    appointmentSaga(),
    staffSaga(),
    buygiftSaga(),
    creditAndBankSaga(),
    inboxSaga(),
    customerSaga(),
    cardSaga(),
    paymentSaga(),
  ]);
}
