import React from "react";
import { StyleSheet, Image } from "react-native";

import ICONS from "assets";
import { scaleSize } from "utils";
import Button from "./Button";
export default function CheckedBox({ style, checked, onValueChange }) {
  const source = checked ? ICONS["check_box"] : ICONS["check_box_empty"];
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
