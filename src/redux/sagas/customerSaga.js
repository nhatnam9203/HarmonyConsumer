import { put, takeLatest, all } from "redux-saga/effects";
import { requestAPI } from "utils";

function* getRewardProfile(action) {
  try {
    const response = yield requestAPI(action);
    switch (parseInt(response.codeNumber)) {
      case 200:
        yield put({ type: "SET_REWARD_PROFILE", payload: response.data });
        break;
      default:
        yield put({ type: "SHOW_POPUP_ERROR", content: response.message });
        break;
    }
  } catch (e) {}
}

function* getMemberBenefit(action) {
  try {
    const response = yield requestAPI(action);
    switch (parseInt(response.codeNumber)) {
      case 200:
        yield put({ type: "SET_MEMBER_BENEFIT", payload: response.data });
        break;
      default:
        yield put({ type: "SHOW_POPUP_ERROR", content: response.message });
        break;
    }
  } catch (e) {}
}

function* getPoint(action) {
  try {
    const response = yield requestAPI(action);
    switch (parseInt(response.codeNumber)) {
      case 200:
        if (response.data.length > 0) {
          yield put({
            type: "SET_POINTS",
            payload: response.data,
            page: action.page,
          });
        }
        if (action.cb) {
          if (response.data && response.data.length > 0) {
            action.cb(true);
          }
        }
        action.cb(false);
        break;
      default:
        yield put({ type: "SHOW_POPUP_ERROR", content: response.message });
        break;
    }
  } catch (e) {}
}

function* getPointUsed(action) {
  try {
    const response = yield requestAPI(action);
    switch (parseInt(response.codeNumber)) {
      case 200:
        if (response.data.length > 0) {
          yield put({
            type: "SET_POINTS_USED",
            payload: response.data,
            page: action.page,
          });
        }
        if (action.cb) {
          if (response.data && response.data.length > 0) {
            action.cb(true);
          }
        }
        action.cb(false);
        break;
      default:
        yield put({ type: "SHOW_POPUP_ERROR", content: response.message });
        break;
    }
  } catch (e) {}
}

function* mySaga() {
  yield all([
    takeLatest("GET_REWARD_PROFILE", getRewardProfile),
    takeLatest("GET_MEMBER_BENEFIT", getMemberBenefit),
    takeLatest("GET_POINT", getPoint),
    takeLatest("GET_POINT_USED", getPointUsed),
  ]);
}
export default mySaga;
