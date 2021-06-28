import React, { useState } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import images from "assets";
import styles from "./style";
import { useDispatch } from "react-redux";
import actions from "@redux/actions";
import { getUniqueId } from "react-native-device-info";
import * as RootNavigation from "navigations/RootNavigation";
import Input from "./widget/Input";

export default function index(props) {
  const [code, setCode] = useState("");
  const [confirmCode, setConfirmCode] = useState("");
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const {
    info = "",
    verifyPhoneId,
    infoOldCustomer,
    infoLogin,
    phoneSocial,
    userApple,
  } = props.route.params;
  const isHasSignin = info ? info.isHasSignin : false;
  const avatar = info ? info.avatar : infoOldCustomer ? infoOldCustomer.avatarURL : null;

  const createCustomer = () => {
    if (confirmCode === code) {
      if (phoneSocial) {
        createUserSocial();
        return;
      }
      if (verifyPhoneId) {
        updatePincodeOldCustomer();
        return;
      }
      const deviceId = getUniqueId();
      let body = {
        ...info,
        password: code,
        deviceId,
        isSocial: 1,
        fileId: 0,
      };
      if (userApple) {
        body.socialToken = userApple;
        body.socialType = "apple";
      }
      delete body.isHasSignin;
      delete body["avatar"];

      setLoading(true);
      dispatch(actions.authAction.createCustomer(body, createCustomerSucces));
    }
  };

  const createUserSocial = () => {
    let body = {
      ...infoLogin,
      isSocial: 1,
      fileId: 0,
      password: code,
      phone: phoneSocial,
      birthDate: "1900-01-01",
      deviceId: getUniqueId(),
    };
    if (userApple) {
      body.socialToken = userApple;
      body.socialType = "apple";
    }
    dispatch(actions.authAction.createCustomer(body));
  };

  const updatePincodeOldCustomer = () => {
    setLoading(true);
    const body = {
      newPassword: code,
    };
    dispatch(
      actions.authAction.setPassword(verifyPhoneId, body, infoOldCustomer, createCustomerSucces),
    );
  };

  const createCustomerSucces = (info) => {
    setLoading(false);
    RootNavigation.navigate("Signin", { info });
  };

  const useDifferentAccount = () => {
    RootNavigation.navigate("PhoneVerify");
  };

  const renderImg = avatar ? { uri: avatar } : isHasSignin ? images.avatar : images.phone;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set up PIN code</Text>
      <Image source={renderImg} style={[styles.imgLogo, { borderRadius: avatar ? 800 : 0 }]} />
      {/* <Text style={styles.name}>{`Welcome ${info.firstName} ${info.lastName} !`}</Text> */}

      <Text style={styles.txtCreate}>
        {isHasSignin ? "Create your PIN code" : "Enter PIN code"}
      </Text>
      <Input value={code} onChange={setCode} />

      <Text style={styles.txtCreate}>
        {isHasSignin ? "Confirm your PIN code" : "Confirm PIN code"}
      </Text>
      <Input value={confirmCode} onChange={setConfirmCode} />

      {confirmCode !== code && code !== "" && confirmCode !== "" && (
        <Text style={styles.txtDifferent}>PIN code doesn't match</Text>
      )}

      <TouchableOpacity onPress={useDifferentAccount}>
        <Text style={[styles.txtDifferent, { color: "#27AAE1" }]}>Use different account</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={createCustomer}
        disabled={!(code.toString().length === 6 && confirmCode.toString().length === 6)}
        style={styles.buttonContinue(code, confirmCode)}>
        <Text style={styles.txtcontinue(code, confirmCode)}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
}
