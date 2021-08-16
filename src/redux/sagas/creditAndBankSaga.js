import { put, takeLatest, all, delay, select } from "redux-saga/effects";
import * as RootNavigation from "navigations/RootNavigation";
import { requestAPI } from "utils";
import { Alert } from "react-native";

function* getCredit(action) {
  yield put({ type: "START_LOADING_CARD" });
  try {
    const response = yield requestAPI(action);
    const { data, codeNumber } = response;
    switch (+codeNumber) {
      case 200:
        yield put({
          type: "SET_CREDITS",
          payload: data,
        });
        break;
      default:
        break;
    }
  } catch (e) {
    console.log(e);
  } finally {
    yield put({ type: "STOP_LOADING_CARD" });
  }
}

function* getBank(action) {
  yield put({ type: "START_LOADING_CARD" });
  try {
    const response = yield requestAPI(action);
    const { data, codeNumber } = response;
    switch (+codeNumber) {
      case 200:
        yield put({
          type: "SET_BANKS",
          payload: data,
        });
        break;
      default:
        break;
    }
  } catch (e) {
    console.log(e);
  } finally {
    yield put({ type: "STOP_LOADING_CARD" });
  }
}

function* addCreditCard(action) {
  const { token, cb } = action;
  try {
    const firstCard = yield select((state) => state.creditAndBankReducer.first_card);
    yield put({ type: "START_FETCH_API" });
    const responses = yield requestAPI(action);
    // console.log({ action, responses });
    const { codeNumber, message } = responses;

    switch (+codeNumber) {
      case 200:
        if (firstCard) RootNavigation.navigate("ValidationCredit");
        else RootNavigation.back();

        yield put({
          type: "GET_CREDIT_CARD_FOR_USER",
          method: "GET",
          route: "card",
          token,
        });
        if (action.cb) {
          cb(true);
        }
        break;
      default:
        yield put({ type: "SHOW_POPUP_ERROR", content: message });
        break;
    }
  } catch (error) {
    yield put({
      type: "TRANSACTION_FAILED",
    });
  } finally {
    yield put({ type: "STOP_FETCH_API" });
  }
}

function* addBankCard(action) {
  const { token, resetForm } = action;
  try {
    yield put({ type: "START_FETCH_API" });
    const responses = yield requestAPI(action);
    const { codeNumber, message } = responses;
    switch (+codeNumber) {
      case 200:
        resetForm();
        RootNavigation.back();
        yield put({
          type: "GET_BANK_CARD_FOR_USER",
          method: "GET",
          route: "bank",
          token,
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

function* removeCreditCard(action) {
  const { token, cb } = action;
  try {
    yield put({ type: "START_FETCH_API" });
    const responses = yield requestAPI(action);
    const { codeNumber, message } = responses;
    switch (+codeNumber) {
      case 200:
        cb();
        yield put({
          type: "GET_CREDIT_CARD_FOR_USER",
          method: "GET",
          route: "card",
          token,
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

function* removeBankCard(action) {
  const { token, cb } = action;
  try {
    yield put({ type: "START_FETCH_API" });
    const responses = yield requestAPI(action);
    const { codeNumber, message } = responses;
    switch (+codeNumber) {
      case 200:
        cb();
        yield put({
          type: "GET_BANK_CARD_FOR_USER",
          method: "GET",
          route: "bank",
          token,
        });
        break;
      default:
        yield put({ type: "SHOW_POPUP_ERROR", content: message });
        break;
    }
  } catch (error) {
    yield put({
      type: "TRANSACTION_FAILED",
    });
  } finally {
    yield put({ type: "STOP_FETCH_API" });
  }
}

function* mySaga() {
  yield all([
    takeLatest("GET_CREDIT_CARD_FOR_USER", getCredit),
    takeLatest("GET_BANK_CARD_FOR_USER", getBank),
    takeLatest("ADD_CREDIT_CARD", addCreditCard),
    takeLatest("ADD_BANK_CARD", addBankCard),
    takeLatest("REMOVE_CREDIT_CARD", removeCreditCard),
    takeLatest("REMOVE_BANK_CARD", removeBankCard),
  ]);
}
export default mySaga;
