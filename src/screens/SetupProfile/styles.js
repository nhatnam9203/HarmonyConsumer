import { StyleSheet, Platform } from "react-native";
import { scaleWidth } from "utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: scaleWidth(15),
  },
  title: {
    fontSize: scaleWidth(4.2),
    color: "#585858",
    fontWeight: Platform.OS === "ios" ? "600" : "bold",
  },
  buttonCamera: {
    width: scaleWidth(22),
    height: scaleWidth(22),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scaleWidth(20),
    backgroundColor: "#F6F6F6",
    marginTop: scaleWidth(5),
  },
  imgAvatar: {
    width: scaleWidth(22),
    height: scaleWidth(22),
    borderRadius: 300,
    marginTop: scaleWidth(5),
  },
  buttonContinue: (isValid) => {
    return {
      alignSelf: "center",
      width: scaleWidth(90),
      paddingVertical: scaleWidth(4),
      backgroundColor: isValid ? "#1366AE" : "#F6F6F6",
      justifyContent: "center",
      alignItems: "center",
      marginTop: scaleWidth(8),
      borderRadius: 8,
    };
  },
  txtcontinue: (isValid) => {
    return {
      fontSize: scaleWidth(4.2),
      color: isValid ? "#ffffff" : "#585858",
      fontWeight: Platform.OS === "ios" ? "600" : "bold",
    };
  },
  title2: {
    marginTop: scaleWidth(5),
    fontWeight: "400",
    fontSize: scaleWidth(3.5),
  },
});

export default styles;
