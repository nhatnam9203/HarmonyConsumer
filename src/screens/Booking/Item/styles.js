import { StyleSheet, Platform } from "react-native";
import { scaleWidth, scaleHeight } from "utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    position: "relative",
  },
  body: {
    padding: scaleWidth(3),
  },
  image: {
    width: scaleWidth(100),
    height: scaleHeight(32),
  },
  title: {
    fontSize: scaleWidth(4.5),
    color: "#0764B0",
    marginBottom: scaleHeight(1.5),
  },
  noExtra: {
    fontSize: scaleWidth(3.8),
    color: "#585858",
    fontWeight: Platform.OS === "android" ? "400" : "300",
  },
});

export default styles;
