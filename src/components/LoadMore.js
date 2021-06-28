import React from "react";
import { View } from "react-native";
import { scaleSize } from "utils";
import LottieView from "lottie-react-native";
const style_loading = {
  width: scaleSize(300),
  height: scaleSize(70),
  alignSelf: "center",
};
const Loading = () => {
  return (
    <View style={style_loading}>
      <LottieView source={require("../assets/animation/tree-dot.json")} autoPlay loop />
    </View>
  );
};
export default Loading;
