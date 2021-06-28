import React from "react";
import { View } from "react-native";
import Text from "./Text";
import { scaleSize } from "utils";
export default function Badge({ width, height, title, backgroundColor, style }) {
  return (
    <View
      style={[
        {
          width: scaleSize(width),
          height: scaleSize(height),
          backgroundColor,
          borderRadius: scaleSize((width + height) / 2),
          justifyContent: "center",
          alignItems: "center",
        },
        style,
      ]}>
      <Text
        style={{
          fontWeight: "bold",
        }}
        color="#FFF"
        fontSize={10}>
        {title}
      </Text>
    </View>
  );
}
