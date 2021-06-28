import React, { useState, useEffect } from "react";
import { View, Image } from "react-native";
import { scaleWidth } from "utils";
import images from "assets";
import styles from "./style";
import { useDispatch } from "react-redux";
import actions from "@redux/actions";
import { Text, InputOTP } from "components";
import * as RootNavigation from "navigations/RootNavigation";
import ButtonVerify from "./widget/ButtonVerify";

export default function index(props) {
  const [code, setCode] = useState("");
  const [verifyId, setVerifyPhoneId] = useState("");
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { phone, email, idVerify } = props.route.params;

  useEffect(() => {
    setVerifyPhoneId(idVerify);
  }, []);

  const onChangeOTP = (text) => {
    setCode(text);
  };

  const resendOTP = () => {
    if (email) {
      const body = { email, phone: "" };
      dispatch(actions.authAction.forgotPassword(body, () => {}));
    } else if (phone) {
      const body = { email: "", phone };
      dispatch(actions.authAction.forgotPassword(body, () => {}));
    }
  };

  const verify = () => {
    setLoading(true);
    const body = { codeNumber: code };
    dispatch(actions.authAction.verifyPhoneCode(body, verifyId, handleAfterVerifyPhoneCode));
  };

  const handleAfterVerifyPhoneCode = (data) => {
    if (data.success) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      RootNavigation.navigate("ForgotNewPincode", { verifyId });
    }
  };

  return (
    <React.Fragment>
      <View style={styles.container}>
        <Image source={images.logoHarmony} style={styles.logo} />
        <Text style={styles.txt1}>OTP authentication</Text>
        <Text style={styles.txt2}>Enter the code received to recover the PIN code</Text>

        <View style={{ marginTop: scaleWidth(8) }}>
          <InputOTP code={code} onChangeOTP={onChangeOTP} />
        </View>

        <Text style={{ marginTop: scaleWidth(15) }}>
          <Text style={[styles.txtSend, { color: "#404040" }]}>Didn't receive a code?</Text>
          <Text onPress={resendOTP} style={styles.txtSend}>
            {" "}
            Resend
          </Text>
        </Text>

        <ButtonVerify code={code} isLoading={isLoading} onPress={verify} />
      </View>
    </React.Fragment>
  );
}
