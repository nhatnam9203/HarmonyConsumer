import React from "react";
import { View, StyleSheet, Image, TouchableOpacity, ImageStore } from "react-native";
import { scaleWidth, scaleHeight } from "utils";
import { Text } from "components";
import images from "assets";

export default function Direction({ myAddress, handleGetDirections }) {
  return (
    <View style={styles.container}>
      <View style={styles.direction}>
        <Text style={styles.text}>{myAddress}</Text>
        <TouchableOpacity onPress={handleGetDirections}>
          <Image source={images.icon_direction} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    paddingHorizontal: scaleWidth(3),
    paddingBottom: scaleHeight(5),
  },
  direction: {
    backgroundColor: "white",
    borderRadius: 5,
    width: scaleWidth(94),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: scaleWidth(3),
    paddingVertical: scaleWidth(1.5),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 1.84,
    zIndex: 1,
    elevation: 3,
  },
  icon: {
    width: scaleWidth(9),
    height: scaleWidth(9),
  },
  text: {
    fontSize: scaleWidth(3.8),
    width: scaleWidth(75),
    color: "#333",
  },
});
