import { put, takeLatest, all, delay, select, call } from 'redux-saga/effects';
import { requestAPI, upload } from 'utils';
import * as RootNavigation from 'navigations/RootNavigation';
import { getUniqueId } from 'react-native-device-info';
import { saveAuthToken, clearAuthToken } from '@storages/authToken';

function* login(action) {
  try {
    yield put({ type: 'START_FETCH_API' });
    const response = yield requestAPI(action);

    switch (parseInt(response.codeNumber)) {
      case 200:
        yield call(saveAuthToken, response?.data?.token);

        yield put({
          type: 'LOGIN_SUCCESS',
          token: response.data.token,
          // token : "LAPVZggPoc1HnOmCy8OCRH0yf5FsiwAgyxHR0cE2RJekYLfD5sgzE0whYghNeJ3z//RWJQDmVhV6a1Km2sdjqrN+h2xwZvWPl19mGYInRz2RKlbjj8JXZVjMH2OES5z84R8YTztXKw97LGogMcsttbGB5fU3aOF/CCKXEnUiAmY=",
          userInfo: response.data,
          password: action.body.password,
        });
        yield put({
          type: 'AUTH_SUCCESS',
          userInfo: response.data,
        });

        RootNavigation.navigate('Main', { screen: 'Home' });
        action.cb();
        break;
      default:
        yield put({ type: 'SHOW_POPUP_ERROR', content: response.message });
        action.cb();
        break;
    }
    yield put({ type: 'STOP_FETCH_API' });
  } catch (e) {
    console.log(e);
    yield put({ type: 'STOP_FETCH_API' });
  }
}

function* loginSocial(action) {
  try {
    yield put({ type: 'START_FETCH_API' });
    const response = yield requestAPI(action);

    switch (parseInt(response.codeNumber)) {
      case 100:
        action.cb({ codeNumber: 100 });
        break;

      case 200:
        const { isVerified } = response.data;
        if (isVerified == 1) {
          yield put({
            type: 'LOGIN_SUCCESS',
            token: response.data.token,
            userInfo: response.data,
          });
          RootNavigation.navigate('Main', { screen: 'Home' });
        } else {
          action.cb({
            data: response.data,
            codeNumber: 200,
          });
        }
        break;
      default:
        yield put({ type: 'SHOW_POPUP_ERROR', content: response.message });
        break;
    }
    yield put({ type: 'STOP_FETCH_API' });
  } catch (e) {
    yield put({ type: 'STOP_FETCH_API' });
  }
}

function* quickLogin(action) {
  try {
    yield put({ type: 'START_FETCH_API' });
    const response = yield requestAPI(action);

    switch (parseInt(response.codeNumber)) {
      case 200:
        yield put({
          type: 'QUICK_LOGIN_SUCCESS',
          token: response.data.token,
          userInfo: response.data,
        });
        RootNavigation.navigate('Main', { screen: 'Home' });
        break;
      default:
        yield put({ type: 'SHOW_POPUP_ERROR', content: response.message });
        break;
    }
    action.cb(false);
  } catch (e) {
    action.cb(false);
  } finally {
    yield put({ type: 'STOP_FETCH_API' });
  }
}

function* logout(action) {
  try {
    const response = yield requestAPI(action);
    switch (parseInt(response.codeNumber)) {
      case 200:
        yield put({
          type: 'LOGOUT_SUCCESS',
        });
        yield call(clearAuthToken);

        break;
      default:
        yield put({ type: 'SHOW_POPUP_ERROR', content: response.message });
        break;
    }
  } catch (e) {
  } finally {
  }
}

function* phoneHasSignin(action) {
  try {
    yield put({ type: 'START_FETCH_API' });
    const response = yield requestAPI(action);
    switch (parseInt(response.codeNumber)) {
      case 200:
        action.cb(response.data);
        break;
      case 204:
        action.cb(false);
        break;
      default:
        yield put({ type: 'SHOW_POPUP_ERROR', content: response.message });
        break;
    }
  } catch (e) {
  } finally {
    yield put({ type: 'STOP_FETCH_API' });
  }
}

function* checkPassword(action) {
  try {
    const response = yield requestAPI(action);
    switch (parseInt(response.codeNumber)) {
      case 200:
        action.cb(true);
        break;
      default:
        yield put({ type: 'SHOW_POPUP_ERROR', content: response.message });
        action.cb(false);
        break;
    }
  } catch (e) {
    action.cb(false);
  }
}

function* getCustomerByPhone(action) {
  try {
    const response = yield requestAPI(action);

    switch (parseInt(response.codeNumber)) {
      case 200:
        const data = {
          ...response.data,
          phone: '+' + action.phone,
        };
        action.handleFoundPhoneNumber(data);
        break;
      case 204:
        action.handleNotFoundPhoneNumber();
        break;
      default:
        if (response.message) {
          yield put({ type: 'SHOW_POPUP_ERROR', content: response.message });
        }
        action.handleNotFoundPhoneNumber();
        break;
    }
  } catch (e) {}
}

function* verifyPhoneCustomer(action) {
  try {
    yield put({ type: 'START_FETCH_API' });
    const response = yield requestAPI(action);

    switch (parseInt(response.codeNumber)) {
      case 200:
        action.cb({ verifyPhoneId: response.data });
        break;

      default:
        action.cb({ verifyPhoneId: null });
        if (response.message) {
          yield put({ type: 'SHOW_POPUP_ERROR', content: response.message });
        }
        break;
    }
  } catch (e) {
  } finally {
    yield put({ type: 'STOP_FETCH_API' });
  }
}

function* verifyPhoneCode(action) {
  try {
    yield put({ type: 'START_FETCH_API' });
    const response = yield requestAPI(action);
    switch (parseInt(response.codeNumber)) {
      case 200:
        action.cb({ success: true });
        break;

      default:
        action.cb({ success: false });
        if (response.message)
          yield put({ type: 'SHOW_POPUP_ERROR', content: response.message });
        break;
    }
  } catch (e) {
  } finally {
    yield put({ type: 'STOP_FETCH_API' });
  }
}

function* createCustomer(action) {
  try {
    yield put({ type: 'START_FETCH_API' });
    const response = yield requestAPI(action);
    switch (parseInt(response.codeNumber)) {
      case 200:
        if (action.body.isSocial == 1) {
          const { phone, password } = action.body;
          const body = {
            phone,
            password,
            deviceId: getUniqueId(),
          };
          yield put({
            type: 'LOGIN',
            method: 'POST',
            route: 'user/login',
            body,
            cb: () => {},
          });
        } else {
          action.cb(response.data);
          yield put({ type: 'STOP_FETCH_API' });
        }
        break;

      default:
        if (response.message)
          yield put({ type: 'SHOW_POPUP_ERROR', content: response.message });
        yield put({ type: 'STOP_FETCH_API' });
        break;
    }
  } catch (e) {
    yield put({ type: 'STOP_FETCH_API' });
  }
}

function* updateCustomer(action) {
  try {
    yield put({ type: 'START_FETCH_API' });
    const response = yield requestAPI(action);
    switch (parseInt(response.codeNumber)) {
      case 200:
        action.cb();
        break;

      default:
        if (response.message)
          yield put({ type: 'SHOW_POPUP_ERROR', content: response.message });
        action.cb();
        break;
    }
  } catch (e) {
  } finally {
  }
}

function* getCustomerById(action) {
  try {
    const response = yield requestAPI(action);
    switch (parseInt(response.codeNumber)) {
      case 200:
        if (action.cb) {
          action.cb();
        }
        if (action.typeFetch == 'sender') {
          yield put({ type: 'SET_SENDER', payload: response.data });
        } else {
          yield put({
            type: 'UPDATE_CUSTOMER_SUCCESS',
            payload: response.data,
          });
        }
        break;

      default:
        if (response.message)
          yield put({ type: 'SHOW_POPUP_ERROR', content: response.message });
        if (action.cb) {
          action.cb();
        }
        break;
    }
  } catch (e) {
  } finally {
    yield put({ type: 'STOP_FETCH_API' });
  }
}

function* changePincode(action) {
  try {
    const response = yield requestAPI(action);
    switch (parseInt(response.codeNumber)) {
      case 200:
        const userInfo = yield select(state => state.datalocalReducer.userInfo);
        const { phone } = userInfo;
        const body = {
          phone,
          password: action.body.newPassword,
          deviceId: getUniqueId(),
        };
        action.cb();
        yield put({
          type: 'UPDATE_PINCODE_SUCCESS',
          method: 'POST',
          route: 'user/login',
          body,
        });
        break;

      default:
        if (response.message)
          yield put({ type: 'SHOW_POPUP_ERROR', content: response.message });
        break;
    }
  } catch (e) {}
}

function* updatePincodeSuccess(action) {
  try {
    const response = yield requestAPI(action);
    switch (parseInt(response.codeNumber)) {
      case 200:
        yield put({
          type: 'LOGIN_SUCCESS',
          token: response.data.token,
          userInfo: response.data,
          password: action.body.password,
        });
        yield put({
          type: 'AUTH_SUCCESS',
          userInfo: response.data,
        });
        break;
      default:
        yield put({ type: 'SHOW_POPUP_ERROR', content: response.message });
        break;
    }
  } catch (e) {}
}

function* uploadAvatar(action) {
  try {
    yield put({ type: 'START_FETCH_API' });
    const response = yield upload(action.route, action.body);
    switch (parseInt(response.data ? response.data.codeNumber : 0)) {
      case 200:
        const fileId = response.data.data.fileId;
        action.cb(fileId);
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

function* forgotPassword(action) {
  try {
    yield put({ type: 'START_FETCH_API' });
    const response = yield requestAPI(action);
    switch (parseInt(response.codeNumber)) {
      case 200:
        action.cb(response.data);
        break;

      default:
        action.cb(false);
        if (response.message)
          yield put({ type: 'SHOW_POPUP_ERROR', content: response.message });
        break;
    }
  } catch (e) {
  } finally {
    yield put({ type: 'STOP_FETCH_API' });
  }
}

function* setPassword(action) {
  try {
    yield put({ type: 'START_FETCH_API' });
    const response = yield requestAPI(action);

    switch (parseInt(response.codeNumber)) {
      case 200:
        if (action.infoOldCustomer) {
          const body = {
            phone: action.infoOldCustomer.phone,
            password: action.body.newPassword,
            deviceId: getUniqueId(),
          };
          yield put({
            type: 'LOGIN',
            method: 'POST',
            route: 'user/login',
            body,
            cb: () => {},
          });
        } else {
          alert(response.message);
          action.cb();
          yield put({ type: 'STOP_FETCH_API' });
        }
        break;

      default:
        if (response.message)
          yield put({ type: 'SHOW_POPUP_ERROR', content: response.message });
        yield put({ type: 'STOP_FETCH_API' });
        break;
    }
  } catch (e) {
    yield put({ type: 'STOP_FETCH_API' });
  }
}

function* checkEmail(action) {
  try {
    const response = yield requestAPI(action);
    switch (parseInt(response.codeNumber)) {
      case 200:
        action.cb(action.info);
        break;

      default:
        if (response.message)
          yield put({ type: 'SHOW_POPUP_ERROR', content: response.message });
        break;
    }
  } catch (e) {
  } finally {
  }
}

function* updateAccount(action) {
  try {
    const response = yield requestAPI(action);
    switch (parseInt(response.codeNumber)) {
      case 200:
        const userInfo = yield select(state => state.datalocalReducer.userInfo);
        const { userId } = userInfo;
        yield put({
          type: 'GET_CUSTOMER_BY_ID',
          method: 'GET',
          route: `user/${userId}`,
          token: action.token,
        });
        break;

      default:
        if (response.message)
          yield put({ type: 'SHOW_POPUP_ERROR', content: response.message });
        break;
    }
  } catch (e) {
  } finally {
  }
}

// -------------- Handle Error ------------

function* timeout(action) {
  yield put({ type: 'SHOW_POPUP_ERROR', content: 'Server not response!' });
}

function* expiredToken(action) {
  yield put({ type: 'SHOW_POPUP_ERROR', content: action.message });
  yield put({ type: 'LOGOUT' });
}

function* handleSomethingWentWrong(action) {
  yield put({ type: 'SHOW_POPUP_ERROR', content: 'Something went wrong!' });
}

function* handleTransactionFailed(action) {
  try {
    yield put({
      type: 'SHOW_POPUP_ERROR',
      content:
        'Your transaction could not be completed, please try again and send feedback to the Harmony team if you continue to see this message.',
    });
  } catch (error) {
    yield put({ type: error });
  }
}

function* mySaga() {
  yield all([
    takeLatest('LOGIN', login),
    takeLatest('LOGIN_SOCIAL', loginSocial),
    takeLatest('GET_CUSTOMER_BY_PHONE', getCustomerByPhone),
    takeLatest('VERIFY_PHONE_CUSTOMER', verifyPhoneCustomer),
    takeLatest('VERIFY_PHONE_CODE', verifyPhoneCode),
    takeLatest('CREATE_CUSTOMER', createCustomer),
    takeLatest('UPDATE_CUSTOMER', updateCustomer),
    takeLatest('CHANGE_PINCODE', changePincode),
    takeLatest('UPLOAD_AVATAR', uploadAvatar),
    takeLatest('FORGOT_PASSWORD', forgotPassword),
    takeLatest('TIME_OUT', timeout),
    takeLatest('UNAUTHORIZED', expiredToken),
    takeLatest('SOMETHING_WENT_WRONG', handleSomethingWentWrong),
    takeLatest('TRANSACTION_FAILED', handleTransactionFailed),
    takeLatest('GET_CUSTOMER_BY_ID', getCustomerById),
    takeLatest('CHECK_PASSWORD', checkPassword),
    takeLatest('QUICK_LOGIN', quickLogin),
    takeLatest('PHONE_HAS_SIGNIN', phoneHasSignin),
    takeLatest('SET_PASSWORD', setPassword),
    takeLatest('CHECK_EMAIL', checkEmail),
    takeLatest('LOGOUT', logout),
    takeLatest('UPDATE_PINCODE_SUCCESS', updatePincodeSuccess),
    takeLatest('UPDATE_ACCOUNT', updateAccount),
  ]);
}
export default mySaga;
