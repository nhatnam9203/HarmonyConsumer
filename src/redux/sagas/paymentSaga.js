import { put, takeLatest, all, delay, select } from "redux-saga/effects";
import * as RootNavigation from "navigations/RootNavigation";
import { requestAPI } from "utils";

function* getUserRewardPointsSummary(action) {
  try {
    const response = yield requestAPI(action);
    const { data, codeNumber, message } = response;
    switch (+codeNumber) {
      case 200:
        yield put({
          type: "GET_USER_REWARD_POINT_SUMMARY_SUCCESS",
          payload: data
            ? data
            : {
                availableRewardPoint: 0,
                maximunPointAmount: "0.00",
              },
        });
        break;
      case 401:
        yield put({
          type: "UNAUTHORIZED",
        });
        break;
      default:
        yield put({ type: "SHOW_POPUP_ERROR", content: message });
        break;
    }
  } catch (error) {
  } finally {
    yield put({ type: "STOP_LOADING_REWARD_POINT" });
  }
}

function* reCalulateTotal(action) {
  const {
    cb,
    body: { rewardPoint },
  } = action;
  try {
    yield put({ type: "START_FETCH_API" });
    const response = yield requestAPI(action);
    const { data, codeNumber, message } = response;
    switch (+codeNumber) {
      case 200:
        yield put({
          type: "RE_CALULATE_TOTAL_SUCCESS",
          payload: data ? data : 0,
        });
        cb(rewardPoint);
        break;
      case 401:
        yield put({
          type: "UNAUTHORIZED",
        });
        break;
      default:
        yield put({ type: "SHOW_POPUP_ERROR", content: message });
        break;
    }
  } catch (error) {
    yield put({
      type: "RE_CALULATE_TOTAL_FAIL",
    });
  } finally {
    yield put({ type: "STOP_FETCH_API" });
  }
}

function* getNumberInvoice(action) {
  try {
    const response = yield requestAPI(action);
    const { data, codeNumber, message } = response;

    switch (+codeNumber) {
      case 200:
        yield put({
          type: "SET_INVOICE",
          payload: data ? data : {},
        });
        break;
      case 204:
        yield put({
          type: "SET_INVOICE",
          payload: data ? data : {},
        });
        break;
      case 401:
        yield put({
          type: "UNAUTHORIZED",
        });
        break;
      default:
        yield put({ type: "SHOW_POPUP_ERROR", content: message });
        break;
    }
  } catch (error) {}
}

function* payment(action) {
  try {
    yield put({ type: "START_FETCH_API" });
    const userInfo = yield select((state) => state.datalocalReducer.userInfo);
    const token = yield select((state) => state.datalocalReducer.token);
    const response = yield requestAPI(action);

    const { codeNumber, message } = response;
    switch (+codeNumber) {
      case 200:
        yield put({
          type: "GET_CARD_BY_USER",
          method: "GET",
          route: `usercard/getbyuser/${userInfo.userId}`,
          token,
        });
        yield put({
          type: "GET_CUSTOMER_BY_ID",
          method: "GET",
          route: `user/${userInfo.userId}`,
          token,
        });
        yield put({
          type: "GET_APPOINTMENT_BY_CUSTOMER",
          method: "GET",
          route: `appointment?page=1`,
          token,
          page: 1,
        });

        yield put({
          type: "GET_INVOICE",
          method: "GET",
          route: "notification/pay",
          token,
        });
        if (action.cb) {
          action.cb();
        }
        break;
      case 401:
        yield put({
          type: "UNAUTHORIZED",
        });
        break;
      default:
        yield put({ type: "SHOW_POPUP_ERROR", content: message });

        break;
    }
  } catch (error) {
  } finally {
    yield put({ type: "STOP_FETCH_API" });
  }
}

function* addTipAndPay(action) {
  try {
    yield put({ type: "START_FETCH_API" });
    const userInfo = yield select((state) => state.datalocalReducer.userInfo);
    const { bodyPayment, token, paymentId } = action;
    const response = yield requestAPI(action);
    const { codeNumber, message } = response;

    switch (+codeNumber) {
      case 200:
        yield put({
          type: "PAYMENT",
          method: "PUT",
          route: `user/checkout/${paymentId}`,
          body: bodyPayment,
          token,
          userId: userInfo.userId,
          cb: action.cb ? action.cb : null,
        });

        break;
      case 401:
        yield put({
          type: "UNAUTHORIZED",
        });
        break;
      default:
        yield put({ type: "SHOW_POPUP_ERROR", content: message });
        break;
    }
  } catch (error) {
  } finally {
    yield put({ type: "STOP_FETCH_API" });
  }
}

function* paymentTransaction(action) {
  try {
    const response = yield requestAPI(action);

    switch (parseInt(response.codeNumber)) {
      case 200:
        yield put({
          type: "SET_TRANSACTION",
          payload: response.data,
          page: action.page,
        });
        if (action.cb) {
          action.cb();
        }
        break;
      default:
        yield put({ type: "SHOW_POPUP_ERROR", content: response.message });
        break;
    }
  } catch (e) {
    if (action.cb) {
      action.cb();
    }
  } finally {
    yield put({ type: "STOP_FETCH_API" });
  }
}

function* paymentByScan(action) {
  try {
    yield put({ type: "START_FETCH_API" });
    const userInfo = yield select((state) => state.datalocalReducer.userInfo);
    const token = yield select((state) => state.datalocalReducer.token);
    const response = yield requestAPI(action);
    const { codeNumber, message, data } = response;
    switch (+codeNumber) {
      case 200:
        yield put({
          type: "GET_CARD_BY_USER",
          method: "GET",
          route: `usercard/getbyuser/${userInfo.userId}`,
          token,
        });
        yield put({
          type: "GET_CUSTOMER_BY_ID",
          method: "GET",
          route: `user/${userInfo.userId}`,
          token,
        });
        if (action.cb) {
          action.cb();
        }
        RootNavigation.navigate("TransactionPayScanSuccess", {
          qr_code: data.paymentTransactionId ? data.paymentTransactionId : "",
        });
        break;
      case 401:
        yield put({
          type: "UNAUTHORIZED",
        });
        break;
      default:
        yield put({ type: "SHOW_POPUP_ERROR", content: message });
        break;
    }
  } catch (e) {
  } finally {
    yield put({ type: "STOP_FETCH_API" });
  }
}

function* mySaga() {
  yield all([
    takeLatest("GET_USER_REWARD_POINT_SUMMARY", getUserRewardPointsSummary),
    takeLatest("RE_CALULATE_TOTAL", reCalulateTotal),
    takeLatest("GET_INVOICE", getNumberInvoice),
    takeLatest("ADD_TIP_AND_PAY", addTipAndPay),
    takeLatest("PAYMENT", payment),
    takeLatest("PAYMENT_TRANSACTION", paymentTransaction),
    takeLatest("PAYMENT_BY_SCAN", paymentByScan),
  ]);
}
export default mySaga;
