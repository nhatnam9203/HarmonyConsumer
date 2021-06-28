import { StyleSheet } from "react-native";
import { scaleWidth } from "utils";

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    flex: 1,
    backgroundColor: "white",
  },
  rowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleHeader: {
    fontSize: scaleWidth(4),
    color: "#585858",
    fontWeight: Platform.OS === "android" ? "bold" : "600",
    marginLeft: -scaleWidth(4),
  },
  wrapScroll: {
    marginTop: scaleWidth(5),
    height: "100%",
  },
});

export default styles;
