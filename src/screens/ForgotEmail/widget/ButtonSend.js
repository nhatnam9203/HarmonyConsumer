import React from "react";
import { View, ActivityIndicator } from "react-native";
import styles from "../styles";
import { TouchableRipple } from "react-native-paper";
import { Text } from "components";
import { validateEmail } from "utils";

export default function ButtonSend({ isLoading = false, forgotPassword = () => {}, email }) {
  const isValid = validateEmail(email);
  return (
    <TouchableRipple
      rippleColor="white"
      disabled={isLoading || !isValid}
      onPress={forgotPassword}
      style={styles.buttonSend(isValid)}>
      <View>
        <Text style={styles.txtSend(isValid)}>Send</Text>
      </View>
    </TouchableRipple>
  );
}
