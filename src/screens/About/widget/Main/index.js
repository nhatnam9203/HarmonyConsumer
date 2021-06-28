import React from "react";
import { View, TouchableOpacity, Platform } from "react-native";
import { Text, Header, StatusBar } from "components";
import styles from "../../styles";
import { scaleWidth, scaleHeight } from "utils";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as RootNavigation from "navigations/RootNavigation";

export default function index(props) {
  const onBack = () => {
    RootNavigation.back();
  };

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "#f8f8f8" }}>
        <StatusBar />
        <Header headerLeft onBack={onBack} title={"About HarmonyPay"} />
      </View>
      <View style={styles.body}>
        <Link title="About Us" action={() => props.goToPage(1)} />
        <Link title="Contact Us" action={() => props.goToPage(2)} />
        <Link title="Feedback" action={() => props.goToPage(3)} />
      </View>
    </View>
  );
}

const Link = ({ title, action }) => {
  return (
    <TouchableOpacity
      style={{
        width: scaleWidth(94),
        marginHorizontal: scaleWidth(3),
        marginTop: scaleHeight(3),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      onPress={action}>
      <Text
        fontFamily="medium"
        style={{
          fontSize: scaleWidth(4.5),
          color: "#585858",
        }}>
        {title}
      </Text>
      <AntDesign name="right" color="#585858" size={scaleWidth(4.5)} />
    </TouchableOpacity>
  );
};
