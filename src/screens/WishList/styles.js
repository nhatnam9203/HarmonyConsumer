import { StyleSheet } from "react-native";
import { scaleWidth, scaleHeight } from "utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    position: "relative",
  },
  header: {
    backgroundColor: "#F9F9F9",
    paddingTop: scaleHeight(5),
    paddingBottom: scaleHeight(1),
    paddingHorizontal: scaleWidth(3),
  },
  rowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleHeader: {
    fontSize: scaleWidth(4),
    fontWeight: Platform.OS === "android" ? "bold" : "600",
    marginLeft: -scaleWidth(4),
  },
  txtAddNewItem: {
    fontSize: scaleWidth(3.5),
    color: "#333",
    flex: 1,
  },
  wrapAddNewItem: {
    width: scaleWidth(100),
    padding: scaleWidth(3),
    borderWidth: 1,
    borderColor: "#dddddd",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  containerWishList: {
    backgroundColor: "white",
    width: scaleWidth(94),
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.1,
    elevation: 4,
    position: "absolute",
    top: scaleHeight(7),
    left: scaleWidth(3),
    zIndex: 99,
  },
  itemWishList: {
    padding: scaleWidth(3),
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
});

export default styles;
