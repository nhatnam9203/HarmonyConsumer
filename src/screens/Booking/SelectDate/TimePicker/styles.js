import { StyleSheet } from "react-native";
import { scaleWidth } from "utils";

const styles = StyleSheet.create({
  txtMorning: {
    fontSize: scaleWidth(3.9),
    color: "#404040",
    marginBottom: scaleWidth(2),
  },
  rowTime: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: scaleWidth(4),
  },
  columnTime: {
    justifyContent: "center",
    alignItems: "center",
  },
  itemTime: (isActive) => {
    return {
      width: scaleWidth(29),
      height: scaleWidth(10),
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 3,
      backgroundColor: isActive ? "#EDFAFC" : "white",
      borderWidth: 1,
      borderColor: isActive ? "#0764B0" : "#DDDDDD",
      marginTop: scaleWidth(3.5),
    };
  },
  txtTime: (isActive) => {
    return {
      fontSize: scaleWidth(3.8),
      color: "#404040",
    };
  },
});

export default styles;
