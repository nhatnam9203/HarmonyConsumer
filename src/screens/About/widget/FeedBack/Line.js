import React from "react";
import { View } from "react-native";
import { scaleWidth } from "utils";

const Line = () => {
  return (
    <View
      style={{
        width: scaleWidth(94),
        borderBottomWidth: 1,
        borderBottomColor: "#EEEEEE",
        marginTop: scaleWidth(5),
        marginLeft: scaleWidth(3),
      }}
    />
  );
};

export default Line;
