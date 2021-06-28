import React from "react";
import { Platform } from "react-native";
import { scaleWidth } from "utils";
import { Text } from "components";

const Title = ({ title }) => {
  return (
    <Text
      style={{
        color: "#0764B0",
        fontWeight: Platform.OS === "android" ? "bold" : "500",
        fontSize: scaleWidth(4.5),
        marginLeft: scaleWidth(3),
        marginTop: scaleWidth(5),
      }}>
      {title}
    </Text>
  );
};

export default Title;
