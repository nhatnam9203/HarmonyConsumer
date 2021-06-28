import { put, takeLatest, all } from "redux-saga/effects";
import { requestAPI } from "utils";

function* staffGetByMerchant(action) {
  try {
    // yield put({ type: "START_FETCH_API" });
    const response = yield requestAPI(action);
    switch (parseInt(response.codeNumber)) {
      case 200:
        yield put({
          type: "SET_STAFF_BY_MERCHANT",
          staff_by_merchant: response.data,
        });
        break;
      default:
        yield put({ type: "SHOW_POPUP_ERROR", content: response.message });
        break;
    }
    yield put({ type: "STOP_FETCH_API" });
  } catch (e) {
    yield put({ type: "STOP_FETCH_API" });
  }
}

function* staffGetAvaiableTime(action) {
  try {
    yield put({ type: "START_FETCH_API" });
    const response = yield requestAPI(action);
    switch (parseInt(response.codeNumber)) {
      case 200:
        yield put({
          type: "SET_STAFF_AVAIABLE_TIME",
          staff_available_time: response.data,
        });
        break;
      default:
        yield put({ type: "SHOW_POPUP_ERROR", content: response.message });
        break;
    }
  } catch (e) {
  } finally {
    yield put({ type: "STOP_FETCH_API" });
  }
}

function* getFavouriteStaffMerchant(action) {
  try {
    const response = yield requestAPI(action);
    const { data, codeNumber } = response;
    switch (+codeNumber) {
      case 200:
        yield put({ type: "SET_STAFF_FAVOURITE", payload: data });
        break;
      case 204:
        yield put({ type: "SET_STAFF_FAVOURITE", payload: [] });
        break;
      default:
        if (response.message) yield put({ type: "SHOW_POPUP_ERROR", content: response.message });
        break;
    }
  } catch (e) {}
}

function* updateFavouriteStaff(action) {
  try {
    const response = yield requestAPI(action);
    const { codeNumber } = response;
    switch (+codeNumber) {
      case 200:
        yield put({
          type: "GET_FAVOURITE_STAFF_MERCHANT",
          method: "GET",
          route: `UserFavoriteStaff`,
          token: action.token,
        });
        break;
      default:
        if (response.message) yield put({ type: "SHOW_POPUP_ERROR", content: response.message });
        break;
    }
  } catch (e) {}
}

function* getStaffAppointment(action) {
  try {
    const response = yield requestAPI(action);
    const { codeNumber } = response;
    switch (+codeNumber) {
      case 200:
        yield put({
          type: "SET_STAFF_APPOINTMENT",
          payload: response.data,
        });
        break;
      default:
        if (response.message) yield put({ type: "SHOW_POPUP_ERROR", content: response.message });
        break;
    }
  } catch (e) {}
}

function* mySaga() {
  yield all([
    takeLatest("STAFF_GET_BY_MERCHANT", staffGetByMerchant),
    takeLatest("STAFF_GET_AVAIABLE_TIME", staffGetAvaiableTime),
    takeLatest("GET_FAVOURITE_STAFF_MERCHANT", getFavouriteStaffMerchant),
    takeLatest("UPDATE_FAVOURITE_STAFF", updateFavouriteStaff),
    takeLatest("GET_STAFF_APPOINTMENT", getStaffAppointment),
  ]);
}
export default mySaga;
