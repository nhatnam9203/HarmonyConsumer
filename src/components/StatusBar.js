import React from "react";
import { View, StatusBar, Platform } from "react-native";
import { isIphoneX, getStatusBarHeight } from "react-native-iphone-x-helper";
const STATUSBAR_HEIGHT =
  Platform.OS === "ios" ? (isIphoneX() ? getStatusBarHeight() : 20) : StatusBar.currentHeight;
const GeneralStatusBarColor = ({ backgroundColor = "transparent", ...props }) => (
  <View style={{ height: STATUSBAR_HEIGHT, backgroundColor, width: "100%" }}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);
export default GeneralStatusBarColor;
