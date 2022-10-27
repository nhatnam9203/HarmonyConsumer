import { put, takeLatest, all, delay, select } from 'redux-saga/effects';
import { requestAPI, GOOGLE_API_KEY } from 'utils';
import * as RootNavigation from 'navigations/RootNavigation';
import axios from 'axios';
import { isEmpty } from 'lodash';

function* searchStoreList(action) {
  if (!action.isUpdateFavourite) {
    yield put({ type: 'START_LOADING_SEARCH' });
  } else {
    yield put({ type: 'START_FETCH_API' });
  }
  try {
    const response = yield requestAPI(action);
    const { data, codeNumber } = response;
    switch (+codeNumber) {
      case 200:
        if (action.cb) {
          action.cb(data);
        } else {
          yield put({
            type: 'SET_STORES_SEARCH',
            payload: data,
          });
        }
        break;
      default:
        break;
    }
  } catch (e) {
  } finally {
    yield put({ type: 'STOP_FETCH_API' });
    yield put({ type: 'STOP_LOADING_SEARCH' });
  }
}

function* sortStoreList(action) {
  yield put({ type: 'START_LOADING_STORE' });
  try {
    const response = yield requestAPI(action);
    const { data, codeNumber } = response;
    switch (+codeNumber) {
      case 200:
        yield put({
          type: action.typeSort == 0 ? 'SET_STORES_FAVOURITE' : 'SET_ALL_STORE',
          payload: data,
        });
        break;
      default:
        break;
    }
  } catch (e) {
  } finally {
    yield put({ type: 'STOP_LOADING_STORE' });
  }
}

function* getFavouriteStore(action) {
  try {
    const response = yield requestAPI(action);
    const { data, codeNumber } = response;
    switch (+codeNumber) {
      case 200:
        yield put({
          type: 'SET_FAVOURITE_STORE_LIST',
          payload: data ? data : [],
        });
        if (action.cb) {
          action.cb(true);
        }
        break;
      default:
        break;
    }
  } catch (e) {
  } finally {
  }
}

function* getAllStore(action) {
  yield put({ type: 'START_LOADING_STORE' });
  try {
    yield delay(1000);
    const response = yield requestAPI(action);
    const { data, codeNumber } = response;
    switch (+codeNumber) {
      case 200:
        yield put({
          type: 'SET_ALL_STORE',
          payload: data,
        });
        break;
      default:
        break;
    }
  } catch (e) {
  } finally {
    yield put({ type: 'STOP_LOADING_STORE' });
  }
}

function* getDetailMerchant(action) {
  try {
    const response = yield requestAPI(action);
    let { data, codeNumber } = response;
    switch (+codeNumber) {
      case 200:
        (data.banners = data.banners.sort(function (a, b) {
          var c = a.merchantBannerId;
          var d = b.merchantBannerId;
          return c - d;
        })),
          yield put({
            type: 'SET_DETAIL_MERCHANT',
            merchantDetail: data,
          });
        break;
      default:
        if (response.message)
          yield put({ type: 'SHOW_POPUP_ERROR', content: response.message });
        break;
    }
  } catch (e) {}
}

function* updateFavouriteMerchant(action) {
  try {
    yield put({ type: 'START_FETCH_API' });
    const response = yield requestAPI(action);

    const { codeNumber } = response;
    switch (+codeNumber) {
      case 200:
        const current_location = yield select(
          state => state.datalocalReducer.current_location,
        );
        const { filter_favourite_store } = yield select(
          state => state.storeReducer,
        );
        const { lat, lng } =
          current_location && current_location.location
            ? current_location.location
            : 0;

        const { merchantId } = action.body;
        const token = action.token;
        yield put({
          type: 'GET_DETAIL_MERCHANT',
          method: 'GET',
          route: `merchant/${merchantId}`,
          token,
        });
        yield put({
          type: 'GET_FAVOURITE_STORE',
          route: 'merchant/favorite',
          method: 'GET',
          token,
        });
        yield put({
          type: 'UPDATE_FAVOURITE_MERCHANT_SUCCESS',
          payload: action.body.merchantId,
        });
        yield put({
          type: 'SEARCH_STORE_FAVOURITE',
          method: 'GET',
          route: `merchant/search?key=&type=favorite&sort=${filter_favourite_store}&latitude=${lat}&longitude=${lng}&page=1&api-version=2.0`,
          token,
          typeSearch: 'favorite',
          sort: filter_favourite_store,
        });
        yield put({
          type: 'SEARCH_STORE',
          method: 'GET',
          route: `merchant/search?key=&type=near&sort=nearest&latitude=${lat}&longitude=${lng}&page=1&api-version=2.0`,
          token,
          typeSearch: 'near',
          sort: 'favoritest',
          screen: 'Home',
        });
        if (action.valueSearch) {
          yield put({
            type: 'SEARCH_STORE_LIST',
            method: 'GET',
            route: `merchant/search?key=${action.valueSearch}`,
            token,
            isUpdateFavourite: true,
          });
        }
        break;
      default:
        if (response.message)
          yield put({ type: 'SHOW_POPUP_ERROR', content: response.message });
        break;
    }
    yield put({ type: 'STOP_FETCH_API' });
  } catch (e) {}
}

function* getRatingMerchant(action) {
  try {
    const response = yield requestAPI(action);
    const { data, codeNumber } = response;
    switch (+codeNumber) {
      case 200:
        yield put({
          type: 'SET_RATING',
          payload: data,
          page: action.page,
          maxPage: response.pages,
        });
        if (action.cb) {
          if (response.data && response.data.length > 0) {
            action.cb(true);
          } else {
            action.cb(false);
          }
        }
        break;
      default:
        if (response.message)
          yield put({ type: 'SHOW_POPUP_ERROR', content: response.message });
        break;
    }
  } catch (e) {}
}

function* getSummaryMerchant(action) {
  try {
    const response = yield requestAPI(action);
    const { data, codeNumber } = response;
    switch (+codeNumber) {
      case 200:
        yield put({ type: 'SET_SUMMARY', payload: data });
        break;
      default:
        if (response.message)
          yield put({ type: 'SHOW_POPUP_ERROR', content: response.message });
        break;
    }
  } catch (e) {}
}

function* updateRatingMerchant(action) {
  try {
    yield put({ type: 'START_FETCH_API' });
    const response = yield requestAPI(action);
    const { codeNumber } = response;
    switch (+codeNumber) {
      case 200:
        yield put({ type: 'STOP_FETCH_API' });
        yield action.cb(true);

        yield put({ type: 'SET_STAFF_APPOINTMENT', payload: [] });
        break;
      default:
        if (response.message)
          yield put({ type: 'SHOW_POPUP_ERROR', content: response.message });
        break;
    }
    yield put({ type: 'STOP_FETCH_API' });
  } catch (e) {
    yield put({ type: 'STOP_FETCH_API' });
  }
}

function* contact(action) {
  try {
    yield put({ type: 'START_FETCH_API' });
    const response = yield requestAPI(action);
    const { codeNumber } = response;
    switch (+codeNumber) {
      case 200:
        alert(response.message);
        if (action.cb) {
          action.cb();
        }
        break;
      default:
        if (response.message)
          yield put({ type: 'SHOW_POPUP_ERROR', content: response.message });
        break;
    }
  } catch (e) {
  } finally {
    yield put({ type: 'STOP_FETCH_API' });
  }
}

function* searchStore(action) {
  try {
    yield put({ type: 'START_LOADING_STORE' });
    const response = yield requestAPI(action);
    const { data, codeNumber } = response;
    switch (+codeNumber) {
      case 200:
        if (action.screen == 'Home') {
          yield put({ type: 'SET_STORES_TAB_HOME', payload: data });
        } else if (action.screen == 'SEARCH_STORE') {
          yield put({ type: 'SET_STORE_SEARCH', payload: data });
        }
        break;
      default:
        if (response.message)
          yield put({ type: 'SHOW_POPUP_ERROR', content: response.message });
        break;
    }
  } catch (e) {
  } finally {
    yield put({ type: 'STOP_LOADING_STORE' });
  }
}

function* searchStoreFavourite(action) {
  try {
    if (action.typeSearch === 'favorite') {
      yield put({ type: 'START_LOADING_STORE' });
    }
    const response = yield requestAPI(action);
    const { data, codeNumber } = response;
    switch (+codeNumber) {
      case 200:
        if (action.cb) {
          action.cb(data);
        } else {
          if (action.typeSearch === 'near' && !action.screen) {
            yield put({ type: 'SET_STORES_NEAR', payload: data });
          }
          if (action.typeSearch === 'favorite' && !action.screen) {
            yield put({ type: 'SET_STORES_FAVOURITE', payload: data });
          }
        }
        break;
      default:
        if (response.message)
          yield put({ type: 'SHOW_POPUP_ERROR', content: response.message });
        break;
    }
  } catch (e) {
  } finally {
    yield put({ type: 'STOP_LOADING_STORE' });
  }
}

function* searchStoreNear(action) {
  try {
    if (action.typeSearch === 'favorite') {
      yield put({ type: 'START_LOADING_STORE' });
    }
    const response = yield requestAPI(action);

    const { data, codeNumber } = response;
    switch (+codeNumber) {
      case 200:
        if (action.cb) {
          action.cb(data);
        } else {
          if (
            action.typeSearch === 'near' ||
            (action.typeSearch === 'all' && !action.screen)
          ) {
            yield put({ type: 'SET_STORES_NEAR', payload: data });
          }
          if (action.typeSearch === 'favorite' && !action.screen) {
            yield put({ type: 'SET_STORES_FAVOURITE', payload: data });
          }
        }
        break;
      default:
        if (response.message)
          yield put({ type: 'SHOW_POPUP_ERROR', content: response.message });
        break;
    }
  } catch (e) {
  } finally {
    yield put({ type: 'STOP_LOADING_STORE' });
  }
}

function* getTopMerchant(action) {
  try {
    const response = yield requestAPI(action);
    const { data, codeNumber } = response;
    switch (+codeNumber) {
      case 200:
        yield put({ type: 'SET_TOP_MERCHANT', payload: data ? data : [] });
        break;
      default:
        if (response.message)
          yield put({ type: 'SHOW_POPUP_ERROR', content: response.message });
        break;
    }
  } catch (e) {
  } finally {
    yield put({ type: 'STOP_LOADING_STORE' });
  }
}

function* mySaga() {
  yield all([
    takeLatest('SEARCH_STORE_LIST', searchStoreList),
    takeLatest('SORT_STORE_LIST', sortStoreList),
    takeLatest('GET_FAVOURITE_STORE', getFavouriteStore),
    takeLatest('GET_ALL_STORE', getAllStore),
    takeLatest('GET_DETAIL_MERCHANT', getDetailMerchant),
    takeLatest('UPDATE_FAVOURITE_MERCHANT', updateFavouriteMerchant),
    takeLatest('GET_RATING_MERCHANT', getRatingMerchant),
    takeLatest('GET_SUMMARY_MERCHANT', getSummaryMerchant),
    takeLatest('UPDATE_RATING_MERCHANT', updateRatingMerchant),
    takeLatest('CONTACT', contact),
    takeLatest('SEARCH_STORE', searchStore),
    takeLatest('SEARCH_STORE_FAVOURITE', searchStoreFavourite),
    takeLatest('SEARCH_STORE_NEAR', searchStoreNear),
    takeLatest('GET_TOP_MERCHANT', getTopMerchant),
  ]);
}
export default mySaga;
