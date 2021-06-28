import React from "react";
import { StyleSheet, Image, View } from "react-native";

import { CheckBox, Text, Button } from "components";
import { scaleSize, FormatPrice } from "utils";
import ICONS from "assets";

export default function Item({ item, onPress, onReloadCard, activeCard, activeReload }) {
  const { imageUrl, amount, userCardId } = item;
  return (
    <View style={styles.container}>
      <CheckBox checked={activeCard} onValueChange={onPress(item)} />
      <Image source={{ uri: imageUrl }} style={styles.image} />

      <View style={styles.content_text}>
        <Text fontSize={12} color="#888888">
          My card - {userCardId}
        </Text>

        <Text fontSize={15} fontFamily="bold">
          $ {FormatPrice(amount).toFixed(2)}
        </Text>
      </View>

      {activeReload && (
        <Button onPress={onReloadCard(item)} style={styles.container_reload}>
          <Image source={ICONS["reload"]} style={styles.icon_reload} />
          <Text fontSize={15} color="#585858" fontFamily="medium">
            Reload
          </Text>
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: scaleSize(60),
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: scaleSize(48),
    height: scaleSize(28),
    resizeMode: "contain",
    marginLeft: scaleSize(15),
    marginRight: scaleSize(20),
  },
  content_text: {
    flex: 1,
    justifyContent: "space-between",
    height: scaleSize(36),
  },

  container_reload: {
    flex: 1,
    flexDirection: "row",
    height: scaleSize(30),
    justifyContent: "flex-end",
    alignItems: "center",
  },
  icon_reload: {
    tintColor: "#585858",
    width: scaleSize(18),
    height: scaleSize(18),
    resizeMode: "contain",
    marginRight: scaleSize(10),
  },
});
