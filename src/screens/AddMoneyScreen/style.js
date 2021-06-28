import { StyleSheet } from "react-native";
import { scaleSize } from "utils";
import Configs from "configs";
const {
  COLORS: { COLOR_MAIN_APP },
} = Configs;
const styles = StyleSheet.create({
  container_balance: {
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scaleSize(15),
    width: "100%",
    borderRadius: scaleSize(5),
    height: scaleSize(45),
    backgroundColor: "#FFF8F8",
    flexDirection: "row",
    marginTop: scaleSize(20),
  },

  container_center: {
    paddingHorizontal: scaleSize(15),
  },
  title_left: {
    alignSelf: "flex-start",
    marginVertical: scaleSize(25),
    fontWeight: "500",
  },
  text_input: {
    fontWeight: "bold",
    fontSize: scaleSize(20),
    textAlign: "center",
  },
  container_button_submit: {
    // position: "absolute",
    // bottom:-scaleSize(10)
    flex: 1,
    marginTop: scaleSize(20),
  },
  image_creditcard: {
    width: scaleSize(128),
    height: scaleSize(80),
    resizeMode: "contain",
    alignSelf: "flex-start",
  },
});

export default styles;
