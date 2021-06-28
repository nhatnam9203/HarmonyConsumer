import React from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "components";
import { scaleWidth } from "utils";
import Entypo from "react-native-vector-icons/Entypo";
import styles from "./styles";

const ButtonAddMore = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.rowAddmore}>
      <Entypo name="squared-plus" color="#0764B0" size={scaleWidth(5)} />
      <Text fontFamily="bold" style={styles.txtAddMore}>
        Add more
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonAddMore;
