import { StyleSheet } from "react-native";
import { scaleSize } from "utils";
import Configs from "configs";
const {
  COLORS: { COLOR_MAIN_APP },
} = Configs;
const styles = StyleSheet.create({
  content_card: {
    width: "100%",
    height: scaleSize(50),
    justifyContent: "space-between",
    alignItems: "center",
  },
  container_center: {
    paddingHorizontal: scaleSize(16),
  },
  header: {
    marginTop: scaleSize(20),
  },
  image_card: {
    width: scaleSize(382),
    height: scaleSize(220),
    marginVertical: scaleSize(20),
  },
  image_button: {
    width: scaleSize(25),
    height: scaleSize(25),
    // tintColor:'#707070'
  },
  line_bottom: {
    // marginTop: scaleSize(20),
    width: "100%",
    height: scaleSize(1),
    borderColor: "#eeeeee",
    borderWidth: 0.7,
  },
  button_submit: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: scaleSize(30),
    alignItems: "center",
  },
  txt_add: {
    marginLeft: scaleSize(10),
  },
  button_add: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  input: {
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderBottomColor: "#DDDDDD",
    borderRadius: scaleSize(5),
    marginTop: scaleSize(15),
    paddingLeft: scaleSize(15),
    backgroundColor: "white",
  },
});

export default styles;
