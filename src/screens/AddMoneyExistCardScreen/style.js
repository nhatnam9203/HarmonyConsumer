import { StyleSheet } from "react-native";
import { scaleSize } from "utils";

const styles = StyleSheet.create({
  container_center: {
    paddingHorizontal: scaleSize(15),
  },
  container_button_submit: {
    position: "absolute",
    bottom: scaleSize(30),
  },

  container_item_card: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  image_card: {
    width: scaleSize(48),
    height: scaleSize(28),
    resizeMode: "contain",
    marginRight: scaleSize(15),
  },
  space: {
    marginVertical: scaleSize(12),
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  container_item_reload: {
    width: scaleSize(382),
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: scaleSize(15),
  },
  textTitle: {
    fontSize: scaleSize(17),
    color: "#888888"
  },
  input: {
    width: scaleSize(382),
    height: scaleSize(36),
  },
  text_input: {
    fontSize: scaleSize(17),
    color: "#404040",
    fontWeight: "bold",
    paddingVertical: 10,
  },
});

export default styles;
