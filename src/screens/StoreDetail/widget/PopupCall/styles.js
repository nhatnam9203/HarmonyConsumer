import { StyleSheet } from "react-native";
import { scaleWidth, scaleHeight } from "utils";

const styles = StyleSheet.create({
  container: {
    padding: scaleWidth(5),
    backgroundColor: "white",
    paddingTop: scaleHeight(2),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 30,
  },
  title: {
    fontSize: scaleWidth(4.5),
    color: "#000000",
    textAlign: "center",
  },
  wrapIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: scaleHeight(1.5),
    paddingHorizontal: scaleWidth(10),
  },
  icon: {
    width: scaleWidth(15),
    height: scaleWidth(15),
  },
  txtIcon: {
    fontSize: scaleWidth(3.8),
    marginTop: scaleHeight(0.5),
  },
  wrap: {
    alignItems: "center",
    padding: scaleWidth(3),
    paddingHorizontal: scaleWidth(5),
    borderRadius: 5,
  },
  bottom: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: scaleHeight(2.5),
  },
  txtBottom: {
    fontSize: scaleWidth(3.8),
    color: "#0764B0",
  },
  btnBottom: {
    width: scaleWidth(43),
    alignItems: "center",
  },
  verticalLine: {
    height: scaleWidth(6),
    borderLeftWidth: 1.2,
    borderLeftColor: "#eeeeee",
  },
});

export default styles;
