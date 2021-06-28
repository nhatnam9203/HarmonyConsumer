import { StyleSheet, Platform } from "react-native";
import { scaleWidth, scaleHeight } from "utils";

const styles = StyleSheet.create({
  rowHeader: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: scaleWidth(3),
  },
  headerLeft: {
    position: "absolute",
    left: scaleWidth(3),
  },
  titleHeader: {
    color: "white",
    fontWeight: Platform.OS === "android" ? "bold" : "600",
  },
  headerBackground: {
    paddingTop: scaleHeight(5),
    justifyContent: "space-between",
    paddingVertical: scaleWidth(3),
  },
  avatar: {
    alignSelf: "center",
    borderRadius: scaleWidth(30),
    borderWidth: 2,
    borderColor: "white",
    width: scaleWidth(20),
    height: scaleWidth(20),
    marginTop: scaleWidth(4),
  },
  nameHeader: {
    color: "white",
    fontWeight: Platform.OS === "android" ? "bold" : "600",
    alignSelf: "center",
  },
  iconBronze: {
    width: scaleWidth(5),
    height: scaleWidth(5),
  },
  txtRankName: {
    color: "#FAFAFA",
    fontWeight: "300",
    marginLeft: scaleWidth(2),
  },
});

export default styles;
