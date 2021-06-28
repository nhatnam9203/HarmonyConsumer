import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import { CheckBox, Text } from "components";
import { scaleSize, getImageCard } from "utils";
import Image from "react-native-fast-image";

export default function creditCard({ item, onPress, isSelected }) {
  const { cardholderName, cardNumber, type } = item;
  const checked = isSelected == item ? true : false;

  const onHandleChangeValue = () => {
    onPress(item);
  };

  return (
    <TouchableOpacity activeOpacity={1} onPress={onHandleChangeValue} style={styles.container}>
      <CheckBox checked={checked} onValueChange={onHandleChangeValue} />
      <Image resizeMode="contain" source={getImageCard(type)} style={styles.image} />

      <View style={styles.content_text}>
        <Text fontSize={18} fontFamily="medium" color="#585858" style={styles.text}>
          **** **** **** **** {cardNumber}
        </Text>

        <Text fontSize={15} fontFamily="medium" color="#585858" style={styles.text}>
          {cardholderName}
        </Text>
      </View>
    </TouchableOpacity>
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
    width: scaleSize(43),
    height: scaleSize(47),
    // resizeMode: "contain",
    marginLeft: scaleSize(15),
    marginRight: scaleSize(20),
  },
  content_text: {
    flex: 1,
    justifyContent: "space-between",
  },
  text: {
    fontWeight: "400",
    fontSize: scaleSize(17),
    color: "#404040",
  },
});
