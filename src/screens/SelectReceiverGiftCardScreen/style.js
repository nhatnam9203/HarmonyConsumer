import { StyleSheet } from "react-native";
import { scaleSize, scaleWidth, scaleHeight } from "utils";
import Configs from "@src/configs";
const {
  COLORS: { COLOR_MAIN_APP },
} = Configs;
const styles = StyleSheet.create({
  container_center: {
    paddingHorizontal: scaleSize(16),
  },

  header: {
    marginVertical: scaleSize(20),
  },

  tabs: {
    width: scaleSize(382),
    height: scaleSize(30),
  },
  tab: {
    width: scaleSize(95),
    height: scaleSize(30),
    marginRight: scaleSize(8),
  },
  wrapper_tabs: {
    // alignItems: "flex-start",
    marginTop: scaleSize(30),
    // marginHorizontal: scaleSize(16),
    flex: 1,
  },
  containerModal: {
    width: scaleWidth(90),
    backgroundColor: "white",
    borderRadius: 10,
    padding: scaleWidth(3),
    paddingBottom: scaleWidth(6),
  },
  titleModal: {
    color: "#585858",
    fontSize: scaleWidth(5),
    textAlign: "center",
  },
  btnCloseModal: {
    position: "absolute",
    right: scaleWidth(3),
    top: scaleWidth(4),
  },
  contentModal: {
    textAlign: "center",
    color: "#585858",
    fontSize: scaleWidth(4),
    marginTop: scaleWidth(5),
  },
  bottomModal: {
    flexDirection: "row",
    marginTop: scaleHeight(3.5),
  },
  buttonModal: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  txtButtonModal: {
    fontSize: scaleWidth(5.5),
  },
  txtSuccess: {
    textAlign: "center",
    marginTop: scaleHeight(2),
    fontSize: scaleWidth(4.2),
    color: "#2ab555",
  },
  indicator: {
    alignSelf: "center",
    marginTop: scaleHeight(2),
  },
});

export default styles;
