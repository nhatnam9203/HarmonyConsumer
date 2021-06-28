import { StyleSheet, Platform } from "react-native";
import { scaleWidth, scaleHeight } from "utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scaleWidth(4),
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: scaleHeight(5),
  },
  logo: {
    width: scaleWidth(60),
    height: scaleWidth(60),
    resizeMode: "contain",
  },
  txt1: {
    color: "#585858",
    fontWeight: Platform.OS === "android" ? "bold" : "600",
    fontSize: scaleWidth(5),
  },
  txt2: {
    color: "#585858",
    fontSize: scaleWidth(3.8),
    textAlign: "center",
    marginTop: scaleHeight(3),
  },
  icon: {
    width: scaleWidth(3.8),
    height: scaleWidth(3.8),
  },
  txtSend: {
    color: "#1C98C9",
    fontSize: scaleWidth(3.5),
    marginLeft: scaleWidth(3),
  },
  title: {
    color: "#585858",
    fontWeight: Platform.OS === "android" ? "bold" : "600",
    fontSize: scaleWidth(5),
  },
  txtEmail: {
    color: "#585858",
    fontSize: scaleWidth(4),
    marginTop: scaleWidth(10),
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: "#C5C5C5",
    paddingBottom: scaleWidth(1),
    marginTop: scaleWidth(3),
    fontSize: scaleWidth(3.7),
  },
  buttonSend: (isValid) => {
    return {
      backgroundColor: isValid ? "#0764B0" : "#f6f6f6",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      borderRadius: 5,
      paddingVertical: scaleWidth(3.5),
      marginTop: scaleHeight(3),
    };
  },
  txtSend: (isValid) => {
    return {
      fontSize: scaleWidth(4.2),
      color: isValid ? "#ffffff" : "#585858",
      fontWeight: Platform.OS === "android" ? "bold" : "600",
    };
  },
  back: {
    color: "#0764B0",
    fontSize: scaleWidth(4.5),
    textDecorationColor: "#0764B0",
    textDecorationLine: "underline",
    fontWeight: "bold",
    marginTop: scaleHeight(5),
  },
});

export default styles;
