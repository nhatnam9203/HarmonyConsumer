import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { scaleSize } from "utils";
import Label from "./Label";
import Text from "../Text";
import Configs from "configs";
const {
  COLORS: { INPUT, RED },
} = Configs;
export default function Input(props) {
  const {
    label,
    width,
    height,
    placeHolder,
    isRequire,
    touched,
    error,
    type,
    options,
    children,
    styleTextInput = {},
    styleLabel = {},
    contentContainerInput = {
      justifyContent: "space-between",
      borderBottomWidth: 1,
    },
    ...anyProps
  } = props;
  const width_input = width ? width : 350;
  const height_input = height ? height : 61;
  const showError = touched && error;
  const borderBottomColor = showError ? RED : "#eeeeee";
  return (
    <View style={{ height: scaleSize(height_input + 30), width: scaleSize(width_input) }}>
      <View
        style={[
          {
            width: scaleSize(width_input),
            height: scaleSize(height_input),
            borderBottomColor,
          },
          contentContainerInput,
        ]}>
        <Label label={label} isRequire={isRequire} style={styleLabel} />
        {type ? (
          <TextInputMask
            type={type}
            style={[styles.text_input, styleTextInput]}
            placeholderTextColor={INPUT}
            placeholder={placeHolder}
            allowFontScaling={false}
            options={options}
            {...anyProps}
          />
        ) : (
          <TextInput
            style={[styles.text_input, styleTextInput]}
            placeholderTextColor={INPUT}
            placeholder={placeHolder}
            allowFontScaling={false}
            {...anyProps}
          />
        )}
      </View>
      {showError && <Text color={RED}>{error}</Text>}
    </View>
  );
}
const styles = StyleSheet.create({
  text_input: {
    flex: 1,
    paddingHorizontal: scaleSize(5),
    paddingVertical: scaleSize(5),
    fontSize: scaleSize(17),
  },
});
