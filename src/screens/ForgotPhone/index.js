import React, { useState, useRef } from "react";
import { View, Image, TouchableOpacity, ScrollView } from "react-native";
import { Text } from "components";
import images from "assets";
import styles from "./styles";
import { useDispatch } from "react-redux";
import actions from "@redux/actions";
import * as RootNavigation from "navigations/RootNavigation";
import { ButtonSend } from "./widget";
import { PhoneInput } from "components";
import { scaleHeight } from "utils";

export default function index(props) {
  const scrollView = useRef(null);

  const dispatch = useDispatch();
  const [phoneHeader, setPhoneHeader] = useState("+1");
  const [phone, setPhone] = useState("");
  const [isLoading, setLoading] = React.useState(false);

  const removePhone = () => {
    setPhone("");
  };

  const back = () => {
    RootNavigation.back();
  };

  const submit = () => {
    const body = { email: "", phone: phoneHeader + phone };
    setLoading(true);
    dispatch(actions.authAction.forgotPassword(body, afterSubmit));
  };

  const afterSubmit = (data) => {
    if (data) {
      const idVerify = data;

      setLoading(false);
      RootNavigation.navigate("ForgotOTP", {
        idVerify,
        phone: phoneHeader + phone,
      });
    } else {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView bounces={false} ref={scrollView} contentContainerStyle={styles.container}>
          <Text style={styles.title}>Forgot PIN code</Text>
          <Image source={images.logoHarmony} style={styles.logo} />
          <Text style={styles.txt1}>Forgot PIN code?</Text>

          <View style={{ width: "100%", marginTop: scaleHeight(2) }}>
            <PhoneInput
              phoneHeader={phoneHeader}
              phone={phone}
              setPhone={setPhone}
              setPhoneHeader={setPhoneHeader}
              removePhone={removePhone}
            />

            <ButtonSend phone={phone} isLoading={isLoading} submit={submit} />

            <TouchableOpacity onPress={back} style={{ alignSelf: "center" }}>
              <Text style={styles.back}>Try another way</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </React.Fragment>
  );
}
