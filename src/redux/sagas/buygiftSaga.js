import { put, takeLatest, all, delay, takeEvery, select } from "redux-saga/effects";
import * as RootNavigation from "navigations/RootNavigation";
import { requestAPI } from "utils";

function* getAllTemplate(action) {
  const { typeGift } = action;
  yield put({ type: "START_LOADING_TEMPLATE", payload: typeGift });
  try {
    const response = yield requestAPI(action);

    const { data, codeNumber } = response;
    switch (+codeNumber) {
      case 200:
        yield put({
          type: "SET_TEMPLATES",
          payload: {
            typeGift,
            data,
          },
        });
        break;
      default:
        break;
    }
  } catch (e) {
  } finally {
    yield delay(500);
    yield put({ type: "STOP_LOADING_TEMPLATE", payload: typeGift });
  }
}

function* searchManually(action) {
  const userInfo = yield select((state) => state.datalocalReducer.userInfo);
  yield put({ type: "START_FETCH_API" });
  try {
    const gift_send = yield select((state) => state.buygiftReducer.gift_send);
    const responses = yield requestAPI(action);
    const { codeNumber, message, data } = responses;

    const findYourself = () => {
      return data.findIndex((user) => user.userId == userInfo.userId);
    };
    switch (+codeNumber) {
      case 200:
        if (data.length == 0) {
          action.cb(true);
        } else if (findYourself() > -1) {
          yield put({ type: "SHOW_POPUP_ERROR", content: "You can not send to yourself" });
        } else {
          let user = data[0];
          yield put({
            type: "SET_GIFT_SEND",
            payload: {
              ...gift_send,
              receiver: user,
            },
          });
          RootNavigation.navigate("FinalReview");
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

function* getContacts(action) {
  yield put({ type: "START_FETCH_API" });
  try {
    const userInfo = yield select((state) => state.datalocalReducer.userInfo);
    const responses = yield requestAPI(action);

    const { codeNumber, message, data } = responses;
    switch (+codeNumber) {
      case 200:
        yield put({
          type: "SET_CONTACTS",
          payload: data ? data.filter((item) => item.userid != userInfo.userId) : [],
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
    yield put({ type: "STOP_FETCH_API" });
  }
}

function* postTemplateCard(action) {
  yield put({ type: "START_FETCH_API" });
  try {
    const gift_send = yield select((state) => state.buygiftReducer.gift_send);
    const responses = yield requestAPI(action);
    const { codeNumber, message, data } = responses;
    switch (+codeNumber) {
      case 200:
        yield put({
          type: "GET_ALL_TEMPLATE",
          method: "GET",
          route: `giftcardtemplate/type?type=User Template`,
          token: action.token,
          typeGift: "User Template",
        });
        yield put({
          type: "SET_GIFT_SEND",
          payload: {
            ...gift_send,
            giftCardTemplateId: responses.data,
          },
        });
        RootNavigation.navigate("SelectCreditCard");

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

function* sendGiftCard(action) {
  yield put({ type: "START_FETCH_API" });
  try {
    const responses = yield requestAPI(action);
    const { codeNumber, message, data } = responses;
    switch (+codeNumber) {
      case 200:
        action.cb(action.body);

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

function* claimGiftCard(action) {
  yield put({ type: "START_FETCH_API" });
  try {
    const userInfo = yield select((state) => state.datalocalReducer.userInfo);
    const token = yield select((state) => state.datalocalReducer.token);
    const responses = yield requestAPI(action);

    const { codeNumber, message } = responses;
    switch (+codeNumber) {
      case 200:
        yield put({
          type: "GET_CUSTOMER_BY_ID",
          method: "GET",
          route: `user/${userInfo.userId}`,
          token,
        });

        yield put({
          type: "GET_CARD_BY_USER",
          method: "GET",
          route: `usercard/getbyuser/${userInfo.userId}`,
          token,
        });

        yield put({
          type: "READ_NOTIFY",
          method: "PUT",
          route: `notification/view/${action.notificationId}`,
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
    yield put({
      type: "TRANSACTION_FAILED",
    });
    console.log(error);

  } finally {
    yield put({ type: "STOP_FETCH_API" });
  }
}

function* mySaga() {
  yield all([
    takeEvery("GET_ALL_TEMPLATE", getAllTemplate),
    takeLatest("SEARCH_MANUALLY", searchManually),
    takeLatest("GET_CONTACTS", getContacts),
    takeLatest("POST_TEMPLATE_CARD", postTemplateCard),
    takeLatest("SEND_GIFT_CARD", sendGiftCard),
    takeLatest("CLAIM_GIFT_CARD", claimGiftCard),
  ]);
}
export default mySaga;
