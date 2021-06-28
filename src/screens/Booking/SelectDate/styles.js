import { StyleSheet } from "react-native";
import { scaleWidth, scaleHeight } from "utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    position: "relative",
  },
  body: {
    width: scaleWidth(100),
    flex: 1,
  },
  btn: (timePicker) => {
    return {
      borderRadius: 8,
      backgroundColor: timePicker !== "" ? "#0764B0" : "#F6F6F6",
      width: scaleWidth(90),
      height: scaleWidth(13.5),
      justifyContent: "center",
      alignItems: "center",
    };
  },
  wrapBody: {
    paddingTop: scaleWidth(3),
  },
  line: {
    width: scaleWidth(100),
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
    marginTop: scaleHeight(1),
  },
});

export default styles;
