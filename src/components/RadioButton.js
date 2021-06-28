import React from "react";
import { StyleSheet, Image } from "react-native";

import Button from "./Button";
import ICONS from "assets";
import { scaleSize } from "utils";
const RadioButton = ({ active = false, onChangeValue, activeColor = "#0764b0" }) => {
  const image_active = active ? "radio_button_active" : "radio_button_inactive";
  const tintColor = active ? { tintColor: activeColor } : {};
  return (
    <Button hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} onPress={onChangeValue}>
      <Image style={[styles.container, tintColor]} source={ICONS[image_active]} />
    </Button>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  container: {
    width: scaleSize(25),
    height: scaleSize(25),
    resizeMode: "contain",
  },
});
