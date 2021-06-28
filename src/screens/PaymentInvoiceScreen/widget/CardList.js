import React from "react";
import { StyleSheet, View, Image } from "react-native";

import { Text, Button } from "components";
import { scaleSize } from "utils";
import ICONS from "assets";
import Item from "./Item";
import { FormatPrice } from "../../../utils";

export default function CardList({ data, onSelectCard, onReloadCard, onAddCard, card, amount }) {
  const onHandleChangeValue = (item) => () => {
    const price = FormatPrice(item.amount);
    let active_reload = FormatPrice(amount) > FormatPrice(item.amount) ? true : false;
    if (active_reload) {
      alert(`Your card doesn't have enough money!`);
    } else {
      onSelectCard(item);
    }
  };
  return (
    <View style={styles.container}>
      <Text fontSize={17} fontFamily="bold">
        Select the way to pay
      </Text>
      <List
        data={data}
        onSelectCard={onHandleChangeValue}
        card={card}
        onRloadCard={onReloadCard}
        amount={amount}
      />
      <FooterList onAddCard={onAddCard} />
    </View>
  );
}

const List = ({ data, onSelectCard, onRloadCard, card, amount }) => {
  return data.map((item, index) => {
    let card_selected = item == card;
    let active_reload = FormatPrice(amount) > FormatPrice(item.amount) ? true : false;
    return (
      <Item
        key={index + ""}
        item={item}
        onPress={onSelectCard}
        activeCard={card_selected}
        activeReload={active_reload}
        onReloadCard={onRloadCard}
      />
    );
  });
};

const FooterList = ({ onAddCard }) => {
  return (
    <Button onPress={onAddCard} style={styles.button_add}>
      <Image source={ICONS["add_payment"]} style={styles.icon_add} />
      <Text fontSize={17} color="#0764B0">
        Add a card
      </Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: scaleSize(20),
    flex: 1,
    width: scaleSize(382),
    padding: scaleSize(16),
    backgroundColor: "#f8f8f8",
  },
  header: {
    width: scaleSize(382),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  icons: {
    width: scaleSize(18),
    height: scaleSize(18),
    resizeMode: "contain",
  },

  content_text: {
    width: scaleSize(290),
    height: scaleSize(80),
    justifyContent: "space-between",
  },
  icon_add: {
    width: scaleSize(25),
    height: scaleSize(25),
    marginRight: scaleSize(16),
  },
  button_add: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: scaleSize(20),
  },
});
