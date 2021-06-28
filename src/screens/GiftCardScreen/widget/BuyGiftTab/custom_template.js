import React from "react";
import { View, StyleSheet } from "react-native";

import { Text, Button, ProgressiveImage } from "components";
import { scaleSize } from "utils";
import ICONS from "assets";

export default function CustomTemplate({ onPress }) {
  const onHandleOnPress = () => {
    let item = {};
    item["type"] = "template_custom";
    onPress(item);
  };

  return (
    <Button style={styles.template} onPress={onHandleOnPress}>
      <View style={styles.sub_template}>
        <ProgressiveImage style={styles.icon} source={ICONS["camera_picker"]} />
        <Text fontSize={8} style={{ marginTop: scaleSize(5) }}>
          Upload your photo
        </Text>
      </View>
    </Button>
  );
}

const styles = StyleSheet.create({
  template: {
    width: scaleSize(186),
    height: scaleSize(113),
    backgroundColor: "#F6F6F6",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.84,
    elevation: 1,
    top: 5,
  },
  sub_template: {
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    width: scaleSize(143),
    height: scaleSize(60),
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#C5C5C5",
    borderRadius: scaleSize(1),
  },
  icon: {
    width: scaleSize(31),
    height: scaleSize(24),
    resizeMode: "contain",
  },
});
