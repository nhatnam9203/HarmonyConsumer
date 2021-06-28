import React from "react";
import { View, StyleSheet } from "react-native";
import Image from "react-native-fast-image";
import { Card, Text, Button } from "components";
import ICONS from "assets";
import styles from "../styles";
import Configs from "configs";
import { scaleSize } from "utils";
const { CARD_WIDTH } = Configs;
const GiftCardActive = (props) => {
  const { onPress } = props;
  const TextApp = (
    <Text
      fontSize={15}
      color="#0764B0"
      style={{
        fontWeight: "500",
      }}>
      HarmonyPay
    </Text>
  );
  const TextMoney = (
    <Text
      fontSize={15}
      color="#2EBE03"
      style={{
        fontWeight: "500",
      }}>
      200 HP point
    </Text>
  );
  return (
    <Card width={CARD_WIDTH} height={234} borderRadius={6} style={styles.card}>
      <Text
        fontSize={15}
        color="#3C3C3C"
        style={{
          fontWeight: "500",
        }}>
        Welcome to {TextApp} ! Please add payment to earn {TextMoney}. This point can be used when
        paying the bills.
      </Text>
      <View style={stylesGiftCard.content}>
        <Image source={ICONS["card_active"]} style={stylesGiftCard.image} />
        <Button onPress={onPress} style={stylesGiftCard.button_active}>
          <Text
            color="#0764B0"
            style={{
              fontWeight: "bold",
            }}
            fontSize={20}>
            Activate Now
          </Text>
        </Button>
      </View>
    </Card>
  );
};
const stylesGiftCard = StyleSheet.create({
  button_active: {
    alignSelf: "flex-end",
  },
  content: {
    width: "100%",
    marginTop: scaleSize(25),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    width: scaleSize(149.86),
    height: scaleSize(120),
  },
});
export default GiftCardActive;
