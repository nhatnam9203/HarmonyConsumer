import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { scaleWidth, slop } from "utils";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import styles from "./styles";
import * as RootNavigation from "navigations/RootNavigation";

export default function index(props) {
  const back = () => {
    RootNavigation.back();
  };

  const { handleSubmit } = props;

  return (
    <View style={styles.header}>
      <View style={styles.rowHeader}>
        <TouchableOpacity onPress={back} hitSlop={slop}>
          <Feather name="chevron-left" size={scaleWidth(7)} color={"#333"} />
        </TouchableOpacity>
        <Text style={styles.titleHeader}>Personal Info</Text>
        <TouchableOpacity onPress={handleSubmit}>
          <AntDesign name="check" size={scaleWidth(6)} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
