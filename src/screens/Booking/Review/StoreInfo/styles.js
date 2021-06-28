import { StyleSheet } from "react-native";
import { scaleHeight, scaleWidth } from "utils";

const styles = StyleSheet.create({
  date: {
    color: "#404040",
    fontSize: scaleWidth(4.5),
    marginTop: scaleHeight(0.5),
    marginBottom: scaleHeight(1),
  },
  time: {
    color: "#0764B0",
    fontSize: scaleWidth(4.5),
  },
  clock: {
    width: scaleWidth(6),
    height: scaleWidth(6),
  },
  rowTime: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: scaleWidth(94),
    alignItems: "center",
    marginTop: scaleHeight(0.8),
  },
  duration: {
    fontSize: scaleWidth(3.85),
    marginTop: scaleHeight(0.5),
    color: "grey",
  },
  store: {
    width: scaleWidth(20),
    height: scaleWidth(20),
    borderRadius: 5,
  },
  txtLocation: {
    fontSize: scaleWidth(4),
    color: "#585858",
    marginLeft: scaleWidth(1),
    width: scaleWidth(63),
  },
  name: {
    fontSize: scaleWidth(5),
    color: "#404040",
  },
  container: {
    paddingBottom: scaleHeight(2),
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  rowInfo: {
    flexDirection: "row",
    marginTop: scaleHeight(2),
  },
  infoRight: {
    marginLeft: scaleWidth(3),
    justifyContent: "space-between",
  },
  addressWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  txtRating: {
    fontSize: scaleWidth(3.8),
    color: "#404040",
    marginRight: scaleWidth(1),
  },
});

export default styles;
