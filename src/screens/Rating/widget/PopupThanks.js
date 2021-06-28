import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text } from "components";
import { scaleWidth, scaleHeight } from "utils";
import images from "assets";

export default function PopupThanks({}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thank for your rating!</Text>
      <Image source={images.icon_like_rating} style={styles.icon} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: scaleWidth(90),
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius: 5,
    backgroundColor: "white",
    padding: scaleWidth(3),
    paddingVertical: scaleWidth(6),
  },
  title: {
    fontSize: scaleWidth(5),
    color: "#2EBE03",
    textAlign: "center",
  },
  image: {
    width: scaleWidth(20),
    height: scaleWidth(20),
    marginRight: scaleWidth(3),
    marginBottom: scaleWidth(3),
  },
  icon: {
    marginTop: scaleHeight(5),
    width: scaleWidth(12),
    height: scaleWidth(12),
    alignSelf: "center",
  },
});
