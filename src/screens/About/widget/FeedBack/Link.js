import React from "react";
import { TouchableOpacity, Platform } from "react-native";
import { Text } from "components";
import AntDesign from "react-native-vector-icons/AntDesign";
import { scaleWidth } from "utils";

const Link = ({ title, action = () => {} }) => {
  return (
    <TouchableOpacity
      style={{
        width: scaleWidth(94),
        marginHorizontal: scaleWidth(3),
        marginTop: scaleWidth(6),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      onPress={action}>
      <Text
        fontFamily="regular"
        style={{
          fontSize: scaleWidth(4),
          color: "#585858",
        }}>
        {title}
      </Text>
      <AntDesign name="right" color="#3C3C3C" size={scaleWidth(4)} />
    </TouchableOpacity>
  );
};

export default Link;
