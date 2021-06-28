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
  grand_total: {
    width: scaleSize(382),
    height: scaleSize(52),
    paddingHorizontal: scaleSize(16),
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1.5,
    borderColor: "#2ebe03",
    borderRadius: scaleSize(5),
    marginTop: scaleSize(15),
  },
});

export default styles;
