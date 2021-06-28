import { StyleSheet } from "react-native";
import { scaleSize } from "utils";
import Configs from "configs";
const {
  COLORS: { COLOR_MAIN_APP },
} = Configs;
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderBottomColor: "#DDDDDD",
    // borderBottomWidth: 0,
    borderRadius: scaleSize(5),
    marginTop: scaleSize(20),
    paddingTop: scaleSize(10),
    paddingLeft: scaleSize(10),
  },
  title: {
    alignSelf: "flex-start",
    marginVertical: scaleSize(20),
  },
  container_center: {
    paddingHorizontal: scaleSize(15),
    flex: 1,
    alignItems: "center",
  },

  image_card: {
    width: scaleSize(382),
    height: scaleSize(220),
    // backgroundColor: 'red'
    // tintColor:'#707070'
  },
  image_button: {
    width: scaleSize(25),
    height: scaleSize(25),
    // tintColor:'#707070'
  },
  button_submit: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export default styles;
