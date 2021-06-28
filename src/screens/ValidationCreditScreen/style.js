import { StyleSheet } from "react-native";
import { scaleSize } from "utils";
import Configs from "configs";
const {
  COLORS: { COLOR_MAIN_APP },
} = Configs;
const styles = StyleSheet.create({
  content_text: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: scaleSize(25),
    marginTop: scaleSize(20),
  },
  container_center: {
    paddingHorizontal: scaleSize(15),
  },
  text_input: {
    fontWeight: "bold",
    fontSize: scaleSize(20),
    textAlign: "center",
  },
  container_button_submit: {
    position: "absolute",
  },
  image_creditcard: {
    width: scaleSize(90),
    height: scaleSize(90),
    resizeMode: "contain",
  },
});

export default styles;
