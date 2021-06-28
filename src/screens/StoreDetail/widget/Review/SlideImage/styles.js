import { StyleSheet } from "react-native";
import { scaleWidth, scaleHeight } from "utils";

const styles = StyleSheet.create({
  container: {
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "black",
    marginLeft: -scaleWidth(5),
    justifyContent: "center",
    alignItems: "center",
  },
  buttonClose: {
    position: "absolute",
    right: scaleWidth(5),
    top: scaleHeight(8),
  },
  imageSlide: {
    width: scaleWidth(100),
    height: scaleHeight(63),
  },
  swiperListContainer: {
    width: scaleWidth(100),
    height: scaleHeight(70),
  },
});

export default styles;
