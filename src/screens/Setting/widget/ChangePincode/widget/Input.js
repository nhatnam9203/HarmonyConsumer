import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { scaleWidth } from "utils";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";

import styles from "../styles";

const Input = ({ title = "", value = "", onChange = () => {} }) => {
  return (
    <React.Fragment>
      <Text style={styles.txt}>{title}</Text>
      <SmoothPinCodeInput
        password
        mask={
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: "#585858",
              borderRadius: scaleWidth(50),
            }}
          />
        }
        cellStyle={{
          borderWidth: 1,
          borderColor: "#dddddd",
          borderRadius: scaleWidth(50),
          width: scaleWidth(8),
          height: scaleWidth(8),
        }}
        cellSpacing={scaleWidth(3)}
        cellStyleFocused={{
          borderColor: "black",
        }}
        codeLength={6}
        value={value}
        onTextChange={onChange}
      />
    </React.Fragment>
  );
};

export default Input;
