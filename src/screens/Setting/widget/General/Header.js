import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { scaleWidth, slop } from "utils";
import Feather from "react-native-vector-icons/Feather";
import styles from "./styles";
import * as RootNavigation from "navigations/RootNavigation";

export default function index(props) {
  const back = () => {
    RootNavigation.back();
  };

  return (
    <View style={styles.header}>
      <View style={styles.rowHeader}>
        <TouchableOpacity onPress={back} hitSlop={slop}>
          <Feather name="chevron-left" size={scaleWidth(7)} color={"#333"} />
        </TouchableOpacity>
        <Text style={styles.titleHeader}>Settings</Text>
        <View />
      </View>
    </View>
  );
}
