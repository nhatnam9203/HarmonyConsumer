import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "components";
import { scaleWidth, slop } from "utils";
import styles from "./styles";
import Feather from "react-native-vector-icons/Feather";

const DateRange = ({ onPress = () => {}, days }) => {
  return (
    <View>
      <Text fontFamily="medium" style={styles.title}>
        Date range
      </Text>
      <TouchableOpacity onPress={onPress} style={styles.wrapSelected} hitSlop={slop}>
        <Text style={styles.txtSelected}>{days}</Text>
        <Feather name="chevron-down" color="#666666" size={scaleWidth(5)} />
      </TouchableOpacity>
    </View>
  );
};

export default DateRange;
