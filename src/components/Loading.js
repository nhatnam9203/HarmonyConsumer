import React from "react";
import { ActivityIndicator, View, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { scaleSize } from "utils";
import LottieView from "lottie-react-native";
const { width, height } = Dimensions.get("window");
const style_loading = {
  width: scaleSize(100),
  height: scaleSize(100),
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "white",
  borderRadius: scaleSize(10),
};
const Loading = () => {
  const loading_app = useSelector((state) => state.appReducer.loading_app);
  return (
    <>
      {loading_app && (
        <View
          style={{
            width,
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            opacity: 1,
            zIndex: 10000,
            position: "absolute",
            backgroundColor: "rgba(0,0,0,0.2)",
          }}>
          <View style={style_loading}>
            <LottieView source={require("../assets/animation/8819-loading.json")} autoPlay loop />
          </View>
        </View>
      )}
    </>
  );
};
export default Loading;
