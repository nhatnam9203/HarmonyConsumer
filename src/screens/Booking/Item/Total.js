import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { Text } from "components";
import {} from "utils";
import { scaleWidth, scaleHeight } from "utils";
import { totalPriceProduct, totalPriceService, totalDuration } from "./helper";

export default function Total(props) {
  const { services, qty, tempExtras } = props;
  let servicesArr = new Array(services);
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Text fontFamily="medium" style={styles.txt}>
          Total:
        </Text>
        {services.duration && (
          <Text fontFamily="medium" style={[styles.txt, { marginLeft: scaleWidth(12) }]}>
            {totalDuration(servicesArr, tempExtras)} min
          </Text>
        )}
        {!services.duration && <Text style={[styles.txt, { marginLeft: scaleWidth(12) }]}> </Text>}
      </View>

      {services.productId && (
        <Text fontFamily="medium" style={styles.txt}>
          $ {totalPriceProduct(services, qty)}
        </Text>
      )}
      {services.serviceId && (
        <Text fontFamily="medium" style={styles.txt}>
          $ {totalPriceService(services, tempExtras)}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: scaleWidth(3),
    marginTop: scaleHeight(4),
  },
  txt: {
    color: "#404040",
    fontSize: scaleWidth(4.7),
  },
});
