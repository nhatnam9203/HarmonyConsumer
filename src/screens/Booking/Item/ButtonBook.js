import React from "react";
import { StyleSheet, Platform } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { scaleWidth } from "utils";
import { Text } from "components";
import { View } from "react-native-animatable";

export default function Total(props) {
  const { onPress } = props;
  const text = "Book";

  return (
    <View style={styles.containerButton}>
      <TouchableRipple
        onPress={onPress}
        borderless={true}
        onPress={props.onPress}
        style={styles.button}>
        <Text style={styles.txt}>{text}</Text>
      </TouchableRipple>
    </View>
  );
}

const styles = StyleSheet.create({
  containerButton: {
    position: "absolute",
    padding: scaleWidth(5),
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 1.84,
    elevation: 2,
  },
  txt: {
    color: "white",
    fontWeight: Platform.OS === "android" ? "bold" : "600",
    fontSize: scaleWidth(4.5),
  },
  button: {
    borderRadius: 8,
    backgroundColor: "#0764B0",
    width: scaleWidth(90),
    height: scaleWidth(13, 5),
    justifyContent: "center",
    alignItems: "center",
  },
});
