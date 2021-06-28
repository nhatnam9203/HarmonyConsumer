import { StyleSheet } from "react-native";
import { scaleWidth, scaleHeight } from "utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "white",
  },
  banner: {
    width: scaleWidth(100),
    height: scaleHeight(35),
  },
});

export default styles;
