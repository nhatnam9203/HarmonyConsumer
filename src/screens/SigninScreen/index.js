import actions from "@redux/actions";
import IMAGES from "assets";
import { Text } from "components";
import * as RootNavigation from "navigations/RootNavigation";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { getUniqueId } from "react-native-device-info";
import FastImage from "react-native-fast-image";
import TouchID from "react-native-touch-id";
import { useDispatch, useSelector } from "react-redux";
import imgs from "resources";
import { scaleWidth } from "utils";
import { optionalConfigObject } from "./config";
import styles from "./styles";
import Input from "./widget/Input";

function checkURL(str) {
  if (typeof str !== "string") return false;
  return !!str.match(/\w+\.(jpg|jpeg|gif|png|tiff|bmp)$/gi);
}

export default function index({ route }) {
  const [code, setCode] = useState("");
  const [inforUser, setInfoUser] = useState(null);
  const { isBiometric, userHash, userInfoLogin } = useSelector((state) => state.authReducer);
  const { userInfo } = useSelector((state) => state.datalocalReducer);

  const dispatch = useDispatch();
  const { info = null } = route?.params || {};

  useEffect(() => {
    if (info) {
      setInfoUser(info);
    } else {
      if (userInfo) {
        setInfoUser(userInfo);
      }
    }
  }, [info, userInfo]);

  const openBiometric = () => {
    if (isBiometric) {
      TouchID.authenticate("Quick Login", optionalConfigObject)
        .then(() => {
          handleQuickLogin();
        })
        .catch(() => {});
    }
  };

  useEffect(() => {
    openBiometric();
  }, []);

  const handleQuickLogin = () => {
    const body = {
      userHash,
      deviceId: getUniqueId(),
    };

    dispatch(actions.authAction.quickLogin(body, () => {}));
  };

  const handleLogin = (password) => {
    const body = {
      phone: inforUser?.phone,
      password,
      deviceId: getUniqueId(),
    };

    dispatch(actions.authAction.login(body, loginSuccess));
  };

  const loginSuccess = () => {
    setCode("");
  };

  const forgotPincode = () => {
    setCode("");
    RootNavigation.navigate("ForgotPincode");
  };

  const useDifferentAccount = () => {
    setCode("");
    RootNavigation.navigate("PhoneVerify");
  };

  const setValueCode = (text) => {
    setCode(text);
    if (text.toString().length === 6) {
      handleLogin(text);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in</Text>

      <FastImage
        style={styles.imgAvatar}
        source={
          checkURL(inforUser?.avatarURL)
            ? {
                uri: inforUser?.avatarURL,
                priority: FastImage.priority.normal,
                cache: FastImage.cacheControl.immutable,
              }
            : IMAGES.personal
        }
        resizeMode={FastImage.resizeMode.contain}
      />

      <Text fontFamily="medium" style={styles.name}>{`Welcome ${inforUser?.fullName}!`}</Text>

      <Text fontFamily="medium" style={styles.txtCreate}>
        Enter your PIN code
      </Text>
      <Input code={code} setValueCode={setValueCode} />

      <TouchableOpacity onPress={useDifferentAccount}>
        <Text style={styles.txtDifferent}>Use different account</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={forgotPincode}>
        <Text style={[styles.txtDifferent, { marginTop: scaleWidth(4) }]}>Forgot PIN code?</Text>
      </TouchableOpacity>

      {isBiometric && inforUser?.userId == userInfoLogin.userId && (
        <TouchableOpacity onPress={openBiometric}>
          <Image style={styles.imgBiometric} source={imgs.biometric} resizeMode="contain" />
        </TouchableOpacity>
      )}
    </View>
  );
}
