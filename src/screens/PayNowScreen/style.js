import { StyleSheet } from "react-native";
import { scaleSize } from "utils";
import Configs from "@src/configs";
const {
  COLORS: { COLOR_MAIN_APP },
} = Configs;

const styles = StyleSheet.create({
  card: {
    width: scaleSize(382),
    height: scaleSize(80),
    marginTop: scaleSize(15),
    borderRadius: scaleSize(5),
    flexDirection: "row",
    paddingHorizontal: scaleSize(17),
    backgroundColor: "#FFF",
    justifyContent: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  container_center: {
    paddingHorizontal: scaleSize(15),
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  image: {
    width: scaleSize(32),
    height: scaleSize(32),
    marginRight: scaleSize(16),
    resizeMode: "contain",
    tintColor: "#0764b0",
  },
  badget: {
    position: "absolute",
    right: scaleSize(20),
  },
});

export default styles;
