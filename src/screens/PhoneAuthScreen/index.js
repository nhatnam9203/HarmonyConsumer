import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { scaleWidth } from "utils";
import styles from "./style";
import { Modal } from "components";

import { useDispatch } from "react-redux";
import actions from "@redux/actions";
import { Loading, InputOTP } from "components";
import * as RootNavigation from "navigations/RootNavigation";
import { PopupChangePhone, ButtonChangePhone, ButtonResendOTP, Logo } from "./widget";
import { isEmpty } from "lodash";

export default function index(props) {
  const [code, setCode] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [phoneVerify, setPhoneVerify] = useState("");
  const [verifyId, setVerifyPhoneId] = useState("");
  const [isModal, setVisbileModal] = useState(false);
  const dispatch = useDispatch();

  const { phone, verifyPhoneId, infoOldCustomer, infoLogin, userApple, isLoginApple } =
    props.route.params;

  useEffect(() => {
    setPhoneVerify(phone);
    setVerifyPhoneId(verifyPhoneId);
  }, []);

  const onChangeOTP = (text) => {
    setCode(text);
    if (text.toString().length === 4) {
      const body = { codeNumber: text };
      dispatch(actions.authAction.verifyPhoneCode(body, verifyId, afterVerify));
    }
  };

  const setupPincodeUserSocial = () => {
    RootNavigation.navigate("SetupPincode", {
      phoneSocial: phoneVerify,
      verifyPhoneId,
      infoLogin,
      userApple,
    });
  };

  const setupPincodeOldCustomer = () => {
    RootNavigation.navigate("SetupPincode", { verifyPhoneId, infoOldCustomer });
  };

  const setupProfileNormalUser = () => {
    RootNavigation.navigate("SetupProfile", { phone: phoneVerify, isLoginApple, infoLogin });
  };

  const afterVerify = (data) => {
    if (data.success) {
      if (infoLogin.email && isEmpty(infoLogin.firstName) && isEmpty(infoLogin.lastName)) {
        setupProfileNormalUser();
        return;
      }
      if (!isEmpty(infoLogin) && !infoOldCustomer) {
        setupPincodeUserSocial();
      } else if (infoOldCustomer) {
        setupPincodeOldCustomer();
      } else {
        setupProfileNormalUser();
      }
    }
  };

  const resendOTP = () => {
    const body = { phone: phoneVerify, userId: infoOldCustomer.userId };
    setLoading(true);
    dispatch(actions.authAction.verifyPhoneCustomer(body, afterResendOTP));
  };

  const afterResendOTP = (data) => {
    setLoading(false);
    const { verifyPhoneId } = data;
    if (verifyPhoneId) {
      setVerifyPhoneId(verifyPhoneId);
    }
  };

  const changePhone = () => {
    setVisbileModal(false);
    setTimeout(() => {
      RootNavigation.navigate("PhoneVerify");
    }, 200);
  };

  return (
    <React.Fragment>
      <View style={styles.container}>
        <Logo phoneVerify={phoneVerify} />
        <View style={{ marginTop: scaleWidth(8) }}>
          <InputOTP code={code} onChangeOTP={onChangeOTP} />
        </View>
        <ButtonResendOTP onPress={resendOTP} />
        <ButtonChangePhone onPress={() => setVisbileModal(true)} />
      </View>
      {isLoading && <Loading />}
      <Modal onRequestClose={() => {}} isVisible={isModal}>
        <PopupChangePhone
          onCancel={() => setVisbileModal(false)}
          navigation={props.navigation}
          phone={phoneVerify}
          onPressOK={changePhone}
        />
      </Modal>
    </React.Fragment>
  );
}
