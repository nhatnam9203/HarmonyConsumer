import { StyleSheet } from "react-native";
import { scaleWidth, scaleHeight } from "utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: scaleWidth(3),
    backgroundColor: "white",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: scaleHeight(1.5),
    marginTop: scaleHeight(1.5),
    marginHorizontal: scaleWidth(3),
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },
  avatar: {
    width: scaleWidth(13),
    height: scaleWidth(13),
    borderRadius: 300,
  },
  name: {
    fontSize: scaleWidth(4),
    marginLeft: scaleWidth(3),
    color: "#585858",
  },
  iconSelected: {
    position: "absolute",
    right: scaleWidth(3),
    top: scaleWidth(3),
  },
  checkDisabled: (isDisabled) => {
    return {
      opacity: isDisabled ? 0.5 : 1,
    };
  },
});

export default styles;
