import { StyleSheet, Platform } from "react-native";
import { scaleWidth, scaleHeight } from "utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    backgroundColor: "#f8f8f8",
  },
  body: {
    flex: 1,
    padding: scaleWidth(5),
  },
  title: {
    fontSize: scaleWidth(5.3),
    fontWeight: Platform.OS === "ios" ? "600" : "bold",
    color: "#333",
  },
  txtUpdate: {
    fontSize: scaleWidth(4.3),
    marginTop: scaleHeight(1),
  },
  txt: {
    fontSize: scaleWidth(4),
    marginTop: scaleHeight(2.3),
    lineHeight: scaleWidth(5),
  },
});

export default styles;
