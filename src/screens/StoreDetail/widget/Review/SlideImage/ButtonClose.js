import React from "react";
import { TouchableOpacity } from "react-native";
import styles from "./styles";
import AntDesign from "react-native-vector-icons/AntDesign";
import { scaleWidth, slop } from "utils";

const ButtonClose = ({ onPress }) => {
  return (
    <TouchableOpacity hitSlop={slop} onPress={onPress} style={styles.buttonClose}>
      <AntDesign name="close" color={"white"} size={scaleWidth(6)} />
    </TouchableOpacity>
  );
};

export default ButtonClose;
