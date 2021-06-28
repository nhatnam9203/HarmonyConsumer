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
  avatar: {
    width: scaleSize(60),
    height: scaleSize(60),
    borderRadius: scaleSize(30),
    resizeMode: "contain",
  },
  title: {
    marginVertical: scaleSize(59),
  },
  content: {
    lineHeight: scaleSize(20),
    textAlign: "center",
    marginTop: scaleSize(40),
  },
  text: {
    fontWeight: "bold",
    marginBottom: scaleSize(10),
    marginTop: scaleSize(14),
  },
  button: { marginTop: scaleSize(14) },
});

export default styles;
