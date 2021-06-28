import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { TextInputMask } from "react-native-masked-text";

import { scaleSize, getImageCard } from "utils";
import ICONS from "assets";
import Label from "./Label";
import Text from "../Text";
import Configs from "configs";
import Button from "../Button";

const {
  COLORS: { INPUT, RED },
} = Configs;
export default function InputCreditCard(props) {
  const { label, width, height, isRequire, touched, error } = props;
  const width_input = width ? width : 350;
  const height_input = height ? height : 65;
  const showError = touched && error;
  const borderBottomColor = showError ? RED : "#eeeeee";
  return (
    <View style={{ height: scaleSize(height_input + 30) }}>
      <View
        style={[
          {
            width: scaleSize(width_input),
            height: scaleSize(height_input),
            borderBottomColor,
          },
          styles.wrapper_input,
        ]}>
        <Label label={label} isRequire={isRequire} />

        <TextinputCreditCard width={width_input} height={height_input} {...props} />
      </View>
      {showError && <Text color={RED}>{error}</Text>}
    </View>
  );
}

function TextinputCreditCard(props) {
  const { placeHolder, value, onChangeText, typeCard, onClear, autoFocus } = props;

  return (
    <View style={styles.container_input_creditcard}>
      <Image source={getImageCard(typeCard)} style={styles.icon_creditcard} />

      <TextInputMask
        type={"credit-card"}
        style={styles.text_input}
        placeholderTextColor={INPUT}
        placeholder={placeHolder}
        allowFontScaling={false}
        value={value}
        onChangeText={onChangeText}
        autoFocus={autoFocus}
      />

      {value != "" && (
        <Button onPress={onClear}>
          <Image source={ICONS["baseline_cancel"]} style={styles.icon_close} />
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper_input: {
    justifyContent: "space-between",
    borderBottomWidth: 1,
  },
  text_input: {
    flex: 1,
    paddingHorizontal: scaleSize(10),
    paddingVertical: scaleSize(5),
    fontSize: scaleSize(17),
  },
  container_input_creditcard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon_creditcard: {
    width: scaleSize(26),
    height: scaleSize(26),
    // tintColor: '#7A98BB',
    // marginBottom: scaleSize(10),
    resizeMode: "contain",
  },
  icon_close: {
    width: scaleSize(25),
    height: scaleSize(25),
    marginBottom: scaleSize(5),
  },
});
