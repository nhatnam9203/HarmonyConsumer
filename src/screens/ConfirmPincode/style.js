import { StyleSheet, Platform } from "react-native";
import { scaleWidth } from "utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: scaleWidth(15),
  },
  title: {
    fontSize: scaleWidth(3.5),
    color: "#585858",
    fontWeight: Platform.OS === "ios" ? "600" : "bold",
  },
  name: {
    fontSize: scaleWidth(4),
    color: "#0764B0",
    fontWeight: Platform.OS === "ios" ? "600" : "bold",
    marginTop: scaleWidth(3),
  },
  txtCreate: {
    fontSize: scaleWidth(3.5),
    color: "#585858",
    fontWeight: Platform.OS === "ios" ? "600" : "bold",
    marginTop: scaleWidth(8),
  },
  txtDifferent: {
    fontSize: scaleWidth(3.2),
    color: "#1B75C1",
    marginTop: scaleWidth(8),
  },
  buttonContinue: (code, confirm) => {
    return {
      alignSelf: "center",
      width: scaleWidth(90),
      paddingVertical: scaleWidth(3.5),
      backgroundColor:
        code.toString().length === 6 && confirm.toString().length === 6 ? "#1366AE" : "#F6F6F6",
      justifyContent: "center",
      alignItems: "center",
      marginTop: scaleWidth(8),
      borderRadius: 8,
    };
  },
  txtcontinue: (code, confirm) => {
    return {
      fontSize: scaleWidth(4),
      color: code.toString().length === 6 && confirm.toString().length === 6 ? "#fff" : "#6A6A6A",
      fontWeight: code.toString().length === 6 && confirm.toString().length === 6 ? "bold" : "600",
    };
  },
  imgLogo: {
    width: scaleWidth(25),
    height: scaleWidth(25),
    marginTop: scaleWidth(5),
    resizeMode: "contain",
  },
});

export default styles;
