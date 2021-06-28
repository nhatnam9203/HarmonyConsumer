import { StyleSheet } from "react-native";
import { scaleSize } from "utils";
import Configs from "configs";
const {
  COLORS: { COLOR_MAIN_APP },
} = Configs;
const styles = StyleSheet.create({
  container_center: {
    paddingHorizontal: scaleSize(15),
    flex: 1,
    alignItems: "center",
  },

  container_scan: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
  },

  image_marker_qr: {
    width: scaleSize(200),
    height: scaleSize(200),
    resizeMode: "contain",
  },

  image_marker_barcode: {
    width: scaleSize(250),
    height: scaleSize(100),
    resizeMode: "contain",
  },
});

export default styles;
