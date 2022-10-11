import Geolocation from '@react-native-community/geolocation';
import actions from '@redux/actions';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  AppState,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import codePush from 'react-native-code-push';
import env from 'react-native-config';
// import firebase from "react-native-firebase";
import { checkNotifications } from 'react-native-permissions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { convertLatLongToAddress, scaleHeight, scaleWidth } from 'utils';
import Modal from './Modal2';
import PopupUpdate from './PopupUpdate';
import IMAGES from 'assets';
import messaging from '@react-native-firebase/messaging';
import { app } from '@redux/slices';
import { CodePushContext } from '@shared/providers/CodePushProvider';

import PushNotification from 'react-native-push-notification';

const signalR = require('@microsoft/signalr');

const RootComponent = ({ children }) => {
  const dispatch = useDispatch();
  const general = useSelector(state => state.generalReducer);
  const token = useSelector(state => state.datalocalReducer.token);
  const userInfo = useSelector(state => state.datalocalReducer.userInfo);
  const isInbox = useSelector(state => state.authReducer.isInbox);
  const [isUpdate, setUpdate] = useState(false);
  const { contentError, isPopupError } = general;
  const appointment_detail_customer = useSelector(
    state => state.appointmentReducer.appointment_detail_customer,
  );
  const appointmentId = appointment_detail_customer?.appointmentId || '';

  const [contentUpdate, setContentUpdate] = useState('');
  const timezone = new Date().getTimezoneOffset();

  const [waitingLoadApp, setWaitingLoadApp] = useState(true);
  const [firebaseToken, setFirebaseToken] = useState(null);

  const {
    progress,
    addPushCodeCompleteCallback,
    removePushCodeCompleteCallback,
  } = React.useContext(CodePushContext);

  const checkFlow = () => {
    setWaitingLoadApp(false);
  };

  const openPopupUpdate = () => {
    setUpdate(true);
    Keyboard.dismiss();
  };

  const updateCodePush = () => {
    dispatch({ type: 'START_FETCH_API' });
    let options = {
      updateDialog: false,
      mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
      installMode: codePush.InstallMode.IMMEDIATE,
    };
    codePush.sync(
      options,
      status => {},
      progress => {},
    );
  };

  const configNotification = () => {
    PushNotification.configure({
      onRegister: function (token) {},

      onNotification: function (notification) {},

      onAction: function (notification) {},

      onRegistrationError: function (err) {},
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });

    if (Platform.OS === 'android') {
      PushNotification.getChannels(function (channels) {
        // Nếu đã tồn tại chennels rồi thì ko cần tạo nữa
        if (channels && channels?.length > 0) return;
        PushNotification.createChannel(
          {
            channelId: 'hp_consumer', // (required)
            channelName: `Harmony Pay`, // (required)
            channelDescription: `A custom channel to categorise your custom notifications. Updated at: ${Date.now()}`, // (optional) default: undefined.
            playSound: true, // (optional) default: true
            soundName: 'harmony.wav', // (optional) See `soundName` parameter of `localNotification` function
            importance: 4, // (optional) default: 4. Int value of the Android notification importance
            vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
            // soundName: 'harmony',
          },
          created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
        );
      });
    }

    // Register background handler & Quit state messages
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    messaging().onMessage(async remoteMessage => {
      console.log('Notification onMessage', remoteMessage);
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });
  };

  const checkPermission = async () => {
    try {
      const enabled = await messaging().hasPermission();
      if (enabled) {
        await getToken();
      } else {
        await requestPermission();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getToken = async () => {
    const fcmToken = await messaging().getToken();
    setFirebaseToken(fcmToken);
    // if (fcmToken) {
    //   runSignalR(fcmToken);
    // } else {
    //   console.log("fcmToken", fcmToken);
    // }
  };

  React.useEffect(() => {
    if (firebaseToken && !waitingLoadApp && token && userInfo) {
      runSignalR(firebaseToken);
    }
  }, [firebaseToken, waitingLoadApp, token, userInfo]);

  const requestPermission = async () => {
    try {
      await messaging().requestPermission();
      await getToken();
    } catch (error) {
      console.log('permission rejected');
    }
  };

  const pushMessage = messageJson => {
    if (!messageJson) return;
    if (
      messageJson.type == 'update_status' ||
      messageJson.type == 'appointment_update_status' ||
      messageJson.type == 'pay' ||
      messageJson.type == 'cancel_pay' ||
      messageJson.type == 'update_pay' ||
      messageJson.type == 'update_consumer' ||
      messageJson.type == 'cancel' ||
      messageJson.type === 'notification'
    ) {
      if (isInbox) {
        PushNotification.localNotification({
          title: 'HarmonyPay',
          message: messageJson.message,
          largeIcon: 'ic_launcher',
          smallIcon: 'ic_launcher',
          group: 'HarmonyPay',
          soundName: 'harmony.wav',
          android: {
            sound: 'harmony',
          },
        });
      }
    }
  };

  useEffect(() => {
    addPushCodeCompleteCallback('RootComponent', () => {
      setWaitingLoadApp(false);
    });

    configNotification();

    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      removePushCodeCompleteCallback('RootComponent');
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  useEffect(() => {
    checkPermission();
    dispatch(actions.bookingAction?.resetBooking());
    getCurrentLocation();
  }, [token]);

  const handleAppStateChange = nextAppState => {
    if (nextAppState === 'active') {
      // checkUpdate();
      checkNotification();

    }
  };

  const checkNotification = () => {
    checkNotifications().then(({ status }) => {
      if (status == 'granted') {
        setInboxMessage(true);
      } else if (status == 'blocked') {
        setInboxMessage(false);
      }
    });
  };

  const setInboxMessage = status => {
    dispatch(actions.datalocalAction?.onChangeInbox(status));
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      async position => {
        const {
          coords: { longitude, latitude },
        } = position;

        let address = await convertLatLongToAddress(latitude, longitude);

        const payload = {
          formatted_address: address,
          location: {
            lat: latitude,
            lng: longitude,
          },
        };

        dispatch(actions.datalocalAction?.set_current_location(payload));
        dispatch(actions.datalocalAction?.set_location_tab_store(payload));
      },
      error => {
        console.log(error.message);
      },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
    );
  };

  const runSignalR = fcmToken => {
    if (token && userInfo) {
      const url = `${env.SOCKET_URL}?title=User&userId=${userInfo.userId}&token=${fcmToken}`;
      const connection = new signalR.HubConnectionBuilder()
        .withUrl(url, {
          transport:
            signalR.HttpTransportType.LongPolling |
            signalR.HttpTransportType.WebSockets,
        })
        .configureLogging(signalR.LogLevel.Information)
        .withAutomaticReconnect([0, 2000, 10000, 30000])
        .build();

      connection.on('Message', message => {
        let messageJson = JSON.parse(message);
        console.log(messageJson);

        dispatch(actions.inboxAction?.getNotifyToday(timezone, token));
        dispatch(actions.inboxAction?.countUnread(token));

        receiveMessage(messageJson);
        pushMessage(messageJson);
      });

      connection
        .start()
        .then(() => {
          console.info('runSignalR connection success');
        })
        .catch(function (err) {
          console.log('signalR error :');
          console.log(err);
        });
    }
  };

  const getMyAppointmentList = () => {
    dispatch(
      actions.appointmentAction?.getAppointmentUpcoming(token, () => {}),
    );
    dispatch(actions.appointmentAction?.getAppointmentPast(token, 1));
  };

  const receiveMessage = messageJson => {
    if (messageJson && messageJson.type) {
      if (
        messageJson.type === 'update_data' ||
        messageJson.type === 'update_status' ||
        messageJson.type === 'checkin' ||
        messageJson.type === 'change_item' ||
        messageJson.type === 'cancel' ||
        messageJson.type === 'appointment_update_status'
      ) {
        dispatch(
          actions.appointmentAction?.getAppointmentUpcoming(token, () => {}),
        );
        dispatch(actions.appointmentAction?.getAppointmentPast(token, 1));
        dispatch(
          actions.appointmentAction?.getDetailAppointment(
            token,
            messageJson.id,
          ),
        );
      }

      if (messageJson.type === 'update_consumer') {
        // dispatch(app.updateApp(messageJson));
        dispatch(actions.authAction?.getCustomerById(userInfo.userId, token));
        dispatch(actions.cardAction?.get_card_by_user(token, userInfo.userId));
      }

      if (messageJson.type === 'appointment_add') {
        getMyAppointmentList();
      }
      if (messageJson.type === 'pay' || messageJson.type === 'update_pay') {
        const { id } = messageJson;
        dispatch(actions.appointmentAction?.getGroupAppointmentById(token, id));
        dispatch(actions.paymentAction?.get_number_invoice(token));
        dispatch(actions.customerAction?.getRewardProfile(token));

        // dispatch(actions.generalAction.set_tips(tips));
      }
      if (messageJson.type === 'cancel_pay') {
        const { id } = messageJson;
        // dispatch(actions.appointmentAction.getGroupAppointmentById(token, id));
        dispatch(actions.paymentAction.get_number_invoice(token));
      }
      if (
        messageJson.type === 'order' ||
        messageJson.type === 'appointment_update_status'
      ) {
        dispatch(
          actions.customerAction?.getPoint(1, timezone, token, () => {}),
        );
        dispatch(
          actions.customerAction?.getPointUsed(1, timezone, token, () => {}),
        );
        dispatch(actions.customerAction?.getRewardProfile(token));
        getMyAppointmentList();
      }
      if (messageJson.type === 'userCard_update') {
        dispatch(actions.authAction?.getCustomerById(userInfo.userId, token));
        dispatch(actions.cardAction?.get_card_by_user(token, userInfo.userId));
        dispatch(actions.appointmentAction?.getAppointmentPast(token, 1));
        dispatch(actions.customerAction?.getRewardProfile(token));
      }
      if (messageJson.type == 'appointment_checkout') {
        dispatch(actions.appointmentAction?.setCheckOut(true));
        if (messageJson.id) {
          if (messageJson?.id && messageJson?.id == appointmentId) {
            dispatch(
              actions.appointmentAction?.getDetailAppointment(
                token,
                messageJson?.id,
              ),
            );
          }
        }
      }
    }
  };

  function renderCustomPopupError() {
    const hidePopupError = () => {
      dispatch(actions.generalAction?.hidePopupError());
    };

    return (
      <Modal
        animationType="none"
        onRequestClose={hidePopupError}
        isVisible={isPopupError}>
        <View style={styles.containerPopup}>
          <View style={styles.bodyPopup}>
            <AntDesign
              name="closecircleo"
              size={scaleWidth(12)}
              color={'#ED5241'}
            />
            <Text style={styles.alert}>Alert</Text>
            <Text style={styles.contentError}>{contentError}</Text>
            <TouchableOpacity style={styles.btnError} onPress={hidePopupError}>
              <Text style={styles.txtBtnError}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  function renderPopupUpdate() {
    const hidePopupError = () => {
      dispatch(actions.generalAction.hidePopupError());
    };

    return (
      <Modal
        animationType="none"
        onRequestClose={hidePopupError}
        isVisible={isUpdate}>
        <PopupUpdate
          contentUpdate={contentUpdate.toString().split(',')}
          update={updateCodePush}
        />
      </Modal>
    );
  }

  return waitingLoadApp ? (
    <View style={styles.containerAwaitingLoad}>
      <View style={styles.logoContent}>
        <Image
          source={IMAGES.logoHarmony}
          resizeMode="contain"
          style={styles.logo}
        />
      </View>
      <View style={styles.splashContent}>
        <Text style={styles.txtSplash}>Copyright © 2019 Harmony Inc,.</Text>
        <View style={{ height: 40 }} />
        <ActivityIndicator animating={waitingLoadApp} color="#fff" />
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      {children}
      {renderPopupUpdate()}
      {renderCustomPopupError()}
    </View>
  );
};

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.MANUAL, //  only check when codePush.sync() is called in app code
};

// const Root = codePush(codePushOptions)(RootComponent);
export default RootComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  containerAwaitingLoad: {
    flex: 1,
    backgroundColor: '#0e0e3f',
    justifyContent: 'center',
    alignItems: 'center',
  },

  containerPopup: {
    width: scaleWidth(80),
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: scaleWidth(5),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scaleWidth(3),
  },
  bodyPopup: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  alert: {
    marginTop: scaleHeight(2),
    color: '#333',
    fontSize: scaleWidth(4.5),
    fontWeight: Platform.OS === 'ios' ? '600' : 'bold',
  },
  contentError: {
    color: '#333',
    fontSize: scaleWidth(3.5),
    marginTop: scaleHeight(1),
    textAlign: 'center',
  },
  btnError: {
    marginTop: scaleHeight(2),
    width: scaleWidth(70),
    borderRadius: 8,
    backgroundColor: '#ED5241',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: scaleHeight(1.2),
  },
  txtBtnError: {
    color: 'white',
    fontSize: scaleWidth(4),
    fontWeight: Platform.OS === 'ios' ? '600' : 'bold',
  },

  logoContent: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 3,
  },

  logo: {
    flex: 0,
    width: scaleWidth(70),
  },

  splashContent: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  txtSplash: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
