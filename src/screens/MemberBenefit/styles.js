import { StyleSheet, Platform } from "react-native";
import { scaleWidth } from "utils";

const styles = StyleSheet.create({
  rowHeader: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: scaleWidth(3),
  },
  titleHeader: {
    fontSize: scaleWidth(4),
    color: "white",
    fontWeight: Platform.OS === "android" ? "bold" : "600",
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
    fontSize: scaleWidth(7),
    alignSelf: "center",
  },
  iconBronze: {
    width: scaleWidth(5),
    height: scaleWidth(5),
  },
});

export default styles;
