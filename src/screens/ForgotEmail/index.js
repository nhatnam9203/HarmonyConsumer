import React, { useState, useRef } from "react";
import { View, Image, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { Text } from "components";
import images from "assets";
import styles from "./styles";
import { useDispatch } from "react-redux";
import actions from "@redux/actions";
import { validateEmail } from "utils";
import * as RootNavigation from "navigations/RootNavigation";
import ButtonSend from "./widget/ButtonSend";

export default function index(props) {
  const scrollView = useRef(null);
  const refInput = useRef(null);
  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const back = () => {
    RootNavigation.back();
  };

  const submit = () => {
    if (!validateEmail(email)) {
      dispatch(actions.generalAction.showPopupError("Email is invalid!"));
    } else {
      const body = { email, phone: "" };
      setLoading(true);
      dispatch(actions.authAction.forgotPassword(body, afterSubmit));
    }
  };

  const afterSubmit = (data) => {
    if (data) {
      const idVerify = data;

      setLoading(false);
      RootNavigation.navigate("ForgotOTP", { idVerify, email });
    } else {
      setLoading(false);
    }
  };

  const focusEmail = () => {
    refInput.current?.focus();
    scrollView.current?.scrollToEnd();
  };

  return (
    <React.Fragment>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView bounces={false} ref={scrollView} contentContainerStyle={styles.container}>
          <Text style={styles.title}>Forgot PIN code</Text>
          <Image source={images.logoHarmony} style={styles.logo} />
          <Text style={styles.txt1}>Forgot PIN code?</Text>

          <View style={{ width: "100%" }}>
            <Text style={styles.txtEmail}>Email address</Text>
            <TouchableOpacity onPress={focusEmail}>
              <TextInput
                ref={refInput}
                style={styles.textInput}
                value={email}
                autoCapitalize="none"
                onChangeText={(email) => setEmail(email)}
                placeholder="Email address"
                placeholderTextColor="#A9A9A9"
              />
            </TouchableOpacity>

            <ButtonSend email={email} isLoading={isLoading} forgotPassword={submit} />

            <TouchableOpacity onPress={back} style={{ alignSelf: "center" }}>
              <Text style={styles.back}>Try another way</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </React.Fragment>
  );
}
