import { StyleSheet, Platform } from "react-native";
import { scaleWidth, scaleHeight } from "utils";

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
    fontSize: scaleWidth(4.3),
    fontWeight: Platform.OS === "android" ? "bold" : "600",
    marginLeft: -scaleWidth(4),
  },
  body: {
    // flex: 1,
    backgroundColor: "white",
    // padding: scaleWidth(3),
    paddingTop: scaleWidth(5),
  },
  txtAddCard: {
    color: "#0764B0",
    fontSize: scaleWidth(4),
    marginLeft: scaleWidth(2),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: scaleHeight(8),
  },
  imgCard: (type, name) => {
    return {
      width: scaleWidth(12),
      height: scaleWidth(12),
      tintColor: type === name ? "#0764B0" : "#7B99BA",
    };
  },
  selectCard: (type, name) => {
    return {
      padding: scaleWidth(5),
      backgroundColor: type === name ? "#F8F8F8" : "white",
    };
  },
  txtCreditCard: {
    fontWeight: Platform.OS === "android" ? "bold" : "600",
    fontSize: scaleWidth(4.3),
  },
  itemSelect: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: scaleWidth(25),
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#DDDDDD",
    padding: scaleWidth(2),
  },
  txtNormal: {
    fontSize: scaleWidth(3.5),
    color: "#585858",
  },
  buttonAddCard: {
    width: scaleWidth(90),
    position: "absolute",
    bottom: scaleWidth(5),
    left: scaleWidth(3),
    height: scaleWidth(12),
    borderRadius: 5,
    backgroundColor: "#0764B0",
    justifyContent: "center",
    alignItems: "center",
  },
  txtButtonAddCard: {
    fontSize: scaleWidth(4),
    color: "white",
    fontWeight: Platform.OS === "android" ? "bold" : "600",
  },
  rowExpireDate: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: scaleWidth(7),
  },
  txtCardInfo: {
    fontSize: scaleWidth(4),
    color: "#404040",
    fontWeight: Platform.OS === "android" ? "bold" : "600",
  },
  rowBottomCard: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: scaleHeight(2),
  },
  imgCardVisa: {
    width: scaleWidth(9),
    height: scaleWidth(9),
  },
  imgCardVisa2: {
    width: scaleWidth(12),
    height: scaleWidth(12),
  },
  cvvCard: {
    fontSize: scaleWidth(3),
    color: "#585858",
  },
  dateCard: {
    fontSize: scaleWidth(3.5),
    color: "#404040",
  },

  statusCard: {
    fontSize: scaleWidth(3.5),
    color: "#888888",
    position: "absolute",
    bottom: scaleHeight(2),
    right: scaleWidth(3),
    fontStyle: "italic",
  },

  cardContainer: {
    width: scaleWidth(94),
    borderRadius: 8,
    marginLeft: scaleWidth(3),
    padding: scaleWidth(3),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.2,
    elevation: 5,
    backgroundColor: "white",
    marginTop: scaleHeight(2),
  },
  yourPayment: {
    fontSize: scaleWidth(4),
    color: "#404040",
    marginBottom: scaleHeight(1),
    marginLeft: scaleWidth(3),
  },

  button_submit: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: scaleHeight(3),
  },
});

export default styles;
