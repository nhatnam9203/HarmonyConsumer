import { StyleSheet, Platform } from "react-native";
import { scaleWidth, scaleHeight } from "utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    backgroundColor: "white",
    padding: scaleWidth(5),
    flex: 1,
  },
  txtSatified: {
    fontSize: scaleWidth(4.5),
    color: "#404040",
    textAlign: "center",
  },
  txtStoreName: {
    color: "#0764B0",
    fontWeight: Platform.OS === "android" ? "bold" : "600",
    fontSize: scaleWidth(4.5),
  },
  txtTop: {
    marginTop: scaleHeight(1),
  },
});

export default styles;
