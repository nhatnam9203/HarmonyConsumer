import { put, takeLatest, all, select, delay, take } from "redux-saga/effects";
import * as RootNavigation from "navigations/RootNavigation";
import { requestAPI } from "utils";

function* getCardByUser(action) {
  yield put({ type: "START_LOADING_CARD" });
  try {
    const response = yield requestAPI(action);
    const { data, codeNumber, message } = response;
    switch (+codeNumber) {
      case 200:
        yield put({
          type: "SET_CARDS",
          payload: data,
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
    yield put({
      type: "TRANSACTION_FAILED",
    });
    console.log(error);

  } finally {
    if (action.cb) {
      action.cb(false);
    }
    yield put({ type: "STOP_LOADING_CARD" });
  }
}

function* getCardById(action) {
  yield put({ type: "START_LOADING_CARD_DETAIL" });
  try {
    const response = yield requestAPI(action);
    const { data, codeNumber, message } = response;
    switch (+codeNumber) {
      case 200:
        yield put({
          type: "SET_CARD_DETAIL",
          payload: data,
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
    switch (error) {
      case "TIME_OUT":
        yield put({
          type: "TIME_OUT",
        });
        break;
      case "NET_WORK_REQUEST_FAIL":
        yield put({
          type: "NET_WORK_REQUEST_FAIL",
        });
        break;
      default:
        yield put({
          type: "TRANSACTION_FAILED",
        });
        console.log(error);

        break;
    }
  } finally {
    yield put({ type: "STOP_LOADING_CARD_DETAIL" });
  }
}

function* addCard(action) {
  yield put({ type: "START_FETCH_API" });
  try {
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

        RootNavigation.back();
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
      type: "TRANSACTION_FAILED",
    });
    console.log(error);

  } finally {
    yield put({ type: "STOP_FETCH_API" });
  }
}

function* addMoneyToCard(action) {
  try {
    yield put({ type: "START_FETCH_API" });
    const userInfo = yield select((state) => state.datalocalReducer.userInfo);
    const token = yield select((state) => state.datalocalReducer.token);
    const response = yield requestAPI(action);

    const { codeNumber, message } = response;
    switch (+codeNumber) {
      case 200:
        if (action.cb) {
          action.cb();
        } else {
          yield put({
            type: "GET_CARD_BY_ID",
            method: "GET",
            route: `usercard/${action.userCardId}`,
            token,
          });

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
            cb,
            typeFetch,
          });
          yield put({ type: "STOP_FETCH_API" });
        }
        RootNavigation.back();
        break;

      default:
        yield put({ type: "SHOW_POPUP_ERROR", content: message });
        yield put({ type: "STOP_FETCH_API" });
        break;
    }
  } catch (error) {
    yield put({
      type: "TRANSACTION_FAILED",
    });
    console.log(error);

    yield put({ type: "STOP_FETCH_API" });
  }
}

function* autoReload(action) {
  try {
    yield put({ type: "START_FETCH_API" });
    const userInfo = yield select((state) => state.datalocalReducer.userInfo);
    const token = yield select((state) => state.datalocalReducer.token);
    const response = yield requestAPI(action);

    const { codeNumber, message } = response;
    switch (+codeNumber) {
      case 200:
        yield put({
          type: "GET_CARD_BY_ID",
          method: "GET",
          route: `usercard/${action.userCardId}`,
          token,
        });

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
        break;

      default:
        yield put({ type: "SHOW_POPUP_ERROR", content: message });
        break;
    }
  } catch (error) {
    yield put({
      type: "TRANSACTION_FAILED",
    });
    console.log(error);

  } finally {
    yield put({ type: "STOP_FETCH_API" });
  }
}

function* updatePrimaryCard(action) {
  yield put({ type: "START_FETCH_API" });
  try {
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
        //RootNavigation.back();
        break;
      default:
        yield put({ type: "SHOW_POPUP_ERROR", content: message });
        break;
    }
  } catch (error) {
    yield put({
      type: "TRANSACTION_FAILED",
    });
    console.log(error);

  } finally {
    yield put({ type: "STOP_FETCH_API" });
  }
}

function* transferCard(action) {
  yield put({ type: "START_FETCH_API" });
  try {
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
        RootNavigation.back();
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
      type: "TRANSACTION_FAILED",
    });
    console.log(error);

  } finally {
    action.cb();
    yield put({ type: "STOP_FETCH_API" });
  }
}

function* removeCard(action) {
  yield put({ type: "START_FETCH_API" });
  try {
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
        yield delay(250);
        RootNavigation.back();
        break;
      default:
        yield put({ type: "SHOW_POPUP_ERROR", content: message });
        break;
    }
  } catch (error) {
    yield put({
      type: "TRANSACTION_FAILED",
    });
    console.log(error);

  } finally {
    // action.cb();
    yield put({ type: "STOP_FETCH_API" });
  }
}

function* sendLinkInvite(action) {
  try {
    const responses = yield requestAPI(action);
    const { codeNumber, message } = responses;
    switch (+codeNumber) {
      case 200:
        action.cb(true);
        break;
      case 401:
        yield put({
          type: "UNAUTHORIZED",
        });
        break;
      default:
        action.cb(false);
        yield put({ type: "SHOW_POPUP_ERROR", content: message });
        break;
    }
  } catch (error) {
    yield put({
      type: "TRANSACTION_FAILED",
    });
    console.log(error);

  } finally {
    yield put({ type: "STOP_FETCH_API" });
  }
}

function* addMoneyComplete() {
  console.log("complete");
}

function* mySaga() {
  yield all([
    takeLatest("GET_CARD_BY_USER", getCardByUser),
    takeLatest("ADD_CARD", addCard),
    takeLatest("ADD_MONEY_TO_CARD", addMoneyToCard),
    takeLatest("AUTO_RELOAD", autoReload),
    takeLatest("UPDATE_PRIMARY_CARD", updatePrimaryCard),
    takeLatest("COMPLETE_ADD_MONEY", addMoneyComplete),
    takeLatest("TRANSFER_CARD", transferCard),
    takeLatest("REMOVE_CARD", removeCard),
    takeLatest("GET_CARD_BY_ID", getCardById),
    takeLatest("SEND_LINK_INVITE", sendLinkInvite),
  ]);
}
export default mySaga;
