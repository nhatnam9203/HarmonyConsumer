import React from "react";
import { StyleSheet, View, Image } from "react-native";

import { Text } from "components";
import { scaleSize } from "utils";

export default function ItemGift({ name, amount, quantity, imageUrl }) {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <Text style={styles.textName}>{name}</Text>
      </View>

      <View style={styles.content_right}>
        {quantity && (
          <Text fontSize={15} color="#585858">
            {quantity}
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
  content_right: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: scaleSize(160),
  },
  image: {
    width: scaleSize(30),
    height: scaleSize(25),
    marginRight: scaleSize(10),
  },
});
