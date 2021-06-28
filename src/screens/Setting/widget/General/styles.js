import { StyleSheet, Platform } from "react-native";
import { scaleWidth, scaleHeight } from "utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    backgroundColor: "#F9F9F9",
    paddingTop: scaleHeight(5),
    paddingBottom: scaleHeight(1),
  },
  rowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scaleWidth(3),
  },
  titleHeader: {
    fontSize: scaleWidth(5),
    color: "#333",
    fontWeight: Platform.OS === "android" ? "bold" : "600",
    marginLeft: -scaleWidth(4),
  },
  body: {
    flex: 1,
    backgroundColor: "white",
    padding: scaleWidth(3),
    paddingTop: scaleWidth(6),
  },
  txtSub: {
    fontSize: scaleWidth(3.6),
    color: "#585858",
    marginLeft: scaleWidth(2),
  },
  name: {
    color: "#0764B0",
    fontSize: scaleWidth(6),
    fontWeight: Platform.OS === "ios" ? "600" : "bold",
  },
  avatar: {
    width: scaleWidth(20),
    height: scaleWidth(20),
    borderRadius: scaleWidth(100),
  },
  line: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    marginTop: scaleHeight(2),
    marginBottom: scaleHeight(2.3),
  },
  cardName: {
    color: "#404040",
    // fontWeight: Platform.OS === "ios" ? "700" : "bold",
    fontSize: scaleWidth(4.5),
  },
  price: {
    color: "#0764B0",
    fontWeight: Platform.OS === "ios" ? "800" : "bold",
    fontSize: scaleWidth(4.5),
    marginTop: scaleHeight(2),
  },
  title: {
    color: "#404040",
    // fontWeight: Platform.OS === "ios" ? "700" : "bold",
    fontSize: scaleWidth(4.5),
  },
  txt: {
    color: "#585858",
    fontSize: scaleWidth(3.85),
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: scaleHeight(2),
  },
  icon: {
    width: scaleWidth(4.5),
    height: scaleWidth(4.5),
  },
});

export default styles;
