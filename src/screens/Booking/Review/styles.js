import { StyleSheet } from "react-native";
import { scaleWidth } from "utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    position: "relative",
  },
  body: {
    padding: scaleWidth(3),
  },
});

export default styles;
