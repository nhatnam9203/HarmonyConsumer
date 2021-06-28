import { StyleSheet } from "react-native";
import { scaleWidth, scaleHeight } from "utils";

const styles = StyleSheet.create({
  title: {
    fontSize: scaleWidth(4),
    color: "#404040",
  },
  wrapSelected: {
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius: 5,
    padding: scaleWidth(3),
    paddingVertical: scaleWidth(2.3),
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: scaleHeight(1.5),
  },
  input: {
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius: 5,
    padding: scaleWidth(3),
    paddingVertical: scaleWidth(2.3),
    marginTop: scaleHeight(1.5),
  },
  txtSelected: {
    fontSize: scaleWidth(4),
    color: "#666666",
  },
  body: {
    backgroundColor: "#ffffff",
    marginTop: scaleWidth(3),
    padding: scaleWidth(3),
  },
  rowRange: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: scaleHeight(1.5),
  },
  txtError: {
    fontSize: scaleWidth(4),
    color: "red",
    marginTop: scaleWidth(3),
    width: scaleWidth(45),
  },
});

export default styles;
