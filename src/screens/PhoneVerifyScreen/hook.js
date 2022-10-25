import React, { useState, useEffect, useRef } from 'react';
import { NativeModules, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import actions from '@redux/actions';
import * as RootNavigation from 'navigations/RootNavigation';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-community/google-signin';
import {
  LoginManager,
  GraphRequest,
  GraphRequestManager,
  AccessToken,
} from 'react-native-fbsdk';
import { getUniqueId } from 'react-native-device-info';
import { isEmpty } from 'lodash';
import { checkPhone } from 'utils';
import {
  appleAuth,
  appleAuthAndroid,
} from '@invertase/react-native-apple-authentication';
import { v4 as uuid } from 'uuid';
import jwt_decode from 'jwt-decode';

const { RNTwitterSignIn } = NativeModules;

const Constants = {
  TWITTER_COMSUMER_KEY: 'mP6wpLtC6Zn0xgCxRHsIuvUoS',
  TWITTER_CONSUMER_SECRET: 'WwI2PLwbmHuWsRADPcMwH5YJ3Bwads2ciGn2f7AYYtnfOJjvSr',
};

export default function index(props) {
  const [phoneHeader, setPhoneHeader] = useState('+1');
  const [phone, setPhone] = useState('');
  const [infoOldCustomer, setInfo] = useState('');
  const [isLoading, setLoading] = React.useState(false);
  const [isLoadingVerify, setLoadingVerify] = React.useState(false);
  const [isModal, setVisbileModal] = useState(false);

  const [infoLogin, setUserLogin] = useState({});
  const [statusLoginSocial, setStatusLoginSocial] = useState(false);
  const [isToolTip, setToolTip] = useState(false);
  const [isLoginApple, setStatusLoginApple] = useState(false);
  const [appleSub, setAppleSub] = useState('');

  const isLogout = props.route.params?.isLogout || null;

  const inputPhone = useRef(null);

  const dispatch = useDispatch();

  const txtErrorEmail =
    'We do not have access to your social account. Please try with another account or sign up for a new one.';

  useEffect(() => {
    if (isLogout) {
      setStatusLoginSocial(false);
    }
  }, [isLogout]);

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/userinfo.profile'], // what API you want to access on behalf of the user, default is email and profile
    });
  }, []);

  const findCustomer = async () => {
    let _phone = checkPhone(phone, phoneHeader);
    const phoneSubmit = phoneHeader.replace('+', '') + _phone;
    setLoading(true);
    dispatch(
      actions.authAction.getCustomerByPhone(
        phoneSubmit,
        handleFoundPhoneNumber,
        handleNotFoundPhoneNumber,
      ),
    );
  };

  const handleFoundPhoneNumber = info => {
    if (statusLoginSocial) {
      alert('This phone number is registered. Please choose another one.');
      setLoading(false);
    } else {
      setLoading(false);
      if (info.isVerified == 0) {
        setInfo(info);
        showPopup();
      } else {
        gotoSigin(info);
      }
    }
  };

  const gotoSigin = info => {
    RootNavigation.navigate('Signin', { info });
  };

  const handleNotFoundPhoneNumber = info => {
    setLoading(false);
    showPopup();
  };

  const verifyPhoneCustomer = () => {
    let _phone = checkPhone(phone, phoneHeader);
    const phoneSubmit = phoneHeader + _phone;
    const body = {
      phone: phoneSubmit,
      userId: infoOldCustomer.userId,
    };

    // setLoadingVerify(true);
    dispatch(actions.authAction.verifyPhoneCustomer(body, verifyPhoneSuccess));
  };

  const verifyPhoneSuccess = data => {
    const { verifyPhoneId } = data;
    if (verifyPhoneId) {
      setLoadingVerify(false);
      hidePopup();
      gotoConfirmOTP(verifyPhoneId);
    }
  };

  const gotoConfirmOTP = verifyPhoneId => {
    let _phone = checkPhone(phone, phoneHeader);
    RootNavigation.navigate('PhoneAuth', {
      phone: phoneHeader + _phone,
      verifyPhoneId,
      infoOldCustomer,
      infoLogin,
      isLoginApple,
      appleSub,
    });
  };

  const hidePopup = () => {
    setVisbileModal(false);
  };

  const showPopup = () => {
    setVisbileModal(true);
  };

  const removePhone = () => {
    setPhone('');
  };

  const loginFacebook = async () => {
    try {
      if (Platform.OS === 'android') {
        await LoginManager.setLoginBehavior('web_only');
      }
      let result = await LoginManager.logInWithPermissions([
        'email',
        'public_profile',
      ]);
      if (result.isCancelled) {
      } else {
        let token = await AccessToken.getCurrentAccessToken();
        const request = new GraphRequest(
          '/me',
          {
            accessToken: token.accessToken,
            parameters: {
              fields: {
                string: 'email,name,first_name,last_name,picture.type(large)',
              },
            },
          },
          (error, result) => {
            if (result) {
              let { first_name, last_name, email, id } = result;
              if (isEmpty(email)) {
                alert(txtErrorEmail);
                return;
              } else {
                loginSocial(email, first_name, last_name);
              }
            } else {
              alert('Error-Facebook', error.message);
              LoginManager.logOut();
            }
          },
        );
        new GraphRequestManager().addRequest(request).start(1000);
      }
    } catch (error) {
      alert('Error', error.message);
    }
  };

  const loginGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      await GoogleSignin.revokeAccess();
      if (userInfo !== null) {
        const { user } = userInfo;
        let { email, familyName, givenName } = user;
        if (isEmpty(email)) {
          alert(txtErrorEmail);
          return;
        } else {
          loginSocial(email, givenName, familyName);
        }
        await GoogleSignin.signOut();
      }
    } catch (error) {
      if (error.code === statusCodes.IN_PROGRESS) {
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('play services not available or outdated');
      }
    }
  };

  const loginTwitter = () => {
    RNTwitterSignIn.init(
      Constants.TWITTER_COMSUMER_KEY,
      Constants.TWITTER_CONSUMER_SECRET,
    );
    RNTwitterSignIn.logIn()
      .then(loginData => {
        let { email, userName, userID } = loginData;
        if (isEmpty(email)) {
          alert(txtErrorEmail);
          return;
        } else {
          loginSocial(email, '', userName);
        }
      })
      .catch(error => {});
  };

  const loginApple = async () => {
    Platform.OS == 'ios' ? loginApple_IOS() : loginApple_Android();
  };

  loginApple_IOS = async () => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    const { identityToken } = appleAuthRequestResponse;
    const decoded = await jwt_decode(identityToken);
    const { email, sub } = decoded;
    loginSocial(email, '', '', null);
    setStatusLoginApple(true);
    setAppleSub(sub);

    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );
    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      console.log('apple auth success');
    }
  };

  const loginApple_Android = async () => {
    appleAuthAndroid.configure({
      // The Service ID you registered with Apple
      clientId: 'com.harmonypayment.consumer.loginApple',
      redirectUri: 'https://www.harmonypayment.com',
      responseType: appleAuthAndroid.ResponseType.ALL,
      scope: appleAuthAndroid.Scope.ALL,
      // nonce: rawNonce,
      // state,
    });

    const response = await appleAuthAndroid.signIn();

    const { id_token } = response;
    const decoded = await jwt_decode(id_token);
    const { email, sub } = decoded;
    loginSocial(email, '', '', null);
    setStatusLoginApple(true);
    setAppleSub(sub);
  };

  const loginSocial = (email, firstName, lastName, appleId = null) => {
    setUserLogin({
      email,
      firstName,
      lastName,
    });

    const body = {
      email,
      phone: '',
      deviceId: getUniqueId(),
    };
    dispatch(actions.authAction.loginSocial(body, afterLoginSocial));
  };

  const afterLoginSocial = ({ codeNumber, data }) => {
    if (codeNumber == 100) {
      handleUserSocialNotRegister();
    }
    if (codeNumber == 200) {
      handleUserSocialNotVerify(data);
    }
  };

  const handleUserSocialNotRegister = () => {
    setStatusLoginSocial(true);
    setToolTip(true);
    inputPhone.current.getElement().focus();
  };

  const handleUserSocialNotVerify = data => {
    const { phone } = data;

    const headerPhone = phone.includes('+1') ? '+1' : '+84';
    const phoneNumber = phone.includes('+1')
      ? phone.toString().substring(2)
      : phone.toString().substring(3);

    setPhoneHeader(headerPhone);
    setPhone(phoneNumber);
    setInfo(data);
    showPopup();
  };

  return [
    isLoading,
    hidePopup,
    isModal,
    phoneHeader,
    phone,
    setPhone,
    setPhoneHeader,
    removePhone,
    verifyPhoneCustomer,
    isLoadingVerify,
    isToolTip,
    inputPhone,
    findCustomer,
    statusLoginSocial,
    loginFacebook,
    loginGoogle,
    loginTwitter,
    loginApple,
  ];
}
