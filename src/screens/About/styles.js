import { StyleSheet, Platform } from "react-native";
import { scaleWidth, scaleHeight } from "utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    position: "relative",
  },
  header: {
    backgroundColor: "#F9F9F9",
    paddingTop: scaleHeight(5),
    paddingBottom: scaleHeight(1),
    paddingHorizontal: scaleWidth(3),
  },
  rowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleHeader: {
    fontSize: scaleWidth(4),
    fontWeight: Platform.OS === "android" ? "bold" : "600",
    marginLeft: -scaleWidth(4),
  },
  body: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    resizeMode: "contain",
    width: scaleWidth(56),
    height: scaleWidth(43),
    marginTop: scaleWidth(3),
  },
  txtVersion: {
    fontSize: scaleWidth(3.8),
    color: "#3C3C3C",
    marginTop: scaleWidth(8),
  },
  txtCopyright: {
    fontSize: scaleWidth(3.8),
    color: "#0764B0",
    marginTop: scaleWidth(2),
  },
  aboutContent: {
    textAlign: "center",
    fontSize: scaleWidth(3.8),
    color: "#646464",
    marginTop: scaleWidth(8),
    width: scaleWidth(86),
  },
  term: {
    fontSize: scaleWidth(3.8),
    color: "#0764B0",
    fontWeight: Platform.OS === "android" ? "bold" : "600",
  },
  titleContactUs: {
    fontSize: scaleWidth(6),
    color: "#585858",
    fontWeight: Platform.OS === "android" ? "bold" : "600",
    marginTop: scaleHeight(1),
  },
  txtContact: {
    marginTop: scaleHeight(1),
    fontSize: scaleWidth(4),
    color: "#585858",
  },
  rowContact: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scaleHeight(2.5),
    paddingRight: scaleWidth(3),
  },
  wrapIconContact: {
    padding: scaleWidth(1.5),
    borderRadius: scaleWidth(50),
    backgroundColor: "#0764B0",
  },
  txtItemContact: {
    color: "#585858",
    fontSize: scaleWidth(4),
    marginLeft: scaleWidth(5),
    marginTop: scaleHeight(0.6),
  },
  txtSendEmail: {
    fontSize: scaleWidth(4.2),
    fontWeight: Platform.OS === "android" ? "bold" : "600",
    color: "#585858",
  },
  buttonContact: {
    width: scaleWidth(94),
    height: scaleWidth(13.5),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#0764B0",
    marginTop: scaleWidth(7),
  },
  txtButtonContact: {
    fontSize: scaleWidth(4.3),
    fontWeight: Platform.OS === "android" ? "bold" : "600",
    color: "white",
  },
});

export default styles;
