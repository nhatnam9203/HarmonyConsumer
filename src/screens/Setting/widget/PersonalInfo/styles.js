import { StyleSheet } from "react-native";
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
    padding: scaleWidth(3),
    paddingTop: scaleWidth(6),
  },
  avatar: {
    width: scaleWidth(20),
    height: scaleWidth(20),
    borderRadius: scaleWidth(100),
  },
  txtChangeAvatar: {
    fontSize: scaleWidth(4),
    color: "#0764B0",
    marginTop: scaleWidth(3),
  },
  txt: {
    fontSize: scaleWidth(4),
    color: "#585858",
  },
  menu: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  phoneHeader: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
    paddingBottom: scaleWidth(1.5),
    marginTop: scaleWidth(2),
    fontSize: scaleWidth(3.8),
    color: "#666666",
  },
});
export default styles;
