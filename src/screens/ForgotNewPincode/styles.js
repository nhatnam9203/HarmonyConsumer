import { StyleSheet } from "react-native";
import { scaleWidth, scaleHeight } from "utils";

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "white",
    padding: scaleWidth(3),
    alignItems: "center",
    paddingTop: scaleWidth(10),
    position: "relative",
  },
  buttonSave: (newPincode, confirmPincode) => {
    return {
      width: scaleWidth(88),
      height: scaleWidth(13),
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 5,
      backgroundColor:
        newPincode.toString().length == 6 && confirmPincode.toString().length == 6
          ? "#0764B0"
          : "#fafafa",
      marginTop: scaleHeight(8),
    };
  },
  image: {
    width: scaleWidth(50),
    height: scaleWidth(30),
    resizeMode: "contain",
  },
  txtSave: (newPincode, confirmPincode) => {
    return {
      color:
        newPincode.toString().length == 6 && confirmPincode.toString().length == 6
          ? "white"
          : "#404040",
      fontSize: scaleWidth(4),
      fontWeight: Platform.OS === "android" ? "bold" : "600",
    };
  },
  txt: {
    fontSize: scaleWidth(4.2),
    color: "#404040",
    marginVertical: scaleWidth(8),
  },
  txtSuccess: {
    fontWeight: "bold",
    color: "#0764B0",
    fontSize: scaleWidth(5),
    marginTop: scaleHeight(5),
  },
  txtSetup: {
    color: "#404040",
    fontWeight: Platform.OS === "android" ? "bold" : "600",
    fontSize: scaleWidth(4.5),
    marginVertical: scaleHeight(4),
  },
});

export default styles;
