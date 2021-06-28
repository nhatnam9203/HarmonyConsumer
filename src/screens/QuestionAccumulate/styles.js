import { StyleSheet, Platform } from "react-native";
import { scaleWidth, scaleHeight } from "utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    backgroundColor: "#F9F9F9",
  },
  rowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scaleWidth(3),
  },
  titleHeader: {
    fontSize: scaleWidth(4),
    color: "#585858",
    fontWeight: Platform.OS === "android" ? "bold" : "600",
    marginLeft: -scaleWidth(4),
  },
  imgTop: {
    alignSelf: "center",
    width: scaleWidth(50),
    height: scaleHeight(26),
    resizeMode: "contain",
  },
  item: {
    width: "100%",
    borderRadius: 5,
    backgroundColor: "white",
    marginTop: scaleWidth(5),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    elevation: 5,
  },
  imgItem: {
    width: "100%",
    height: scaleHeight(20),
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  bottomItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: scaleWidth(2),
    paddingHorizontal: scaleWidth(3),
  },
  txtBottomItem: {
    color: "#333",
    fontSize: scaleWidth(3.5),
    fontWeight: "500",
  },
  txtBottomItem2: {
    color: "#0764B0",
    fontSize: scaleWidth(3.5),
    fontWeight: Platform.OS === "android" ? "bold" : "600",
  },
  body: {
    flex: 1,
    padding: scaleWidth(3),
    backgroundColor: "#fff",
    marginTop: scaleWidth(3),
  },
  txtItem2: {
    fontSize: scaleWidth(3.2),
    color: "#666666",
    marginTop: scaleWidth(3),
  },
  txt10: {
    fontSize: scaleWidth(3.5),
    color: "#0764B0",
  },
  img10: {
    width: scaleWidth(5),
    height: scaleWidth(5),
    marginLeft: scaleWidth(2),
  },
  bottomItem2: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scaleWidth(2),
    marginLeft: scaleWidth(10),
  },
  txtGo: {
    fontSize: scaleWidth(3.5),
    color: "#fff",
  },
  btnGo: {
    borderRadius: 8,
    paddingHorizontal: scaleWidth(4.5),
    paddingVertical: scaleWidth(1.5),
    backgroundColor: "#0764B0",
  },
  bodyItem2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: scaleWidth(3),
  },
});

export default styles;
