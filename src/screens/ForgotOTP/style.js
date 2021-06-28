import { StyleSheet } from "react-native";
import { scaleWidth, scaleHeight } from "utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scaleWidth(4),
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: scaleHeight(6),
  },
  logo: {
    width: scaleWidth(60),
    height: scaleWidth(60),
    resizeMode: "contain",
  },
  txt1: {
    color: "#585858",
    fontWeight: "500",
    fontSize: scaleWidth(4.7),
  },
  txt2: {
    color: "#585858",
    fontSize: scaleWidth(4),
    textAlign: "center",
    marginTop: scaleHeight(3),
  },
  icon: {
    width: scaleWidth(3.8),
    height: scaleWidth(3.8),
  },
  txtSend: {
    color: "#1C98C9",
    fontSize: scaleWidth(3.85),
    marginLeft: scaleWidth(3),
  },
  countdown: {
    marginTop: scaleHeight(5),
  },
  buttonSend: (code) => {
    return {
      backgroundColor: code.toString().length == 4 ? "#0764B0" : "#fafafa",
      justifyContent: "center",
      alignItems: "center",
      width: "95%",
      borderRadius: 5,
      paddingVertical: scaleWidth(4),
      marginTop: scaleWidth(10),
    };
  },
  txtSend2: (code) => {
    return {
      fontSize: scaleWidth(4.2),
      color: code.toString().length == 4 ? "#ffffff" : "#6A6A6A",
      fontWeight: Platform.OS === "android" ? "bold" : "600",
    };
  },
});

export default styles;
