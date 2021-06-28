import { StyleSheet, Platform } from "react-native";
import { scaleWidth, scaleHeight, scaleSize } from "utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    backgroundColor: "#F9F9F9",
    paddingTop: scaleHeight(5),
    paddingBottom: scaleHeight(1),
  },
  rowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scaleWidth(3),
  },
  titleHeader: {
    fontSize: scaleWidth(4),
    color: "#585858",
    fontWeight: Platform.OS === "android" ? "bold" : "600",
    marginLeft: -scaleWidth(4),
  },
  body: {
    flex: 1,
    backgroundColor: "white",
  },
  store: {
    width: scaleWidth(94),
    borderRadius: 5,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.84,
    elevation: 2,
    // borderColor: "#eeeeee",
    // borderWidth: Platform.OS === "android" ? 2 : 0,
    marginHorizontal: scaleWidth(3),
    marginTop: scaleHeight(2),
  },
  txtStore: {
    marginLeft: scaleWidth(3),
    marginTop: scaleHeight(2),
    marginBottom: scaleHeight(0.5),
    fontSize: scaleWidth(5),
  },
  imgNail: {
    width: "100%",
    height: scaleHeight(16),
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  storeBody: {
    padding: scaleWidth(3),
  },
  titleStore: {
    fontSize: scaleSize(20),
  },
  addressStore: {
    fontSize: scaleSize(15.5),
    color: "#888888",
    marginVertical: scaleWidth(2.5),
  },
  txtGreat: {
    fontSize: scaleWidth(3.65),
    fontWeight: Platform.OS === "android" ? "bold" : "600",
  },
  txtRating: {
    fontSize: scaleWidth(3.65),
    color: "#888888",
    marginLeft: scaleWidth(2),
  },
  stylist: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: scaleWidth(3),
    width: scaleWidth(94),
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    paddingBottom: scaleWidth(2),
    marginTop: scaleWidth(3.5),
  },
  avatarStylist: {
    width: scaleWidth(14),
    height: scaleWidth(14),
    borderRadius: scaleWidth(100),
  },
  txtEmpty: {
    marginLeft: scaleWidth(3),
  },
  txtBusinessName: {
    fontSize: scaleWidth(3.7),
    color: "#888888",
    marginTop: scaleWidth(1),
  },
  likeIcon: {
    position: "absolute",
    top: scaleSize(10),
    right: scaleSize(15),
    elevation: 2,
  },
});

export default styles;
