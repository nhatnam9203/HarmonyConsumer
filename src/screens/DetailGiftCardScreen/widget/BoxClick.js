import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { scaleSize } from "utils";

export default function BoxClick({ children, onPress, style, disabled = false }) {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress} disabled={disabled}>
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: scaleSize(60),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingLeft: scaleSize(6),
  },
});
