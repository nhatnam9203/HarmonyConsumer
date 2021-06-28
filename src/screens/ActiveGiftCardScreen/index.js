import React from "react";
import { ImageBackground, View, Image } from "react-native";
import { useDispatch } from "react-redux";

import actions from "@redux/actions";
import ICONS from "assets";
import { Text, Button, Header, StatusBar } from "components";
import * as RootNavigation from "navigations/RootNavigation";
import styles from "./style";
const creditCards = [
  { type: "Visa", url: ICONS["visa_inactive"] },
  { type: "Mastercard", url: ICONS["mastercard_inactive"] },
  { type: "American Express", url: ICONS["am_inactive"] },
  { type: "JCB", url: ICONS["jcb_inactive"] },
];
export default function index(props) {
  const dispatch = useDispatch();
  const onBack = () => {
    RootNavigation.back();
  };
  const addPayment = () => {
    dispatch(actions.creditAndBankAction.is_first_card(true));
    RootNavigation.navigate("AddPayment");
  };
  return (
    <View style={styles.containerRoot}>
      <View style={{ backgroundColor: "#f8f8f8" }}>
        <StatusBar />
        <Header title="Activate gift card" headerLeft={true} onBack={onBack} />
      </View>
      <View style={styles.container_center}>
        <ImageBackground source={ICONS["primary_card"]} style={styles.container_giftcard}>
          <View style={styles.container_price_giftcard}>
            <Text fontSize={18} style={{ fontWeight: "bold" }} color="#2EBE03">
              $ 5.00
            </Text>
          </View>
        </ImageBackground>

        <View style={styles.space}>
          <Text fontSize={15} style={{ lineHeight: 25 }}>
            Add payment to activate your $5 gift-card.HarmonyPay can be use anywhere accepting
            HarmonyPay.
          </Text>
        </View>

        <View style={styles.container_creditcard}>
          {creditCards.map((item, index) => {
            return <Image key={index + ""} source={item.url} style={styles.image_creditcard} />;
          })}
        </View>

        <Button onPress={addPayment} style={styles.button_submit}>
          <Image source={ICONS["unlock"]} style={[styles.image_button]} />
          <Text fontSize={17} style={{ fontWeight: "500" }} color="#FFF">
            Add payment
          </Text>
          <View style={styles.image_creditcard} />
        </Button>
      </View>
    </View>
  );
}
