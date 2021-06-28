import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { scaleWidth, scaleHeight } from "utils";
import { Text } from "components";
import Image from "react-native-fast-image";

export default function ButtonForgot({ icon, text, onPress = () => {} }) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.button}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.txt}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: scaleWidth(3),
    backgroundColor: "white",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.84,
    elevation: 2,
    marginTop: scaleHeight(1.3),
  },
  icon: {
    width: scaleWidth(7),
    height: scaleWidth(7),
  },
  txt: {
    marginLeft: scaleWidth(5),
    fontSize: scaleWidth(4.5),
    color: "#404040",
  },
});
