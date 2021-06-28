import React, { useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { TextInputMask } from "react-native-masked-text";

// import * as Animatable from 'react-native-animatable';

import ICONS from "assets";
import { scaleSize } from "utils";
import { Button } from "components";

export default function index({ value, onChangeText }) {
  const handleChangeText = (value) => onChangeText(value);

  return (
    <View style={styles.container_amount}>
      <TextInputMask
        type="money"
        options={{
          unit: "$ ",
          precision: 2,
          separator: ".",
        }}
        style={styles.text_input}
        value={value}
        onChangeText={handleChangeText}
        keyboardType="numeric"
        inputAccessoryViewID={"uniqueId"}
      />

      <Button style={styles.container_btn_close}>
        <Image source={ICONS["baseline_cancel"]} style={styles.icon_close} />
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container_amount: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: scaleSize(20),
    width: "100%",
    borderRadius: scaleSize(5),
    height: scaleSize(45),
    borderWidth: 1,
    borderColor: "#DDDDDD",
  },

  container_btn_close: {
    position: "absolute",
    right: 0,
  },

  icon_close: {
    width: scaleSize(25),
    height: scaleSize(25),
    resizeMode: "contain",
  },

  button_close: {
    alignSelf: "flex-end",
  },
  text_input: {
    fontWeight: "500",
    width: "100%",
    height: "100%",
    textAlign: "center",
    fontSize: scaleSize(15),
  },
});
