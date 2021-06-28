import { StyleSheet } from "react-native";
import { scaleSize } from "utils";
import Configs from "configs";
const {
  COLORS: { COLOR_MAIN_APP },
} = Configs;
const styles = StyleSheet.create({
  containerRoot: {
    flex: 1,
    backgroundColor: "white",
  },
  container_giftcard: {
    width: "100%",
    height: scaleSize(240),
    marginTop: scaleSize(15),
  },
  container_center: {
    paddingHorizontal: scaleSize(15),
    flex: 1,
    alignItems: "center",
  },
  container_creditcard: {
    marginTop: scaleSize(30),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: scaleSize(307),
  },
  container_price_giftcard: {
    justifyContent: "center",
    paddingHorizontal: scaleSize(13),
    paddingVertical: scaleSize(5),
    alignItems: "center",
    borderRadius: scaleSize(20),
    backgroundColor: "#FFF",
    position: "absolute",
    top: scaleSize(15),
    right: scaleSize(15),
  },
  image_creditcard: {
    width: scaleSize(40),
    height: scaleSize(25),
    // tintColor:'#707070'
  },
  image_button: {
    width: scaleSize(25),
    height: scaleSize(25),
    // tintColor:'#707070'
  },
  space: {
    marginTop: scaleSize(30),
  },
  button_submit: {
    width: scaleSize(345),
    height: scaleSize(50),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLOR_MAIN_APP,
    paddingHorizontal: scaleSize(20),
    borderRadius: 5,
    position: "absolute",
    bottom: scaleSize(20),
  },
});

export default styles;
