import React from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { scaleWidth, scaleHeight } from "utils";
import images from "assets";
import styles from "./styles";
import { openInbox } from "react-native-email-link";
import * as RootNavigation from "navigations/RootNavigation";

export default function index(props) {
  const openEmail = () => {
    openInbox();
  };

  const signIn = () => {
    RootNavigation.navigate("Signin");
  };

  return (
    <React.Fragment>
      <View style={styles.container}>
        <Text style={styles.title}>Forgot PIN code</Text>
        <Image source={images.logoHarmony} style={styles.logo} />
        <Text style={styles.txt1}>Email sent !</Text>
        <Text style={styles.txt2}>We've sent you an email with a link</Text>
        <Text style={[styles.txt2, { marginTop: 0 }]}>to reset your password</Text>

        <View style={{ width: "100%", marginTop: scaleHeight(5) }}>
          <TouchableOpacity onPress={openEmail} style={styles.buttonSend}>
            <Text style={styles.txtSend}>Check Email</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={signIn} style={{ alignSelf: "center" }}>
            <Text style={styles.back}>Back to Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </React.Fragment>
  );
}
