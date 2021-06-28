import React from "react";
import { StyleSheet, View } from "react-native";

import { Text } from "components";
import { scaleSize } from "utils";
import { isEmpty } from "lodash";

export default function Item({ name, amount, duration, quantity }) {
  return (
    <View style={styles.container}>
      <Text style={styles.name} fontSize={15} color="#585858">
        {name}
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: scaleSize(160),
        }}>
        {duration !== undefined && (
          <Text fontSize={15} color="#585858">
            {duration} min
          </Text>
        )}

        {quantity && (
          <Text fontSize={15} color="#585858">
            {quantity} item
          </Text>
        )}

        <Text fontSize={15} color="#585858">
          $ {amount}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: scaleSize(382),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: scaleSize(16),
  },
  name: {
    width: scaleSize(180),
  },
});
