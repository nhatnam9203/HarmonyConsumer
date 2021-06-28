import React from "react";
import { StyleSheet, Image } from "react-native";

import ICONS from "assets";
import { scaleSize } from "utils";
import Button from "./Button";
export default function CheckBox({ style, checked, onValueChange }) {
  const source = checked ? ICONS["checkbox_active"] : ICONS["checkbox_unactive"];
  return (
    <Button style={style} onPress={onValueChange}>
      <Image style={styles.checkbox} source={source} />
    </Button>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    width: scaleSize(25),
    height: scaleSize(25),
  },
});
