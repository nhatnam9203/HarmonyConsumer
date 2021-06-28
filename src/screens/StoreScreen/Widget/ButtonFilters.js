import React from "react";
import { StyleSheet, Image } from "react-native";
import { Card, Text, Button } from "components";
import ICONS from "assets";
import { scaleSize } from "utils";

const ButtonFilters = ({ onPress, style }) => {
  return (
    <Button onPress={onPress} style={[styles.container, style]}>
      <Image source={ICONS["filter"]} style={styles.icon} />
    </Button>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: scaleSize(16),
    height: scaleSize(16),
    resizeMode: "contain",
  },

  container: {
    width: scaleSize(32),
    height: scaleSize(32),
    borderRadius: scaleSize(20),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DDDDDD",
  },
});

export default ButtonFilters;
