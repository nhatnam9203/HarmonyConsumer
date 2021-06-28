import React from "react";
import { StyleSheet, View, TextInput, Image } from "react-native";

import { scaleSize } from "utils";
import { Button, ModalSearchLocation } from "components";
import ICONS from "assets";

export default function InputLocation({
  width = 382,
  height = 42,
  value,
  isVisible,
  onRequestClose,
  onPickupLocation,
  onCancel,
  ...props
}) {
  return (
    <>
      <View
        style={[
          {
            width: scaleSize(width),
          },
          styles.wrapper,
        ]}>
        <Image style={styles.icon_search} source={ICONS["location_search"]} />

        <TextInput style={styles.text_input} value={value} {...props} />

        <Button onPress={onCancel}>
          <Image style={styles.icon_close} source={ICONS["baseline_cancel"]} />
        </Button>
      </View>

      <ModalSearchLocation
        isVisible={isVisible}
        onRequestClose={onRequestClose}
        onSelected={onPickupLocation}
      />
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    marginTop: scaleSize(20),
    paddingHorizontal: scaleSize(10),
    paddingVertical: scaleSize(8),
    borderWidth: 1,
    borderRadius: scaleSize(5),
    borderColor: "#DDDDDD",
    alignItems: "center",
    backgroundColor: "white",
  },
  icon_search: {
    width: scaleSize(20),
    height: scaleSize(20),
    resizeMode: "contain",
    tintColor: "#333",
  },
  icon_close: {
    width: scaleSize(24),
    height: scaleSize(24),
    resizeMode: "contain",
  },
  text_input: {
    fontSize: scaleSize(17),
    paddingVertical: 2,
    zIndex: 1,
    flex: 1,
    paddingLeft: scaleSize(10),
    color: "#0764B0",
  },
});
