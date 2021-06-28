import React from "react";
import { View, Image, StyleSheet } from "react-native";

import { Text, Button } from "components";
import ICONS from "assets";
import { scaleSize } from "utils";

export default function index({ value, onPress, title }) {
  return (
    <View style={styles.container_select_amount}>
      <Text fontSize={17} color="#888888">
        {title}
      </Text>

      <Button onPress={onPress} style={styles.button_select}>
        <Text fontSize={17} style={{ fontWeight: "bold" }}>
          {value}
        </Text>

        <Image source={ICONS["arrow_down_amount"]} style={styles.icon} />
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container_select_amount: {
    width: scaleSize(382),
    height: scaleSize(60),
    justifyContent: "space-between",
    paddingBottom: scaleSize(15),
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  cotent: {
    height: "100%",
    justifyContent: "space-between",
    marginLeft: scaleSize(15),
  },
  icon: {
    width: scaleSize(15),
    height: scaleSize(15),
    resizeMode: "contain",
  },
  button_select: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
