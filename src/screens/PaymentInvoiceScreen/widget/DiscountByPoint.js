import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "components";
import { scaleWidth, scaleHeight } from "utils";
export default class DiscountByPoint extends Component {
  render() {
    const { price = "" } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Discount by HP Star</Text>
        <Text style={styles.price}>{`$ ${parseFloat(price).toFixed(2)}`}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: scaleWidth(3),
    backgroundColor: "#F8F8F8",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: scaleWidth(4.1),
    color: "#404040",
  },
  price: {
    fontWeight: "bold",
    fontSize: scaleWidth(4.1),
    color: "#404040",
  },
});
