import { StyleSheet } from "react-native";
import { scaleWidth } from "utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  body: {
    paddingVertical: scaleWidth(3),
  },
  title: {
    marginTop: scaleWidth(2),
    fontSize: scaleWidth(4.5),
    color: "#404040",
    marginLeft: scaleWidth(3),
  },
  qty: {
    width: scaleWidth(7),
    height: scaleWidth(7),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scaleWidth(70),
    borderRadius: 300,
    backgroundColor: "#D4F8FC",
    marginLeft: scaleWidth(3),
    marginTop: scaleWidth(2.1),
  },
  textQty: {
    color: "#404040",
    fontSize: scaleWidth(3.3),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default styles;
