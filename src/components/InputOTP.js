import React from "react";
import { scaleWidth } from "utils";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";

export default function InputOTP({ code, onChangeOTP }) {
  return (
    <SmoothPinCodeInput
      cellStyle={{
        borderBottomWidth: 0.8,
        borderColor: "gray",
      }}
      textStyle={{
        color: "#404040",
        fontWeight: "bold",
        fontSize: scaleWidth(4.5),
      }}
      cellSpacing={scaleWidth(3)}
      cellStyleFocused={{
        borderColor: "black",
      }}
      value={code}
      onTextChange={onChangeOTP}
      restrictToNumbers={true}
    />
  );
}
