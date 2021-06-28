import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { Text } from "components";
import images from "assets";
import styles from "./styles";

const ButtonSelect = ({ onChangeType, type, title, typeTemp }) => {
  return (
    <TouchableOpacity
      onPress={() => onChangeType(typeTemp)}
      style={[
        styles.wrap,
        {
          backgroundColor: type === typeTemp ? "#f6f6f6" : "transparent",
        },
      ]}>
      <Image source={images.icon_phone_green} style={styles.icon} />
      <Text style={styles.txtIcon}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonSelect;
