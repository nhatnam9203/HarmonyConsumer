import React from "react";
import { StyleSheet, Platform, TouchableOpacity } from "react-native";
import { scaleWidth, scaleHeight, slop } from "utils";
import images from "assets";
import Image from "react-native-fast-image";

export default function Total(props) {
  return (
    <TouchableOpacity onPress={props.onPress} hitSlop={slop} style={styles.button}>
      <Image source={images.icon_back} style={styles.icon} tintColor="white" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  txt: {
    color: "white",
    fontWeight: Platform.OS === "android" ? "bold" : "600",
    fontSize: scaleWidth(4),
  },
  button: {
    position: "absolute",
    left: scaleWidth(3),
    top: scaleHeight(5),
    padding: scaleWidth(2),
    paddingHorizontal: scaleWidth(2.2),
    borderRadius: 300,
    backgroundColor: "#787777",
  },
  icon: {
    width: scaleWidth(7),
    height: scaleWidth(7),
    tintColor: "white",
  },
});
