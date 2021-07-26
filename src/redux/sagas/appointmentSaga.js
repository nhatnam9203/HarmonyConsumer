import { put, takeLatest, all, call, select } from "redux-saga/effects";
import { requestAPI, uploadFile } from "utils";
import actions from "@redux/actions";
import moment from "moment";
import * as RootNavigation from "navigations/RootNavigation";

function* getCategoryByStore(action) {
  try {
    const response = yield requestAPI(action);
    switch (parseInt(response.codeNumber)) {
      case 200:
        yield put({ type: "GET_CATEGORY_SUCCESS", category: response.data });
        action.cb(false);
        break;

      default:
        if (response.message) yield put({ type: "SHOW_POPUP_ERROR", content: response.message });
        action.cb(false);
        break;
    }
  } catch (e) {}
}

function* getServiceByStore(action) {
  try {
    const response = yield requestAPI(action);
    switch (parseInt(response.codeNumber)) {
      case 200:
        yield put({ type: "GET_SERVICE_SUCCESS", services: response.data });
        action.cb(false);
        break;

      default:
        if (response.message) yield put({ type: "SHOW_POPUP_ERROR", content: response.message });
        action.cb(false);
        break;
    }
  } catch (e) {
  } finally {
    yield put({ type: "STOP_FETCH_API" });
  }
}

function* getProductByStore(action) {
  try {
    const response = yield requestAPI(action);
    switch (parseInt(response.codeNumber)) {
      case 200:
        yield put({ type: "GET_PRODUCT_SUCCESS", products: response.data });
        action.cb();
        break;

      default:
        if (response.message) yield put({ type: "SHOW_POPUP_ERROR", content: response.message });
        break;
    }
  } catch (e) {}
}

function* getExtraByStore(action) {
  try {
    const response = yield requestAPI(action);
    switch (parseInt(response.codeNumber)) {
      case 200:
        yield put({ type: "GET_EXTRA_SUCCESS", extras: response.data });
        action.cb();
        break;

      default:
        if (response.message) yield put({ type: "SHOW_POPUP_ERROR", content: response.message });
        break;
    }
  } catch (e) {}
}

function* addAppointment(action) {
  try {
    yield put({ type: "START_FETCH_API" });
    const response = yield requestAPI(action);
    switch (parseInt(response.codeNumber)) {
      case 200:
        yield put({
          type: "GET_APPOINTMENT_UPCOMING",
          method: "GET",
          route: `appointment/getByType/upcoming?page=0`,
          token: action.token,
        });
        yield put({
          type: "GET_APPOINTMENT_PAST",
          method: "GET",
          route: `appointment/getByType/past?page=1`,
          token: action.token,
          page: 1,
        });
        yield put({
          type: "RESET_BOOKING",
        });
        yield put({
          type: "ADD_NOTE_VALUE",
          payload: "",
        });
        action.cb(true);
        break;

      default:
        action.cb(false);
        if (response.message) yield put({ type: "SHOW_POPUP_ERROR", content: response.message });
        break;
    }
  } catch (e) {
  } finally {
    yield put({ type: "STOP_FETCH_API" });
  }
}

function* updateStatusAppointment(action) {
  try {
    const response = yield requestAPI(action);
    switch (parseInt(response.codeNumber)) {
      case 200:
        yield put({
          type: "GET_DETAIL_APPOINTMENT",
          method: "GET",
          route: `appointment/${action.appointmentId}`,
          appointmentId: action.appointmentId,
          token: action.token,
        });
        yield put({
          type: "GET_APPOINTMENT_UPCOMING",
          method: "GET",
          route: `appointment/getByType/upcoming?page=0`,
          token: action.token,
        });
        yield put({
          type: "GET_APPOINTMENT_PAST",
          method: "GET",
          route: `appointment/getByType/past?page=1`,
          token: action.token,
          page: 1,
        });
        action.cb();
        break;

      default:
        if (response.message) yield put({ type: "SHOW_POPUP_ERROR", content: response.message });
        action.cb();
        break;
    }
  } catch (e) {}
}

function* updateAppointment(action) {
  // console.log(JSON.stringify(action));
  try {
    const response = yield requestAPI(action);
    switch (parseInt(response.codeNumber)) {
      case 200:
        yield put({
          type: "GET_DETAIL_APPOINTMENT",
          method: "GET",
          route: `appointment/${action.appointmentId}`,
          appointmentId: action.appointmentId,
          token: action.token,
        });
        yield put({
          type: "GET_APPOINTMENT_UPCOMING",
          method: "GET",
          route: `appointment/getByType/upcoming?page=0`,
          token: action.token,
        });
        yield put({
          type: "GET_APPOINTMENT_PAST",
          method: "GET",
          route: `appointment/getByType/past?page=1`,
          token: action.token,
          page: 1,
        });
        yield put({
          type: "ADD_NOTE_VALUE",
          payload: "",
        });
        if (!action.isUpdateBasket) {
          yield put({ type: "SET_DETAIL_MERCHANT", merchantDetail: "" });
          yield put({ type: "RESET_BOOKING" });
        }
        action.cb();
        break;

      default:
        if (response.message) {
          yield put({ type: "SHOW_POPUP_ERROR", content: response.message });
          yield put({ type: "STOP_FETCH_API" });
        }
        action.cb();
        break;
    }
  } catch (e) {}
}

function* getAppointmentByCustomer(action) {
  try {
    const response = yield requestAPI(action);
    switch (parseInt(response.codeNumber)) {
      case 200:
        yield put({
          type: "GET_APPOINTMENT_BY_CUSTOMER_SUCCESS",
          appointment_list_customer: response.data,
        });
        if (action.cb) action.cb(false);
        break;

      default:
        if (response.message) yield put({ type: "SHOW_POPUP_ERROR", content: response.message });
        if (action.cb) action.cb(false);
        break;
    }
  } catch (e) {
    action.cb(false);
  }
}

function* getDetailAppointment(action) {
  try {
    yield put({ type: "START_FETCH_API" });
    const response = yield requestAPI(action);

    switch (parseInt(response.codeNumber)) {
      case 200:
        console.log(JSON.stringify(response.data));

        yield put({
          type: "SET_APPOINTMENT_DETAIL",
          appointment: response.data,
        });
        if (action.cb) {
          action.cb();
        }

        break;

      default:
        if (response.message) yield put({ type: "SHOW_POPUP_ERROR", content: response.message });
        break;
    }
    yield put({ type: "STOP_FETCH_API" });
  } catch (e) {
    yield put({ type: "STOP_FETCH_API" });
  }
}

function* getGroupAppointmentById(action) {
  try {
    yield put({
      type: "START_LOADING_GROUP_APPT",
    });
    const responses = yield requestAPI(action);
    const { codeNumber, data, message } = responses;
    switch (+codeNumber) {
      case 200:
        yield put({
          type: "SET_GROUP_APPOINTMENT",
          payload: data,
        });
        break;

      case 401:
        yield put({
          type: "UNAUTHORIZED",
          message,
        });
        break;

      default:
        yield put({
          type: "SHOW_POPUP_ERROR",
          content: message,
        });
        break;
    }
  } catch (error) {
  } finally {
    yield put({
      type: "STOP_LOADING_GROUP_APPT",
    });
  }
}

function* removeItem(action) {
  try {
    const response = yield requestAPI(action);
    switch (parseInt(response.codeNumber)) {
      case 200:
        yield put({
          type: "GET_DETAIL_APPOINTMENT",
          method: "GET",
          route: `appointment/${action.appointmentId}`,
          appointmentId: action.appointmentId,
          token: action.token,
        });
        yield put({
          type: "GET_APPOINTMENT_UPCOMING",
          method: "GET",
          route: `appointment/getByType/upcoming?page=0`,
          token: action.token,
        });
        yield put({
          type: "GET_APPOINTMENT_PAST",
          method: "GET",
          route: `appointment/getByType/past?page=1`,
          token: action.token,
          page: 1,
        });
        action.cb(action.item);
        break;

      default:
        if (response.message) yield put({ type: "SHOW_POPUP_ERROR", content: response.message });
        break;
    }
  } catch (e) {}
}

function* addItem(action) {
  try {
    const response = yield requestAPI(action);
    switch (parseInt(response.codeNumber)) {
      case 200:
        yield put({
          type: "GET_DETAIL_APPOINTMENT",
          method: "GET",
          route: `appointment/${action.appointmentId}`,
          appointmentId: action.appointmentId,
          token: action.token,
        });
        yield put({
          type: "GET_APPOINTMENT_UPCOMING",
          method: "GET",
          route: `appointment/getByType/upcoming?page=0`,
          token: action.token,
        });
        yield put({
          type: "GET_APPOINTMENT_PAST",
          method: "GET",
          route: `appointment/getByType/past?page=1`,
          token: action.token,
          page: 1,
        });
        action.cb(action.item);
        break;

      default:
        if (response.message) yield put({ type: "SHOW_POPUP_ERROR", content: response.message });
        break;
    }
  } catch (e) {}
}

function* addNoteAppointment(action) {
  try {
    yield put({ type: "START_FETCH_API" });
    const response = yield requestAPI(action);
    switch (parseInt(response.codeNumber)) {
      case 200:
        yield put({
          type: "GET_DETAIL_APPOINTMENT",
          method: "GET",
          route: `appointment/${action.appointmentId}`,
          appointmentId: action.appointmentId,
          token: action.token,
        });
        RootNavigation.navigate("BookAppointmentStack", {
          screen: "MyAppointmentDetail",
        });
        break;

      default:
        if (response.message) yield put({ type: "SHOW_POPUP_ERROR", content: response.message });
        yield put({ type: "STOP_FETCH_API" });
        break;
    }
  } catch (e) {
    if (action.cb) action.cb(false);
  }
}

function* getAppointmentUpcoming(action) {
  try {
    const response = yield requestAPI(action);
    switch (parseInt(response.codeNumber)) {
      case 200:
        yield put({
          type: "SET_APPOINTMENT_UPCOMING",
          payload: response.data,
        });
        break;

      default:
        if (response.message) yield put({ type: "SHOW_POPUP_ERROR", content: response.message });
        if (action.cb) action.cb(false);
        break;
    }
  } catch (e) {
    if (action.cb) action.cb(false);
  }
}

function* getAppointmentPast(action) {
  try {
    const response = yield requestAPI(action);
    switch (parseInt(response.codeNumber)) {
      case 200:
        if (response.data && response.data.length > 0) {
          yield put({
            type: "SET_APPOINTMENT_PAST",
            payload: {
              data: response.data,
              count: response.count,
              page: action.page,
            },
          });
        }
        if (action.cb) {
          if (response.data && response.data.length > 0) {
            action.cb(true);
          } else {
            action.cb(false);
          }
        }
        if (action.firstLoading) {
          action.firstLoading(false);
        }
        break;

      default:
        if (response.message) yield put({ type: "SHOW_POPUP_ERROR", content: response.message });
        break;
    }
  } catch (e) {}
}

function* mySaga() {
  yield all([
    takeLatest("GET_CATEGORY_BY_STORE", getCategoryByStore),
    takeLatest("GET_SERVICE_BY_STORE", getServiceByStore),
    takeLatest("GET_PRODUCT_BY_STORE", getProductByStore),
    takeLatest("GET_EXTRA_BY_STORE", getExtraByStore),
    takeLatest("ADD_APPOINTMENT", addAppointment),
    takeLatest("GET_APPOINTMENT_BY_CUSTOMER", getAppointmentByCustomer),
    takeLatest("UPDATE_STATUS_APPOINTMENT", updateStatusAppointment),
    takeLatest("UPDATE_APPOINTMENT", updateAppointment),
    takeLatest("GET_DETAIL_APPOINTMENT", getDetailAppointment),
    takeLatest("REMOVE_ITEM", removeItem),
    takeLatest("ADD_ITEM", addItem),
    takeLatest("GET_GROUP_APPOINTMENT_BY_ID", getGroupAppointmentById),
    takeLatest("GET_APPOINTMENT_UPCOMING", getAppointmentUpcoming),
    takeLatest("GET_APPOINTMENT_PAST", getAppointmentPast),
    takeLatest("ADD_NOTE_APPOINTMENT", addNoteAppointment),
  ]);
}
export default mySaga;
