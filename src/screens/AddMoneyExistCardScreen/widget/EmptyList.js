import React from "react";
import { View, StyleSheet } from "react-native";

import { Text, Button } from "components";

import { scaleSize } from "utils";

export default function index({ onPress, title }) {
  return (
    <View style={styles.container_select_amount}>
      <Text fontSize={15} color="#888888">
        {title}
      </Text>

      <Button onPress={onPress} style={styles.button_select}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.icon_card} />
          <Text fontSize={15} style={{ marginLeft: scaleSize(10) }}>
            Press in here to add {title}
          </Text>
        </View>
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
    borderBottomWidth: 1.5,
    borderBottomColor: "#EEEEEE",
  },
  cotent: {
    height: "100%",
    justifyContent: "space-between",
    marginLeft: scaleSize(15),
  },
  icon: {
    width: scaleSize(18),
    height: scaleSize(18),
    resizeMode: "contain",
  },
  icon_card: {
    width: scaleSize(48),
    height: scaleSize(28),
    backgroundColor: "grey",
  },
  button_select: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
