import { StyleSheet } from "react-native";
import { scaleSize, scaleWidth } from "utils";
import Configs from "configs";
const {
  COLORS: { INPUT },
} = Configs;
const styles = StyleSheet.create({
  card: {
    top: -scaleSize(75),
    paddingVertical: scaleSize(15),
  },
  tabs: {},
  container_header: {
    // height: scaleSize(130),
    backgroundColor: "#F8F8F8",
    alignItems: "center",
    paddingTop: scaleSize(20),
    borderBottomWidth: 0.5,
    borderBottomColor: "#eeeeee",
  },
  containerButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: scaleWidth(94),
    marginTop: scaleSize(20),
  },
  button_filter: {},
});
export default styles;
