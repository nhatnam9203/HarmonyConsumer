import React from "react";
import { Text, View, StyleSheet, Platform } from "react-native";
import { scaleWidth, scaleHeight, formatMoney } from "utils";

export default function Item(props) {
  const { title, balance, cardName, price, time } = props;
  return (
    <View style={styles.item}>
      <View style={styles.row}>
        <Text style={styles.title}>{title}</Text>
        {parseFloat(price) < 0 && (
          <Text style={styles.price(price)}>- $ {price.toString().replace("-", "")}</Text>
        )}
        {parseFloat(price) >= 0 && (
          <Text style={styles.price(price)}>+ $ {formatMoney(price)}</Text>
        )}
      </View>
      <View style={[styles.row, { marginTop: scaleWidth(2.5) }]}>
        <Text style={styles.cardName}>{cardName}</Text>
        <Text style={styles.cardName}>Balance : $ {formatMoney(balance)}</Text>
      </View>
      <Text style={styles.time}>{time}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    marginHorizontal: scaleWidth(3),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.3,
    elevation: 2,
    backgroundColor: "white",
    padding: scaleWidth(3),
    borderRadius: 5,
    marginBottom: scaleHeight(2),
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    color: "#0764B0",
    fontSize: scaleWidth(4.2),
    fontWeight: Platform.OS === "android" ? "bold" : "600",
  },
  price: (price) => {
    return {
      color: parseFloat(price) >= 0 ? "#2EBE03" : "#ED1C24",
      fontSize: scaleWidth(4),
      fontWeight: Platform.OS === "android" ? "bold" : "600",
    };
  },
  cardName: {
    color: "#585858",
    fontSize: scaleWidth(3.7),
  },
  time: {
    color: "#A9A9A9",
    fontSize: scaleWidth(3.4),
    fontStyle: "italic",
    marginTop: scaleWidth(2.5),
    alignSelf: "flex-end",
  },
});
