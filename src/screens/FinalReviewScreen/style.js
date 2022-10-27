import { StyleSheet } from "react-native";
import { scaleSize } from "utils";
import Configs from "@src/configs";
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
    paddingBottom: scaleSize(60),
  },
  header: {
    marginTop: scaleSize(20),
  },
  image_card: {
    width: scaleSize(382),
    height: scaleSize(220),
    marginVertical: scaleSize(20),
    marginTop: scaleSize(10),
  },
  image_button: {
    width: scaleSize(25),
    height: scaleSize(25),
    // tintColor:'#707070'
  },
  line_bottom: {
    width: '100%',
    height: scaleSize(1),
    borderColor: '#eeeeee',
    borderWidth: 0.7,
  },
  button_submit: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: scaleSize(30),
    alignItems: 'center',
    marginTop: scaleSize(80),
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
    paddingRight: scaleSize(16),
    paddingTop: scaleSize(10),
    paddingBottom: scaleSize(10),
    fontSize: scaleSize(15),
    marginBottom: scaleSize(15)
  },
  textCancel: {  
    color: 'red',
    fontSize: scaleSize(17)
  }
});

export default styles;
