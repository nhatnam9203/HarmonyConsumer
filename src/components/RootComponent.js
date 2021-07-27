import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  AppState,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { scaleWidth, scaleHeight, convertLatLongToAddress } from "utils";
import { useSelector, useDispatch } from "react-redux";
import Geolocation from "@react-native-community/geolocation";
import { checkNotifications } from "react-native-permissions";

import Modal from "./Modal2";
import actions from "@redux/actions";
import AntDesign from "react-native-vector-icons/AntDesign";
import CodePush from "react-native-code-push";
import firebase from "react-native-firebase";
import SplashScreen from "react-native-splash-screen";
import PopupUpdate from "./PopupUpdate";
import env from "react-native-config";

var PushNotification = require("react-native-push-notification");

const signalR = require("@microsoft/signalr");

const RootComponent: () => React$Node = (props) => {
  const dispatch = useDispatch();
  const general = useSelector((state) => state.generalReducer);
  const token = useSelector((state) => state.datalocalReducer.token);
  const userInfo = useSelector((state) => state.datalocalReducer.userInfo);
  const isInbox = useSelector((state) => state.authReducer.isInbox);
  const [isUpdate, setUpdate] = useState(false);
  const { contentError, isPopupError } = general;
  const appointment_detail_customer = useSelector(
    (state) => state.appointmentReducer.appointment_detail_customer,
  );
  const appointmentId = appointment_detail_customer?.appointmentId || "";

  const [contentUpdate, setContentUpdate] = useState("");
  const [idAppointmentDetail, setIdDetail] = useState("");
  const timezone = new Date().getTimezoneOffset();

  const [waitingLoadApp, setWaitingLoadApp] = useState(true);

  React.useEffect(() => {
    if (idAppointmentDetail && idAppointmentDetail == appointmentId) {
      dispatch(actions.appointmentAction.getDetailAppointment(token, idAppointmentDetail));
    }
    setTimeout(() => {
      setIdDetail("");
    }, 300);
  }, [idAppointmentDetail]);

  const checkFlow = () => {
    setTimeout(() => {
      console.log("Check Flow");
      setWaitingLoadApp(false);
    }, 300);
  };

  const openPopupUpdate = () => {
    setUpdate(true);
    Keyboard.dismiss();
  };

  const checkUpdate = async () => {
    const timeOutNetWork = new Promise((resolve) => {
      setTimeout(() => {
        resolve("NET_WORK_TIME_OUT");
      }, 10000);
    });

    try {
      const update = await new Promise.race([CodePush.checkForUpdate(), timeOutNetWork]);
      if (update) {
        if (update === "NET_WORK_TIME_OUT" || update?.failedInstall) {
          checkFlow();
        } else {
          // const dataUpdate = update?.description || "update new code";
          // if (dataUpdate.toString().includes("isPopup")) {
          //   SplashScreen.hide();
          //   setContentUpdate(dataUpdate.toString().replace("isPopup", ""));
          //   openPopupUpdate();
          //   Keyboard.dismiss();
          // } else {

          // }

          const options = {
            updateDialog: false,
            installMode: CodePush.InstallMode.ON_NEXT_RESTART,
            mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
          };
          console.log(update);

          await CodePush.sync(
            options,
            (status) => {
              console.log(status);

              if (
                status === CodePush.SyncStatus.UP_TO_DATE ||
                status === CodePush.SyncStatus.UPDATE_IGNORED ||
                status === CodePush.SyncStatus.UNKNOWN_ERROR
              ) {
                checkFlow();

                return;
              }

              if (status === CodePush.SyncStatus.UPDATE_INSTALLED) {
                CodePush.allowRestart();
                setTimeout(() => {
                  console.log("code push update complete ");

                  CodePush.restartApp();
                  CodePush.disallowRestart();
                }, 300);

                return;
              }
            },
            (progress) => {},
          );
        }
      } else {
        checkFlow();
      }
    } catch (err) {
      console.log(err);

      checkFlow();
    }
  };

  const updateCodePush = () => {
    dispatch({ type: "START_FETCH_API" });
    let options = {
      updateDialog: false,
      mandatoryInstallMode: CodePush.InstallMode.ON_NEXT_RESTART,
      installMode: CodePush.InstallMode.ON_NEXT_RESTART,
    };
    CodePush.sync(
      options,
      (status) => {},
      (progress) => {},
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

    PushNotification.getChannels(function (channels) {
      // Nếu đã tồn tại chennels rồi thì ko cần tạo nữa
      if (channels && channels?.length > 0) return;
      PushNotification.createChannel(
        {
          channelId: "hp_consumer", // (required)
          channelName: `Harmony Pay`, // (required)
          channelDescription: `A custom channel to categorise your custom notifications. Updated at: ${Date.now()}`, // (optional) default: undefined.
          playSound: true, // (optional) default: true
          // soundName: 'jollibeesound.wav', // (optional) See `soundName` parameter of `localNotification` function
          importance: 4, // (optional) default: 4. Int value of the Android notification importance
          vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
        },
        (created) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
      );
    });
  };

  const checkPermission = async () => {
    try {
      const enabled = await firebase.messaging().hasPermission();
      // console.log(enabled);
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
    const fcmToken = await firebase.messaging().getToken();
    // conso

    if (fcmToken) {
      console.log("fcmToken");
      console.log(fcmToken);
      runSignalR(fcmToken);
    } else {
      console.log("fcmToken", fcmToken);
    }
  };

  const requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
      await getToken();
    } catch (error) {
      console.log("permission rejected");
    }
  };

  const pushMessage = (messageJson) => {
    if (
      messageJson.type == "update_status" ||
      messageJson.type == "appointment_update_status" ||
      messageJson.type == "pay" ||
      messageJson.type == "checkin" ||
      messageJson.type == "cancel_pay" ||
      messageJson.type == "update_pay"
    ) {
      if (isInbox) {
        PushNotification.localNotification({
          title: "HarmonyPay",
          message: messageJson.message,
          largeIcon: "ic_launcher",
          smallIcon: "ic_launcher",
        });
      }
    }
  };

  useEffect(() => {
    CodePush.disallowRestart();
    checkUpdate();
  }, []);

  useEffect(() => {
    checkPermission();
    dispatch(actions.bookingAction.resetBooking());
    getCurrentLocation();
    configNotification();

    AppState.addEventListener("change", handleAppStateChange);
    return () => {
      AppState.removeEventListener("change", handleAppStateChange);
    };
  }, [token]);

  const handleAppStateChange = (nextAppState) => {
    if (nextAppState === "active") {
      // checkUpdate();
      checkNotification();
    }
  };

  const checkNotification = () => {
    checkNotifications().then(({ status }) => {
      if (status == "granted") {
        setInboxMessage(true);
      } else if (status == "blocked") {
        setInboxMessage(false);
      }
    });
  };

  const setInboxMessage = (status) => {
    dispatch(actions.datalocalAction.onChangeInbox(status));
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      async (position) => {
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

        dispatch(actions.datalocalAction.set_current_location(payload));
        dispatch(actions.datalocalAction.set_location_tab_store(payload));
      },
      (error) => {
        console.log(error.message);
      },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
    );
  };

  const runSignalR = (fcmToken) => {
    if (token && userInfo) {
      const url = `${env.SOCKET_URL}?title=User&userId=${userInfo.userId}&token=${fcmToken}`;
      // console.log(url);
      const connection = new signalR.HubConnectionBuilder()
        .configureLogging(signalR.LogLevel.Debug)
        .withUrl(url)
        .withAutomaticReconnect()
        .build();

      connection.on("Message", (message) => {
        // console.log("PushNotification dkm lcm skskadkasdaks", message);

        dispatch(actions.inboxAction.getNotifyToday(timezone, token));
        dispatch(actions.inboxAction.countUnread(token));
        let messageJson = JSON.parse(message);

        receiveMessage(messageJson);
        pushMessage(messageJson);
      });
      connection
        .start()
        .then(() => {
          console.info("connection success");
        })
        .catch(function (err) {
          console.log({ err });
        });
    }
  };

  const getMyAppointmentList = () => {
    dispatch(actions.appointmentAction.getAppointmentUpcoming(token, () => {}));
    dispatch(actions.appointmentAction.getAppointmentPast(token, 1));
  };

  const receiveMessage = (messageJson) => {
    // console.log(messageJson);
    if (messageJson && messageJson.type) {
      if (
        messageJson.type === "update_data" ||
        messageJson.type === "update_status" ||
        messageJson.type === "checkin" ||
        messageJson.type === "change_item" ||
        messageJson.type === "cancel" ||
        messageJson.type === "appointment_update_status"
      ) {
        dispatch(actions.appointmentAction.getAppointmentUpcoming(token, () => {}));
        dispatch(actions.appointmentAction.getAppointmentPast(token, 1));
        dispatch(actions.appointmentAction.getDetailAppointment(token, messageJson.id));
      }
      if (messageJson.type === "appointment_add") {
        getMyAppointmentList();
      }
      if (messageJson.type === "pay" || messageJson.type === "update_pay") {
        const { id } = messageJson;
        dispatch(actions.appointmentAction.getGroupAppointmentById(token, id));
        dispatch(actions.paymentAction.get_number_invoice(token));
        // dispatch(actions.generalAction.set_tips(tips));
      }
      if (messageJson.type === "cancel_pay") {
        const { id } = messageJson;
        // dispatch(actions.appointmentAction.getGroupAppointmentById(token, id));
        dispatch(actions.paymentAction.get_number_invoice(token));
      }
      if (messageJson.type === "order" || messageJson.type === "appointment_update_status") {
        dispatch(actions.customerAction.getPoint(1, timezone, token, () => {}));
        dispatch(actions.customerAction.getPointUsed(1, timezone, token, () => {}));
        dispatch(actions.customerAction.getRewardProfile(token));
        getMyAppointmentList();
      }
      if (messageJson.type === "userCard_update") {
        dispatch(actions.authAction.getCustomerById(userInfo.userId, token));
        dispatch(actions.cardAction.get_card_by_user(token, userInfo.userId));
        dispatch(actions.appointmentAction.getAppointmentPast(token, 1));
      }
      if (messageJson.type == "appointment_checkout") {
        dispatch(actions.appointmentAction.setCheckOut(true));
        if (messageJson.id) setIdDetail(messageJson.id);

        // if (!isEmpty(idAppointmentDetail)) {
        //   dispatch(actions.appointmentAction.getDetailAppointment(token, idAppointmentDetail));
        // }
      }
    }
  };

  function renderCustomPopupError() {
    const hidePopupError = () => {
      dispatch(actions.generalAction.hidePopupError());
    };

    return (
      <Modal animationType="none" onRequestClose={hidePopupError} isVisible={isPopupError}>
        <View style={styles.containerPopup}>
          <View style={styles.bodyPopup}>
            <AntDesign name="closecircleo" size={scaleWidth(12)} color={"#ED5241"} />
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
      <Modal animationType="none" onRequestClose={hidePopupError} isVisible={isUpdate}>
        <PopupUpdate contentUpdate={contentUpdate.toString().split(",")} update={updateCodePush} />
      </Modal>
    );
  }

  return waitingLoadApp ? (
    <View style={styles.containerAwaitingLoad}>
      <ActivityIndicator animating={true} color="#0764f9" size="small" />
    </View>
  ) : (
    <View style={styles.container}>
      {props.children}
      {renderPopupUpdate()}
      {renderCustomPopupError()}
    </View>
  );
};

const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.MANUAL, //  only check when CodePush.sync() is called in app code
};

const Root = CodePush(codePushOptions)(RootComponent);
export default Root;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  containerAwaitingLoad: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  containerPopup: {
    width: scaleWidth(80),
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: scaleWidth(5),
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: scaleWidth(3),
  },
  bodyPopup: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  alert: {
    marginTop: scaleHeight(2),
    color: "#333",
    fontSize: scaleWidth(4.5),
    fontWeight: Platform.OS === "ios" ? "600" : "bold",
  },
  contentError: {
    color: "#333",
    fontSize: scaleWidth(3.5),
    marginTop: scaleHeight(1),
    textAlign: "center",
  },
  btnError: {
    marginTop: scaleHeight(2),
    width: scaleWidth(70),
    borderRadius: 8,
    backgroundColor: "#ED5241",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: scaleHeight(1.2),
  },
  txtBtnError: {
    color: "white",
    fontSize: scaleWidth(4),
    fontWeight: Platform.OS === "ios" ? "600" : "bold",
  },
});
