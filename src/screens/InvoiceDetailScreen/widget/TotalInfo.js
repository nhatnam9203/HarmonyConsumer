import React from "react";
import { StyleSheet, View, Image } from "react-native";

import { Text } from "components";
import { scaleSize } from "utils";
import ICONS from "assets";
export default function TotalInfo({ dueAmount, paidAmount, total, checkoutPayments }) {
  const chargeAmount = dueAmount ? (+dueAmount > 0 ? "0.00" : dueAmount.replace("-", "")) : "0.00";
  return (
    <View style={styles.container}>
      <Info title="Grand Total" amount={total} color="#0764b0" />
      <PaidInfo paidAmount={paidAmount} checkoutPayments={checkoutPayments} />

      <Info title="Amount due" amount={dueAmount} />

      <Info title="Charge amount" amount={chargeAmount} color="#ff3b30" />
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
        $ {amount}
      </Text>
    </View>
  );
};

const PaidInfo = ({ checkoutPayments, paidAmount }) => {
  if (checkoutPayments && checkoutPayments.length != 0) {
    return checkoutPayments.map((item, index) => (
      <Info
        key={index + ""}
        title="Paid"
        subTitle={` (${item.paymentMethod})`}
        amount={item.amount}
      />
    ));
  }
  return null;
  // return <Info title="Paid" subTitle=" (Cash)" amount={paidAmount} />;
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
