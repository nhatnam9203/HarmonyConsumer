import { StyleSheet, Platform } from "react-native";
import { scaleWidth, scaleHeight } from "utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  body: {
    // padding: scaleWidth(3),
  },
  iconButton: {
    width: scaleWidth(5),
    height: scaleWidth(5),
    marginRight: scaleWidth(1),
  },
  btn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: scaleWidth(30),
    height: scaleWidth(10),
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.12,
    shadowRadius: 2.34,
    elevation: 2,
    borderRadius: 5,
  },
  txtButton: {
    fontSize: scaleWidth(3.5),
  },
  title: {
    marginTop: scaleWidth(2),
    fontWeight: Platform.OS === "android" ? "bold" : "600",
    fontSize: scaleWidth(4.5),
    color: "#404040",
    marginLeft: scaleWidth(3),
  },
  rowStatus: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: scaleHeight(2.5),
    paddingHorizontal: scaleWidth(3),
  },
  date: {
    fontSize: scaleWidth(4.7),
    color: "#404040",
  },
  time: {
    fontSize: scaleWidth(4.2),
    color: "#0764B0",
    fontWeight: Platform.OS === "android" ? "bold" : "700",
    marginTop: scaleWidth(3),
  },
  wrapStatus: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scaleWidth(3),
    paddingVertical: scaleWidth(1),
    borderRadius: 300,
  },
  txtStatus: {
    fontSize: scaleWidth(4),
    color: "#404040",
  },
  iconStatus: {
    width: scaleWidth(4),
    height: scaleWidth(4),
    marginRight: scaleWidth(1),
  },
  toTime: {
    color: "#888888",
    fontSize: scaleWidth(3.8),
    marginTop: scaleWidth(1),
  },
  storeRow: {
    marginTop: scaleHeight(2),
    flexDirection: "row",
    paddingBottom: scaleWidth(3),
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },
  storeImg: {
    width: scaleWidth(15),
    height: scaleWidth(15),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#0764B0",
  },
  rightStore: {
    marginLeft: scaleWidth(3),
  },
  storeName: {
    fontSize: scaleWidth(4.8),
    color: "#404040",
    fontWeight: Platform.OS === "android" ? "bold" : "700",
  },
  txtAddress: {
    fontSize: scaleWidth(3.5),
    color: "#666666",
  },
  geo: {
    width: scaleWidth(4),
    height: scaleWidth(4),
    marginRight: scaleWidth(1),
    tintColor: "#404040",
  },
  txtBottom: {
    fontSize: scaleWidth(3.5),
    color: "#404040",
  },
  rowAddress: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scaleWidth(5),
  },
  rowButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: scaleWidth(3),
    paddingHorizontal: scaleWidth(3),
  },
  titleService: {
    color: "#404040",
    fontSize: scaleWidth(4),
    marginTop: scaleWidth(3),
  },
  padding3: {
    paddingHorizontal: scaleWidth(3),
  },
});

export default styles;
