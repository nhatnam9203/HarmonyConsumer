import React from "react";
import { View, Image, StyleSheet, Platform } from "react-native";
import images from "assets";
import { scaleWidth } from "utils";
import moment from "moment";
import { Text } from "components";

const Item = ({ item, isUsed }) => {
  const point = isUsed ? `${item.point} points` : `+${item.point} points`;
  return (
    <View style={styles.item}>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.wrapLogo}>
          <Image
            style={styles.imgLogo}
            source={isUsed ? images.icon_money_pocket : images.logoHarmony2}
          />
        </View>
        <View style={styles.row}>
          <Text>
            <Text style={styles.txtBill}>{item.methodType}</Text>
            <Text style={styles.numberBill}>{` #${item.checkoutId}`}</Text>
          </Text>
          <Text style={styles.time}>{moment(item.createdDate).format("MMMM DD,YYYY HH:mm A")}</Text>
        </View>
      </View>
      <Text style={styles.txtPoint(isUsed)}>{point}</Text>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: scaleWidth(4),
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    paddingBottom: scaleWidth(4),
  },
  imgLogo: {
    width: scaleWidth(8.5),
    height: scaleWidth(8.5),
  },
  wrapLogo: {
    padding: scaleWidth(2),
    borderRadius: scaleWidth(30),
    borderWidth: 1,
    borderColor: "#dddddd",
  },
  txtBill: {
    color: "#333",
    fontSize: scaleWidth(4.3),
    fontWeight: "600",
  },
  numberBill: {
    fontSize: scaleWidth(4),
    fontWeight: Platform.OS === "android" ? "bold" : "600",
    color: "#1172C1",
  },
  time: {
    color: "#888888",
    fontSize: scaleWidth(3.4),
  },
  row: {
    justifyContent: "space-between",
    paddingVertical: scaleWidth(0.3),
    marginLeft: scaleWidth(3),
  },
  txtPoint: (isUsed) => {
    return {
      color: isUsed ? "#ED1C24" : "#2EBE03",
      fontSize: scaleWidth(3.7),
      fontWeight: Platform.OS === "android" ? "bold" : "600",
    };
  },
});
