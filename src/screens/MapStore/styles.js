import { StyleSheet } from "react-native";
import { scaleWidth, scaleHeight } from "utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  map: {
    width: "100%",
    height: "100%",
    zIndex: -3,
  },
  body: {
    flex: 1,
  },
});

export default styles;
