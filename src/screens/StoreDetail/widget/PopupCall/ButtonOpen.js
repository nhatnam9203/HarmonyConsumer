import React from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "components";
import styles from "./styles";

const ButtonOpen = ({ selectType, title }) => {
  return (
    <TouchableOpacity
      onPress={() => selectType(title === "Always" ? "always" : "once")}
      style={styles.btnBottom}>
      <Text style={styles.txtBottom}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonOpen;
