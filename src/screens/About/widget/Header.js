import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { scaleWidth, slop } from "utils";
import Feather from "react-native-vector-icons/Feather";
import styles from "../styles";

export default function index(props) {
  const { title, back } = props;
  return (
    <View style={styles.header}>
      <View style={styles.rowHeader}>
        <TouchableOpacity onPress={back} hitSlop={slop}>
          <Feather name="chevron-left" size={scaleWidth(5)} />
        </TouchableOpacity>
        <Text style={styles.titleHeader}>{title}</Text>
        <View />
      </View>
    </View>
  );
}
