import { StyleSheet, Platform } from "react-native";
import { scaleWidth, scaleHeight } from "utils";

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "white",
    padding: scaleWidth(3),
    alignItems: "center",
    paddingTop: scaleWidth(10),
    position: "relative",
  },
  buttonSave: {
    width: scaleWidth(94),
    height: scaleWidth(14),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#0764B0",
    marginTop: scaleHeight(5),
  },
  image: {
    width: scaleWidth(25),
    height: scaleWidth(25),
  },
  txtSave: {
    color: "white",
    fontSize: scaleWidth(4),
    fontWeight: Platform.OS === "android" ? "bold" : "600",
  },
  txt: {
    fontSize: scaleWidth(4),
    color: "#404040",
    marginVertical: scaleWidth(10),
  },
  txtSuccess: {
    fontWeight: "bold",
    color: "#0764B0",
    fontSize: scaleWidth(5),
    marginTop: scaleHeight(5),
  },
});

export default styles;
