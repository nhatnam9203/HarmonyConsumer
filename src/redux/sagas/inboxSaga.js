import { put, takeLatest, all } from "redux-saga/effects";
import { requestAPI } from "utils";

function* getNotify(action) {
  try {
    const response = yield requestAPI(action);

    switch (parseInt(response.codeNumber)) {
      case 200:
        yield put({
          type: "SET_NOTIFY",
          notify: response.data,
        });
        break;
      default:
        yield put({ type: "SHOW_POPUP_ERROR", content: response.message });
        break;
    }
  } catch (e) {}
}

function* readNotify(action) {
  try {
    const response = yield requestAPI(action);
    // console.log("read notify");
    // console.log({ action, response });
    switch (parseInt(response.codeNumber)) {
      case 200:
        yield put({ type: "UPDATE_NOTIFY", payload: action.ids });
        yield put({
          type: "COUNT_UNREAD",
          method: "GET",
          route: `notification/countUnRead?api-version=2.0`,
          token: action.token,
        });
        break;
      default:
        yield put({ type: "SHOW_POPUP_ERROR", content: response.message });
        break;
    }
  } catch (e) {}
}

function* countUnread(action) {
  try {
    const response = yield requestAPI(action);
    switch (parseInt(response.codeNumber)) {
      case 200:
        yield put({ type: "SET_COUNT_UNREAD", count: response.data });
        break;
      default:
        yield put({ type: "SHOW_POPUP_ERROR", content: response.message });
        break;
    }
  } catch (e) {}
}

function* getNotifyToday(action) {
  try {
    const response = yield requestAPI(action);
    switch (parseInt(response.codeNumber)) {
      case 200:
        yield put({
          type: "SET_NOTIFY_TODAY",
          notify_today: response.data,
        });
        if (action.cb) {
          action.cb(true);
        }
        break;
      default:
        yield put({ type: "SHOW_POPUP_ERROR", content: response.message });
        break;
    }
  } catch (e) {}
}

function* getNotifyHistory(action) {
  try {
    const response = yield requestAPI(action);
    switch (parseInt(response.codeNumber)) {
      case 200:
        if (response.data.length > 0) {
          yield put({
            type: "SET_NOTIFY_HISTORY",
            notify_history: response.data,
            page: action.page,
          });
        }
        if (action.cb) {
          if (response.data && response.data.length > 0) {
            action.cb(true);
          } else {
            action.cb(false);
          }
        }
        break;
      default:
        yield put({ type: "SHOW_POPUP_ERROR", content: response.message });
        break;
    }
  } catch (e) {}
}

function* deleteAllInbox(action) {
  try {
    const response = yield requestAPI(action);
    switch (parseInt(response.codeNumber)) {
      case 200:
        yield put({
          type: "SET_NOTIFY_TODAY",
          notify_today: [],
        });
        yield put({
          type: "SET_NOTIFY_HISTORY",
          notify_history: [],
          page: 1,
        });
        yield put({
          type: "COUNT_UNREAD",
          method: "GET",
          route: `notification/countUnRead?api-version=2.0`,
          token: action.token,
        });
        break;
      default:
        yield put({ type: "SHOW_POPUP_ERROR", content: response.message });
        break;
    }
  } catch (e) {}
}

function* readAllInbox(action) {
  try {
    const response = yield requestAPI(action);
    switch (parseInt(response.codeNumber)) {
      case 200:
        yield put({
          type: "GET_NOTIFY_TODAY",
          method: "GET",
          route: `notification/type/today?page=0&timezone=${new Date().getTimezoneOffset()}&api-version=2.0`,
          token: action.token,
        });
        yield put({
          type: "GET_NOTIFY_HISTORY",
          method: "GET",
          route: `notification/type/history?page=1&row=10&timezone=${new Date().getTimezoneOffset()}&api-version=2.0`,
          token: action.token,
          page: 1,
        });
        yield put({
          type: "COUNT_UNREAD",
          method: "GET",
          route: `notification/countUnRead?api-version=2.0`,
          token: action.token,
        });
        break;
      default:
        yield put({ type: "SHOW_POPUP_ERROR", content: response.message });
        break;
    }
  } catch (e) {}
}

function* mySaga() {
  yield all([takeLatest("GET_NOTIFY", getNotify)]);
  yield all([takeLatest("READ_NOTIFY", readNotify)]);
  yield all([takeLatest("GET_NOTIFY_TODAY", getNotifyToday)]);
  yield all([takeLatest("GET_NOTIFY_HISTORY", getNotifyHistory)]);
  yield all([takeLatest("COUNT_UNREAD", countUnread)]);
  yield all([takeLatest("READ_ALL_INBOX", readAllInbox)]);
  yield all([takeLatest("DELETE_ALL_INBOX", deleteAllInbox)]);
}
export default mySaga;
