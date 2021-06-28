import React from "react";
import { View, ActivityIndicator } from "react-native";
import styles from "../styles";
import { Text } from "components";
import { TouchableRipple } from "react-native-paper";

export default function ButtonSend({ isLoading, submit, phone }) {
  const isValid = phone.toString().length > 10;
  return (
    <TouchableRipple
      rippleColor="white"
      disabled={isLoading || !isValid}
      onPress={submit}
      style={styles.buttonSend(isValid)}>
      <View>
        <Text style={styles.txtSend(isValid)}>Send</Text>
      </View>
    </TouchableRipple>
  );
}
