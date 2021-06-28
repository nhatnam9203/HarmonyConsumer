import { StyleSheet, Platform } from "react-native";
import { scaleHeight, scaleWidth } from "utils";

const styles = StyleSheet.create({
  title: {
    fontSize: scaleWidth(4.5),
    color: "#404040",
    marginVertical: scaleHeight(2),
  },
  imgService: {
    width: scaleWidth(18),
    height: scaleWidth(18),
    borderRadius: 5,
  },
  name: {
    fontSize: scaleWidth(4.5),
    color: "#0764B0",
    width: scaleWidth(72),
  },
  txtDuration: {
    fontSize: scaleWidth(4),
    color: "#585858",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: scaleWidth(74),
  },
  containerItem: {
    flexDirection: "row",
    paddingBottom: scaleHeight(1),
    paddingTop: scaleHeight(0.5),
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    borderRightWidth: 4,
    borderRightColor: "#ED1C24",
  },
  buttonDelete: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ED1C24",
    justifyContent: "center",
    alignItems: "center",
  },
  extraContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconCartService: {
    width: scaleWidth(4.2),
    height: scaleWidth(4.2),
    marginRight: scaleWidth(2),
  },
  txtExtra: {
    color: "#0764B0",
    fontSize: scaleWidth(3.7),
  },

  rowQty: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: scaleWidth(50),
  },

  rowButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  btnQty: (qty) => {
    return {
      width: scaleWidth(10),
      height: scaleWidth(5),
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: qty > 1 ? "#0764B0" : "#E5E5E5",
    };
  },
  txtBtnQty: (qty) => {
    return {
      color: qty > 1 ? "white" : "#333",
      fontSize: scaleWidth(3.7),
      fontWeight: "bold",
    };
  },
  txtQty: {
    fontSize: scaleWidth(3.8),
    marginHorizontal: scaleWidth(4),
    fontWeight: Platform.OS === "android" ? "bold" : "600",
  },
  topItem: {
    marginTop: scaleHeight(1.2),
  },
  containerRight: {
    marginLeft: scaleWidth(3),
    justifyContent: "space-between",
  },
  txtPrice: {
    fontWeight: Platform.OS === "android" ? "bold" : "600",
    marginRight: scaleWidth(3),
    fontSize: scaleWidth(4),
  },
  rowProduct: {
    marginLeft: scaleWidth(3),
    justifyContent: "space-between",
  },
});

export default styles;
