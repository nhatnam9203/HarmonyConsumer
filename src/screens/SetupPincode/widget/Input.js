import React from "react";
import { View } from "react-native";
import { scaleWidth } from "utils";
import styles from "../style";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";

export default function index({ value, onChange }) {
  return (
    <View style={{ marginTop: scaleWidth(8) }}>
      <SmoothPinCodeInput
        password
        mask={<View style={styles.maskedPincode} />}
        cellStyle={styles.cellPincode}
        cellSpacing={scaleWidth(3)}
        cellStyleFocused={{
          borderColor: "black",
        }}
        codeLength={6}
        value={value}
        onTextChange={onChange}
      />
    </View>
  );
}
