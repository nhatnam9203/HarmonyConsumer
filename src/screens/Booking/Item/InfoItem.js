import React from "react";
import { View, StyleSheet, Platform, TouchableOpacity } from "react-native";
import { scaleWidth, scaleHeight } from "utils";
import { Text } from "components";

export default function InfoItem(props) {
  const { item, plusQty, minusQty, qty } = props;
  const { name = "", price = "", duration = "", description } = item;
  return (
    <React.Fragment>
      <View style={styles.rowTitle}>
        <Name name={name ? name : item.serviceName} />

        <View style={styles.wrapBottom}>
          <Price price={price} />
          <Duration duration={duration} />
        </View>
      </View>
      <Description description={description} />
      <View style={styles.line} />
      <QuantityProduct item={item} qty={qty} minusQty={minusQty} plusQty={plusQty} />
    </React.Fragment>
  );
}

const Name = ({ name }) => <Text fontFamily="medium" style={styles.title}>{`${name}`}</Text>;

const Description = ({ description }) => <Text style={styles.description}>{`${description}`}</Text>;

const Duration = ({ duration }) => {
  if (duration !== "") {
    return <Text style={styles.duration}>{`${duration} min`}</Text>;
  }
  return null;
};

const Price = ({ price }) => <Text fontFamily="medium" style={styles.price}>{`$ ${price}`}</Text>;

const QuantityProduct = ({ item, qty, minusQty, plusQty }) => {
  if (item.productId) {
    return (
      <View style={styles.rowQty}>
        <Text style={styles.txtItem}>Items:</Text>

        <TouchableOpacity
          disabled={qty <= 1}
          onPress={minusQty}
          style={[styles.btnQty, { backgroundColor: qty > 1 ? "#1467AE" : "#E5E5E5" }]}>
          <Text style={[styles.txtBtnQty, { color: qty > 1 ? "white" : "#404040" }]}>-</Text>
        </TouchableOpacity>

        <Text style={styles.txtQty}>{`${qty}`}</Text>

        <TouchableOpacity onPress={plusQty} style={styles.btnQty}>
          <Text style={styles.txtBtnQty}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  body: {
    padding: scaleWidth(3),
  },
  image: {
    width: scaleWidth(100),
    height: scaleHeight(25),
  },
  rowTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: scaleWidth(5.5),
    color: "#0764B0",
    width: scaleWidth(70),
  },
  price: {
    fontSize: scaleWidth(4.5),
    color: "#404040",
  },
  duration: {
    fontSize: scaleWidth(4.2),
    color: "#585858",
    marginTop: scaleHeight(1.2),
  },
  description: {
    fontSize: scaleWidth(4.2),
    color: "#585858",
    marginTop: scaleHeight(1.3),
  },
  line: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
    marginVertical: scaleHeight(2),
  },
  btnQty: {
    padding: scaleWidth(4),
    paddingVertical: scaleWidth(1),
    backgroundColor: "#1467AE",
  },
  txtBtnQty: {
    fontSize: scaleWidth(3.8),
    fontWeight: "600",
    color: "white",
  },
  txtQty: {
    fontSize: scaleWidth(3.8),
    marginHorizontal: scaleWidth(3.5),
    fontWeight: "bold",
    color: "#404040",
  },
  txtItem: {
    marginRight: scaleWidth(3),
    fontSize: scaleWidth(3.8),
    color: "#585858",
  },
  rowQty: {
    flexDirection: "row",
    alignItems: "center",
  },
  containerTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: scaleHeight(5),
  },
  txtTotal: {
    color: "#404040",
    fontWeight: Platform.OS === "android" ? "bold" : "600",
    fontSize: scaleWidth(3.8),
  },
  wrapBottom: {
    alignItems: "flex-end",
  },
});
