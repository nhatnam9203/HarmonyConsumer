import { StyleSheet, Platform } from "react-native";
import { scaleWidth, scaleHeight } from "utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scaleWidth(4),
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: scaleWidth(15),
  },
  logo: {
    width: scaleWidth(60),
    height: scaleWidth(60),
    resizeMode: "contain",
  },
  txt1: {
    color: "#585858",
    fontWeight: "bold",
    fontSize: scaleWidth(5),
  },
  txt2: {
    color: "#585858",
    fontSize: scaleWidth(3.8),
    textAlign: "center",
    marginTop: scaleHeight(2.5),
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
    fontWeight: "600",
    fontSize: scaleWidth(5),
  },
  txtEmail: {
    color: "#585858",
    fontSize: scaleWidth(3.8),
    marginTop: scaleWidth(10),
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: "#C5C5C5",
    paddingBottom: scaleWidth(1),
    marginTop: scaleWidth(5),
    fontSize: scaleWidth(3.7),
  },
  buttonSend: {
    backgroundColor: "#0764B0",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderRadius: 5,
    paddingVertical: scaleWidth(4),
    marginTop: scaleHeight(5),
  },
  txtSend: {
    fontSize: scaleWidth(4),
    color: "#ffffff",
    fontWeight: Platform.OS === "android" ? "bold" : "600",
  },
  back: {
    color: "#0764B0",
    fontSize: scaleWidth(3.7),
    textDecorationColor: "#0764B0",
    textDecorationLine: "underline",
    fontWeight: "bold",
    marginTop: scaleWidth(8),
  },
});

export default styles;
