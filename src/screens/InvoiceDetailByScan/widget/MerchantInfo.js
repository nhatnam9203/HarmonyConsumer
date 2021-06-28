import React from "react";
import { StyleSheet, View, Image } from "react-native";

import { Text } from "components";
import { scaleSize } from "utils";
import ICONS from "assets";
export default function MerchantInfo({ data }) {
  const { businessName, addressFull } = data;
  return (
    <View style={styles.container}>
      <Image source={ICONS["store_screen"]} style={styles.image} />

      <View style={styles.content_text}>
        <Text fontSize={23} fontFamily="bold">
          {businessName}
        </Text>

        <View style={{ flexDirection: "row" }}>
          <Image source={ICONS["geo_blue"]} style={styles.icon} />
          <Text fontSize={15}>{addressFull}</Text>
        </View>
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
    marginTop: scaleSize(20),
  },
  image: {
    width: scaleSize(80),
    height: scaleSize(80),
    borderRadius: scaleSize(5),
    borderWidth: 1,
    borderColor: "#0764b0",
  },

  icon: {
    width: scaleSize(15),
    height: scaleSize(15),
    resizeMode: "contain",
    tintColor: "black",
    marginRight: scaleSize(5),
  },

  content_text: {
    width: scaleSize(290),
    height: scaleSize(80),
    justifyContent: "space-between",
  },
});
