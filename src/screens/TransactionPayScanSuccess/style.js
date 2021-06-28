import { StyleSheet } from "react-native";
import { scaleSize } from "utils";
const styles = StyleSheet.create({
  container_center: {
    paddingHorizontal: scaleSize(32),
    flex: 1,
    alignItems: "center",
  },

  image: {
    width: scaleSize(80),
    height: scaleSize(60),
    resizeMode: "contain",
    marginTop: scaleSize(44),
  },
  title: {
    marginVertical: scaleSize(44),
  },
  content: {
    lineHeight: scaleSize(20),
    textAlign: "center",
    marginTop: scaleSize(22),
    fontStyle: "italic",
  },
});

export default styles;
