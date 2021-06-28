import React from "react";
import { View, StyleSheet } from "react-native";
import { scaleWidth, scaleHeight } from "utils";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";

export default function Input({ code, setValueCode }) {
  return (
    <View style={{ marginTop: scaleHeight(9) }}>
      <SmoothPinCodeInput
        autoFocus={true}
        password
        mask={
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: "#14141473",
              borderRadius: scaleWidth(50),
            }}
          />
        }
        cellStyle={{
          borderWidth: 1,
          borderColor: "#dddddd",
          borderRadius: scaleWidth(50),
          width: scaleWidth(9),
          height: scaleWidth(9),
        }}
        cellSpacing={scaleWidth(3)}
        cellStyleFocused={{
          borderColor: "black",
        }}
        codeLength={6}
        value={code}
        onTextChange={setValueCode}
      />
    </View>
  );
}
