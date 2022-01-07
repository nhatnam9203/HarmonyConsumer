import { StyleSheet } from "react-native";
import { scaleSize } from "utils";
import Configs from "@src/configs";
const {
  COLORS: { COLOR_MAIN_APP },
} = Configs;
const styles = StyleSheet.create({
  container_giftcard: {
    width: "100%",
    height: scaleSize(240),
    marginVertical: scaleSize(15),
    borderRadius: scaleSize(5),
    borderWidth: 1,
    borderColor: "#EEEEEE",
    position: "relative",
    overflow: "hidden",
  },
  container_center: {
    paddingHorizontal: scaleSize(15),
    flex: 1,
    alignItems: "center",
  },

  container_price_giftcard: {
    paddingHorizontal: scaleSize(13),
    paddingVertical: scaleSize(7),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scaleSize(20),
    backgroundColor: "#FFF",
    position: "absolute",
    top: scaleSize(15),
    right: scaleSize(15),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },

  image_creditcard: {
    width: scaleSize(40),
    height: scaleSize(25),
    // tintColor:'#707070'
  },
  icon_info_remove: {
    width: scaleSize(17),
    height: scaleSize(17),
    marginLeft: scaleSize(5),
  },
  space: {
    marginTop: scaleSize(30),
  },

  container_icon_title: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  sub_container_auto_reload: {
    justifyContent: "space-between",
  },

  icon: {
    width: scaleSize(27),
    height: scaleSize(27),
    resizeMode: "contain",
  },

  icon_arrow: {
    width: scaleSize(14),
    height: scaleSize(14),
    resizeMode: "contain",
  },

  title: {
    fontWeight: "400",
    marginLeft: 20,
  },
  imageCard: {
    width: "100%",
    height: "100%",
  },
});

export default styles;
