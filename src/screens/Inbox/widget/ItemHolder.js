import React from "react";
import { View, StyleSheet } from "react-native";
import { Placeholder, PlaceholderMedia, PlaceholderLine, ShineOverlay } from "rn-placeholder";
import { scaleHeight, scaleWidth } from "utils";

export default function ItemHolder(index) {
  return (
    <View style={styles.container}>
      <Placeholder Animation={ShineOverlay} Left={PlaceholderMedia}>
        <PlaceholderLine Animation={ShineOverlay} width={70} />
        <PlaceholderLine />
        <PlaceholderLine width={30} />
      </Placeholder>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: scaleHeight(2),
    padding: scaleWidth(5),
    backgroundColor: "#FAFBFC",
    marginHorizontal: scaleWidth(3),
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "#eeeeee",
  },
});
