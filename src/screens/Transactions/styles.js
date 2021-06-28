import { StyleSheet } from "react-native";
import { scaleWidth, scaleHeight } from "utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  rowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    paddingTop: scaleHeight(5),
    paddingBottom: scaleHeight(1),
    paddingHorizontal: scaleWidth(3),
  },
  titleHeader: {
    fontSize: scaleWidth(4.3),
    color: "#585858",
    fontWeight: Platform.OS === "android" ? "bold" : "600",
    marginLeft: -scaleWidth(4),
  },
  body: {
    flex: 1,
    paddingTop: scaleWidth(2),
  },
  wrapSearch: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: scaleWidth(100),
    width: scaleWidth(94),
    marginHorizontal: scaleWidth(3),
    borderWidth: 1,
    borderColor: "#dddddd",
    paddingHorizontal: scaleWidth(3.5),
    paddingVertical: scaleWidth(1.4),
    alignItems: "center",
  },
  txtSearch: {
    fontSize: scaleWidth(3.7),
    color: "#585858",
  },
  txtTime: {
    color: "#585858",
    fontSize: scaleWidth(3.8),
  },
  itemTime: {
    padding: scaleWidth(3),
    backgroundColor: "#F6F6F6",
    marginTop: scaleHeight(1.5),
  },
  containerItem: {
    backgroundColor: "white",
    paddingTop: scaleWidth(3),
    marginTop: scaleWidth(3),
    paddingBottom: scaleWidth(1),
  },
  barTime: {
    width: scaleWidth(100),
    backgroundColor: "white",
    paddingVertical: scaleWidth(3),
  },
  notFound: {
    fontSize: scaleWidth(4),
    color: "#888888",
    marginLeft: scaleWidth(3),
    marginTop: scaleWidth(2),
    textAlign: "center",
  },
});

export default styles;
