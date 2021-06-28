import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { Text, LazyImage, ProgressiveImage } from "components";
import { scaleHeight, scaleWidth } from "utils";
import images from "assets";

export default function Product({ sv, renderImg }) {
  const price = parseFloat(parseFloat(sv.price) * sv.quantity).toFixed(2);

  return (
    <View style={styles.containerItem}>
      <ProgressiveImage
        thumbnailSource={images["service_holder"]}
        source={renderImg}
        style={styles.imgService}
      />
      <View style={{ marginLeft: scaleWidth(3) }}>
        <Text numberOfLines={1} ellipsizeMode={"tail"} style={styles.name}>
          {`${sv.productName}`}
        </Text>

        <View style={styles.row}>
          <Text fontFamily="medium" style={styles.txtQty}>
            {sv.quantity} item(s)
          </Text>
          <Text style={[styles.txtDuration, { fontWeight: "bold" }]}>{`$ ${price}`}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imgService: {
    width: scaleWidth(18),
    height: scaleWidth(18),
    borderRadius: 5,
  },
  name: {
    fontSize: scaleWidth(4.5),
    fontWeight: Platform.OS === "android" ? "bold" : "600",
    color: "#0764B0",
    width: scaleWidth(72),
  },
  txtDuration: {
    fontSize: scaleWidth(3.7),
    color: "#585858",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: scaleWidth(7),
    width: scaleWidth(74),
  },
  containerItem: {
    flexDirection: "row",
    marginTop: scaleHeight(0.4),
    paddingBottom: scaleHeight(1),
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    marginTop: scaleHeight(1.2),
  },
  rowButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  btnQty: (quantity, status) => {
    return {
      width: scaleWidth(10),
      height: scaleWidth(5),
      justifyContent: "center",
      alignItems: "center",
      backgroundColor:
        quantity > 1 && status !== "cancel" && status !== "paid" ? "#0764B0" : "#E5E5E5",
    };
  },
  txtBtnQty: (quantity, status) => {
    return {
      color: quantity > 1 && status !== "cancel" && status !== "paid" ? "white" : "#333",
      fontSize: scaleWidth(3.7),
      fontWeight: "bold",
    };
  },
  txtQty: {
    fontSize: scaleWidth(3.8),
  },
});
