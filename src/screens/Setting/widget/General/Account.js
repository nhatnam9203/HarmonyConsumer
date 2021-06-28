import React from "react";
import { View, TouchableOpacity } from "react-native";
import { scaleWidth } from "utils";
import { Text } from "components";
import styles from "./styles";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as RootNavigation from "navigations/RootNavigation";

export default function Account(props) {
  const navigateToPersonalInfo = () => {
    RootNavigation.navigate("PersonalInfo");
  };

  const navigateToPaymentSetting = () => {
    RootNavigation.navigate("Payments");
  };

  return (
    <View>
      <Text fontFamily="medium" style={styles.title}>
        Account
      </Text>
      <TouchableOpacity onPress={navigateToPersonalInfo} style={styles.row}>
        <Text style={styles.txt}>Personal info</Text>
        <AntDesign name="right" size={scaleWidth(4)} color={"#585858"} />
      </TouchableOpacity>

      <TouchableOpacity onPress={navigateToPaymentSetting} style={styles.row}>
        <Text style={styles.txt}>Payment</Text>
        <AntDesign name="right" size={scaleWidth(4)} color={"#585858"} />
      </TouchableOpacity>
    </View>
  );
}
