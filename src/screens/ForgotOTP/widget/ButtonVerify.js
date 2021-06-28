import React from "react";
import { View, ActivityIndicator } from "react-native";
import styles from "../style";
import { TouchableRipple } from "react-native-paper";
import { Text } from "components";

export default function ButtonVerify({ isLoading = false, onPress = () => {}, code }) {
  return (
    <TouchableRipple
      rippleColor="white"
      onPress={onPress}
      disabled={code.toString().length !== 4}
      style={styles.buttonSend(code)}>
      <View>
        <Text style={styles.txtSend2(code)}>Verify</Text>
      </View>
    </TouchableRipple>
  );
}
