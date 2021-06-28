import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import { CheckBox, Text, ProgressiveImage } from "components";
import { scaleSize, getImageCard } from "utils";
import Image from "react-native-fast-image";

export default function bankCard({ item, onPress, isSelected }) {
  const { accountHolderName, cardNumber } = item;
  const checked = isSelected == item ? true : false;

  const onHandleChangeValue = () => {
    onPress(item);
  };

  return (
    <TouchableOpacity activeOpacity={1} onPress={onHandleChangeValue} style={styles.container}>
      <CheckBox checked={checked} onValueChange={onHandleChangeValue} />
      <Image
        backgroundColor="transparent"
        source={getImageCard("bank")}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.content_text}>
        <Text fontSize={18} fontFamily="medium" color="#585858" style={styles.text}>
          {accountHolderName}
        </Text>
        <Text fontSize={16} fontFamily="medium" color="#585858" style={styles.text}>
          **** **** **** **** {cardNumber}
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
    marginTop: 15,
  },
  image: {
    width: scaleSize(45),
    height: scaleSize(45),
    resizeMode: "contain",
    marginLeft: scaleSize(10),
    marginRight: scaleSize(10),
  },
  content_text: {
    flex: 1,
    justifyContent: "space-between",
  },
  text: {
    fontWeight: "400",
    color: "#404040",
  },
});
