import { StyleSheet, Platform } from "react-native";
import { scaleWidth, scaleHeight } from "utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scaleWidth(4),
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: scaleHeight(5),
  },
  logo: {
    width: scaleWidth(60),
    height: scaleWidth(60),
    resizeMode: "contain",
  },
  txt1: {
    color: "#585858",
    fontWeight: "500",
    fontSize: scaleWidth(5),
  },
  txt2: {
    color: "grey",
    fontSize: scaleWidth(4.2),
    textAlign: "center",
  },
  txt3: {
    color: "#1C98C9",
    fontSize: scaleWidth(4),
  },
  containerInput: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#eeeeee",
    width: scaleWidth(90),
    height: scaleWidth(12),
    alignSelf: "center",
    marginTop: scaleWidth(5),
    flexDirection: "row",
    alignItems: "center",
    paddingRight: scaleWidth(3),
  },
  buttonSelect: {
    padding: scaleWidth(2),
    borderRightWidth: 1,
    borderRightColor: "#eeeeee",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  buttonContinue: (phone) => {
    return {
      alignSelf: "center",
      width: scaleWidth(90),
      paddingVertical: scaleWidth(3.5),
      backgroundColor: phone.toString().length > 10 ? "#1366AE" : "#F6F6F6",
      justifyContent: "center",
      alignItems: "center",
      marginTop: scaleWidth(5),
      borderRadius: 8,
    };
  },
  txtcontinue: (phone) => {
    return {
      fontSize: scaleWidth(4.5),
      color: phone.toString().length > 10 ? "#fff" : "#6A6A6A",
    };
  },
  phoneHeader: {
    fontSize: scaleWidth(3.5),
    marginRight: scaleWidth(4),
    marginLeft: scaleWidth(2),
  },
  lineSocial: {
    marginTop: scaleHeight(2),
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  line: {
    width: scaleWidth(30),
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd",
  },
  txtSigninWith: {
    marginHorizontal: scaleWidth(2),
    fontSize: scaleWidth(3.8),
    color: "#b5b5b5",
  },
});

export default styles;
