import { StyleSheet } from "react-native";
import { scaleSize } from "utils";
import Configs from "configs";
const {
  COLORS: { COLOR_MAIN_APP },
} = Configs;
const styles = StyleSheet.create({
  container_center: {
    paddingHorizontal: scaleSize(16),
    alignItems: "center",
  },
  container_title: {
    width: scaleSize(382),
    height: scaleSize(50),
    justifyContent: "center",
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: "#eeeeee",
    marginTop: scaleSize(17),
  },

  container_button: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: scaleSize(20),
  },
});

export default styles;
