import { StyleSheet, Platform } from "react-native";
import { scaleWidth, scaleHeight } from "utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: scaleWidth(15),
  },
  title: {
    fontSize: scaleWidth(5),
    color: "#585858",
    fontWeight: Platform.OS === "ios" ? "600" : "bold",
  },
  name: {
    fontSize: scaleWidth(6),
    color: "#0764B0",
    marginTop: scaleWidth(3),
  },
  txtCreate: {
    fontSize: scaleWidth(4.5),
    color: "#404040",
    marginTop: scaleHeight(3.5),
  },
  txtDifferent: {
    fontSize: scaleWidth(4),
    color: "#27AAE1",
    marginTop: scaleHeight(9),
  },
  buttonContinue: (code) => {
    return {
      alignSelf: "center",
      width: scaleWidth(90),
      paddingVertical: scaleWidth(3.5),
      backgroundColor: code.toString().length === 6 ? "#1366AE" : "#F6F6F6",
      justifyContent: "center",
      alignItems: "center",
      marginTop: scaleWidth(8),
      borderRadius: 8,
    };
  },
  txtcontinue: (code) => {
    return {
      fontSize: scaleWidth(4),
      color: code.toString().length === 6 ? "#fff" : "#6A6A6A",
      fontWeight: code.toString().length === 6 ? "bold" : "400",
    };
  },
  imgBiometric: {
    width: scaleWidth(12),
    height: scaleWidth(12),
    marginTop: scaleWidth(8),
  },
  imgAvatar: {
    width: scaleWidth(22),
    height: scaleWidth(22),
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius: scaleWidth(70),
    marginTop: scaleWidth(8),
  },
});

export default styles;
