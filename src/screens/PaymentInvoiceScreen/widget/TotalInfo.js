import React from "react";
import { StyleSheet, View } from "react-native";

import { Text } from "components";
import { scaleSize } from "utils";
export default function TotalInfo({ tips, amount }) {
  const { total, tip, totalHasTip, subTotal } = tips;
  return (
    <View style={styles.container}>
      <Info title="Amount" amount={amount} />

      <Info title="Tip" amount={parseFloat(tip).toFixed(2)} />

      <Info title="Subtotal" amount={subTotal} borderBottomWidth={0} />
    </View>
  );
}

const Info = ({ title, amount, color = "#585858", borderBottomWidth = 1.5 }) => {
  return (
    <View style={[styles.content, { borderBottomWidth }]}>
      <Text fontSize={17} color={color}>
        {title}
      </Text>
      <Text fontSize={17} fontFamily="bold">
        $ {amount}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: scaleSize(142),
    width: scaleSize(382),
    marginTop: scaleSize(20),
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    justifyContent: "space-around",
    borderRadius: scaleSize(5),
  },
  content: {
    width: scaleSize(382),
    height: scaleSize(44),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#eeeeee",
    paddingHorizontal: scaleSize(16),
  },
});
