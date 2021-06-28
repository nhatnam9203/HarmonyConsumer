import React from "react";
import { StyleSheet, View, Image } from "react-native";

import { Text } from "components";
import { scaleSize, formatMoney } from "utils";
import ICONS from "assets";
export default function TotalInfo({ subTotal, tax, total, discount }) {
  return (
    <View style={styles.container}>
      <Info title="Grand Total" amount={total} color="#0764b0" />

      <Info title="Subtotal" amount={subTotal} />

      <Info title="Tax" amount={tax} />

      <Info title="Discount" amount={discount} />
    </View>
  );
}

const Info = ({ title, subTitle, amount, color = "#404040" }) => {
  return (
    <View style={styles.content}>
      <Text fontSize={17} fontFamily="medium" color={color}>
        {title}
        {subTitle && <Text fontSize={17}>{subTitle}</Text>}
      </Text>
      <Text fontSize={17} fontFamily="medium" color={color}>
        $ {formatMoney(amount)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: scaleSize(382),
    marginTop: scaleSize(20),
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#0764b0",
  },
  content: {
    width: scaleSize(382),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: scaleSize(20),
  },
});
