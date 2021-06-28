import React, { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, LazyImage } from "components";
import { scaleWidth } from "utils";
import Image from "react-native-fast-image";
import images from "assets";
import imgs from "resources";
import styles from "./styles";

import { useDispatch, useSelector } from "react-redux";
import actions from "@redux/actions";
import * as RootNavigation from "navigations/RootNavigation";
import { getUniqueId } from "react-native-device-info";
import TouchID from "react-native-touch-id";
import { optionalConfigObject } from "./config";
import Input from "./widget/Input";

export default function index(props) {
  const [code, setCode] = useState("");
  const [inforUser, setInfo] = useState("");
  const { isBiometric, userHash, userInfoLogin } = useSelector((state) => state.authReducer);
  const { userInfo } = useSelector((state) => state.datalocalReducer);

  const dispatch = useDispatch();
  const info = props.route.params?.info;

  useEffect(() => {
    if (info) {
      setInfo(info);
    } else {
      if (userInfo) {
        setInfo(userInfo);
      }
    }
  }, [info]);

  useEffect(() => {
    openBiometric();
  }, []);

  const openBiometric = () => {
    if (isBiometric) {
      TouchID.authenticate("Quick Login", optionalConfigObject)
        .then(() => {
          handleQuickLogin();
        })
        .catch(() => {});
    }
  };

  const handleQuickLogin = () => {
    const body = {
      userHash,
      deviceId: getUniqueId(),
    };

    dispatch(actions.authAction.quickLogin(body, () => {}));
  };

  const handleLogin = (password) => {
    const body = {
      phone: inforUser.phone,
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

  const { avatarURL } = inforUser;
  const renderAvatar = React.useMemo(() => {
    return avatarURL ? { uri: avatarURL, priority: Image.priority.high } : images.personal;
  }, [avatarURL]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in</Text>
      <Avatar renderAvatar={renderAvatar} />
      <Text fontFamily="medium" style={styles.name}>{`Welcome ${inforUser.fullName}!`}</Text>

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

      {isBiometric && inforUser.userId == userInfoLogin.userId && (
        <TouchableOpacity onPress={openBiometric}>
          <Image style={styles.imgBiometric} source={imgs.biometric} resizeMode="contain" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const Avatar = React.memo(({ renderAvatar }) => (
  <Image thumbnailSource={images.personal} source={renderAvatar} style={styles.imgAvatar} />
));
