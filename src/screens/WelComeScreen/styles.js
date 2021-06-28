import { StyleSheet } from "react-native";
import { scaleWidth, scaleHeight } from "utils";

const styles = StyleSheet.create({
  skip: {
    color: "#606060",
    fontSize: scaleWidth(3.8),
    fontWeight: "800",
    fontFamily: "Arial",
  },
  containerItem: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: scaleWidth(7),
    paddingHorizontal: scaleWidth(3),
  },
  title: {
    color: "#404040",
    fontWeight: "600",
    fontSize: scaleWidth(5.7),
  },
  image: {
    marginTop: scaleWidth(16),
    width: scaleWidth(70),
    height: scaleWidth(50),
    resizeMode: "contain",
  },
  content: {
    textAlign: "center",
    fontWeight: "400",
    fontSize: scaleWidth(3.8),
    marginTop: scaleWidth(16),
    textAlign: "center",
    color: "#585858",
    lineHeight: scaleWidth(5),
  },
  button: {
    width: scaleWidth(90.5),
    left: scaleWidth(2),
    paddingVertical: scaleWidth(5),
    borderRadius: 5,
    backgroundColor: "#fff",
    justifyContent: "center",
    position: "absolute",
    bottom: scaleHeight(7),
    borderColor: "#0764B0",
    borderWidth: 1,
    // left : scaleWidth(4),
  },
  textButton: {
    color: "white",
    fontSize: scaleWidth(4),
    fontWeight: "bold",
    textAlign: "center",
    color: "#0764B0",
  },
});

export default styles;
