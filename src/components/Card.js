import React from "react";
import { StyleSheet, View } from "react-native";
import { scaleSize } from "utils";

export default function Card(props) {
  const { children, width, height, borderRadius, style, paddingHorizontal = scaleSize(10) } = props;
  return (
    <View
      style={[
        styles.card,
        {
          width,
          height,
          borderRadius,
          paddingHorizontal,
        },
        style,
      ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    elevation: 2,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.13,
    shadowRadius: 2.82,
    alignItems: "center",
  },
});
