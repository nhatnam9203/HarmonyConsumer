import { put, takeLatest, all } from "redux-saga/effects";
import { requestAPI } from "utils";
function* fetchFilms(action) {
  try {
    const response = yield requestAPI(action);
    yield put({ type: "FETCHING_FILMS_SUCCESS", payload: response.movies });
  } catch (e) {
    yield put({ type: "FETCHING_FILMS_FAIL", payload: e.message });
  }
}
function* mySaga() {
  yield all([takeLatest("FETCHING_FILM_LIST", fetchFilms)]);
}
export default mySaga;
