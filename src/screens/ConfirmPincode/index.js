import React, { useState } from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { scaleWidth } from "utils";
import images from "resources";
import styles from "./style";
import { Text } from "components";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";

export default function index(props) {
  const [code, setCode] = useState("");
  const [confirmCode, setConfirmCode] = useState("");

  const navigateToHomeScreen = () => {
    props.navigation.navigate("MainScreen");
  };

  const onChangeCode = (text) => {
    setCode(text);
  };

  const onChangeConfirmCode = (text) => {
    setConfirmCode(text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Setup PIN code</Text>
      <Image source={images.phone_auth} style={styles.imgLogo} />

      <Text style={styles.txtCreate}>{"Enter PIN code"}</Text>
      <View style={{ marginTop: scaleWidth(8) }}>
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
          value={code}
          onTextChange={onChangeCode}
        />
      </View>

      <Text style={styles.txtCreate}>{"Confirm PIN code"}</Text>
      <View style={{ marginTop: scaleWidth(8) }}>
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
          value={confirmCode}
          onTextChange={onChangeConfirmCode}
        />
      </View>

      <TouchableOpacity
        onPress={navigateToHomeScreen}
        disabled={!(code.toString().length === 6 && confirmCode.toString().length === 6)}
        style={styles.buttonContinue(code, confirmCode)}>
        <Text style={styles.txtcontinue(code, confirmCode)}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}
