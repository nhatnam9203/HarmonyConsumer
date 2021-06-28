import { StyleSheet } from "react-native";
import { scaleWidth, scaleHeight } from "utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scaleWidth(4),
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: scaleWidth(15),
  },
  logo: {
    width: scaleWidth(60),
    height: scaleWidth(60),
  },
  txt1: {
    color: "#585858",
    fontSize: scaleWidth(4.8),
  },
  txt2: {
    color: "#585858",
    fontSize: scaleWidth(4.3),
    textAlign: "center",
    marginTop: scaleWidth(5),
  },
  icon: {
    width: scaleWidth(4),
    height: scaleWidth(4),
  },
  txtSend: {
    color: "#1C98C9",
    fontSize: scaleWidth(3.8),
    marginLeft: scaleWidth(3),
  },
  countdown: {
    marginTop: scaleHeight(5),
  },
});

export default styles;
