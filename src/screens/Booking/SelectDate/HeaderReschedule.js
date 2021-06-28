import React from "react";
import { View, ImageBackground, StyleSheet, TouchableOpacity, Platform, Image } from "react-native";
import { Text } from "components";
import images from "assets";
import { scaleWidth, scaleHeight, slop } from "utils";
import * as RootNavigation from "navigations/RootNavigation";
import actions from "@redux/actions";
import { useDispatch } from "react-redux";

export default function Header(props) {
  const dispatch = useDispatch();

  const onBack = () => {
    RootNavigation.back();
    dispatch(actions.bookingAction.setReschedule(false));
  };

  return (
    <ImageBackground style={styles.imgBackground} source={images.background_reward_profile}>
      <View style={styles.row}>
        <TouchableOpacity onPress={onBack} hitSlop={slop}>
          <Image source={images.arrow_back_ios} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.txtSelectedStaff}>{`Reschedule`}</Text>
        <TouchableOpacity onPress={onBack} hitSlop={slop}>
          <Image source={images.close_header} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imgBackground: {
    width: scaleWidth(100),
    paddingBottom: scaleHeight(1.8),
  },
  row: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: scaleHeight(6.5),
    paddingHorizontal: scaleWidth(3),
  },
  txtStep: {
    color: "white",
    fontSize: scaleWidth(3.5),
    marginLeft: scaleWidth(3),
    marginTop: scaleHeight(2),
  },
  txtSelectedStaff: {
    color: "white",
    fontSize: scaleWidth(5),
    marginLeft: scaleWidth(3),
    fontWeight: Platform.OS === "android" ? "bold" : "600",
  },
  icon: {
    width: scaleWidth(4.2),
    height: scaleWidth(4.2),
    tintColor: "white",
    resizeMode: "contain",
  },
});
