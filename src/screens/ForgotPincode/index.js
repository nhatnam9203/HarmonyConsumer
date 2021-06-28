import React, { useRef } from "react";
import { View, Image, TouchableOpacity, ScrollView } from "react-native";
import { Text } from "components";
import images from "assets";
import styles from "./styles";
import { scaleHeight } from "utils";
import { ButtonForgot } from "./widget";
import * as RootNavigation from "navigations/RootNavigation";

export default function index(props) {
  const scrollView = useRef(null);

  const navigateToSignIn = () => {
    props.navigation.navigate("Signin");
  };

  const navigate = (screen) => {
    RootNavigation.navigate(screen);
  };

  return (
    <React.Fragment>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView bounces={false} ref={scrollView} contentContainerStyle={styles.container}>
          <Text style={styles.title}>Forgot PIN code</Text>
          <Image source={images.logoHarmony} style={styles.logo} />
          <Text style={styles.txt1}>Forgot PIN code?</Text>
          <Text style={styles.txt2}>We will send you a code to reset password.</Text>
          <Text style={[styles.txt2, { marginTop: 0 }]}>
            Please select the way to receive this code.
          </Text>
          <View style={{ width: "100%", marginTop: scaleHeight(3) }}>
            <ButtonForgot
              onPress={() => navigate("ForgotEmail")}
              icon={images.icon_email_forgot}
              text={"Send via email"}
            />
            <ButtonForgot
              onPress={() => navigate("ForgotPhone")}
              icon={images.icon_phone_forgot}
              text={"Send via SMS"}
            />
            <TouchableOpacity onPress={navigateToSignIn} style={{ alignSelf: "center" }}>
              <Text style={styles.back}>Back to Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </React.Fragment>
  );
}
