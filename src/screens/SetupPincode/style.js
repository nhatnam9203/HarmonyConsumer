import { StyleSheet, Platform } from "react-native";
import { scaleWidth, scaleHeight } from "utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: scaleWidth(15),
  },
  title: {
    fontSize: scaleWidth(4),
    color: "#585858",
    fontWeight: Platform.OS === "ios" ? "600" : "bold",
  },
  name: {
    fontSize: scaleWidth(5.5),
    color: "#0764B0",
    fontWeight: Platform.OS === "ios" ? "600" : "bold",
    marginTop: scaleHeight(2),
    marginBottom: scaleHeight(2),
  },
  txtCreate: {
    fontSize: scaleWidth(3.7),
    color: "#585858",
    fontWeight: Platform.OS === "ios" ? "600" : "bold",
    marginTop: scaleWidth(8),
  },
  txtDifferent: {
    fontSize: scaleWidth(3.2),
    color: "red",
    marginTop: scaleWidth(8),
  },
  buttonContinue: (code, confirm) => {
    return {
      alignSelf: "center",
      width: scaleWidth(90),
      paddingVertical: scaleWidth(4),
      backgroundColor:
        code.toString().length === 6 && confirm.toString().length === 6 ? "#1366AE" : "#F6F6F6",
      justifyContent: "center",
      alignItems: "center",
      marginTop: scaleWidth(8),
      borderRadius: 8,
    };
  },
  txtcontinue: (code, confirm) => {
    return {
      fontSize: scaleWidth(4.2),
      color: code.toString().length === 6 && confirm.toString().length === 6 ? "#fff" : "#6A6A6A",
      fontWeight: code.toString().length === 6 && confirm.toString().length === 6 ? "bold" : "400",
    };
  },
  imgLogo: {
    width: scaleWidth(20),
    height: scaleWidth(20),
    marginTop: scaleHeight(5),
    // borderRadius : 300
  },
  maskedPincode: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#14141473",
    borderRadius: scaleWidth(50),
  },
  cellPincode: {
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius: scaleWidth(50),
    width: scaleWidth(8),
    height: scaleWidth(8),
  },
});

export default styles;
