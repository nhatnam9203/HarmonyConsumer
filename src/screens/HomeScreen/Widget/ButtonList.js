import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Card, Text, Button, Badge } from "components";
import ICONS from "assets";
import { scaleSize } from "utils";
import Configs from "../../../configs";
const { CARD_WIDTH } = Configs;
const ButtonList = ({ onBooking, onPaynow, invoice }) => {
  return (
    <View style={styleButtonList.container}>
      <Button onPress={onBooking} hitSlop={{ top: 0, left: 0, right: 0, bottom: 0 }}>
        <Card
          width={CARD_WIDTH / 2 - 10}
          height={scaleSize(70)}
          borderRadius={6}
          style={styleButtonList.card}>
          <Image style={styleButtonList.icon} source={ICONS["booking_button"]} />
          <Text fontSize={12} color="#0764B0">
            Booking
          </Text>
        </Card>
      </Button>

      <Button hitSlop={{ top: 0, left: 0, right: 0, bottom: 0 }} onPress={onPaynow}>
        <Card
          width={CARD_WIDTH / 2 - 10}
          height={scaleSize(70)}
          borderRadius={6}
          style={styleButtonList.card}>
          <Image style={styleButtonList.icon} source={ICONS["paynow_button"]} />
          <Text color="#0764B0" fontSize={12}>
            Pay now
          </Text>

          {invoice > 0 && (
            <Badge
              title={invoice}
              backgroundColor="red"
              width={20}
              height={20}
              style={styleButtonList.badge}
            />
          )}
        </Card>
      </Button>
    </View>
  );
};
const styleButtonList = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: scaleSize(70),
    top: -scaleSize(60),
  },
  card: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: scaleSize(10),
  },
  icon: {
    width: scaleSize(30),
    height: scaleSize(30),
  },
  badge: {
    position: "absolute",
    top: scaleSize(10),
    right: scaleSize(10),
  },
});
export default ButtonList;
