import React from "react";
import { View, StyleSheet } from "react-native";
import { Placeholder, PlaceholderMedia, PlaceholderLine, ShineOverlay } from "rn-placeholder";
import { scaleHeight, scaleWidth } from "utils";

export default function PlaceHolder(index) {
  return (
    <View style={styles.container}>
      <Placeholder Animation={ShineOverlay}>
        {new Array(10).fill().map(() => (
          <ItemHolder key={Math.random()} />
        ))}
      </Placeholder>
    </View>
  );
}

const ItemHolder = () => {
  return (
    <View style={styles.item}>
      <View style={styles.wrapInfo}>
        <Placeholder Animation={ShineOverlay}>
          <PlaceholderLine width={20} />
        </Placeholder>

        <Placeholder Animation={ShineOverlay} Left={PlaceholderMedia}>
          <PlaceholderLine width={35} />
          <PlaceholderLine width={50} />
        </Placeholder>
      </View>
      <View style={styles.bottom}>
        <Placeholder Animation={ShineOverlay}>
          <PlaceholderLine height={13.5} width={70} />
        </Placeholder>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: scaleWidth(3),
    paddingTop: 0,
  },
  item: {
    borderWidth: 1,
    borderColor: "#eeeeee",
    borderRadius: 8,
    padding: scaleWidth(5),
    marginTop: scaleHeight(2),
    backgroundColor: "white",
  },
  wrapInfo: {
    marginTop: scaleHeight(2),
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
    paddingBottom: scaleWidth(3),
  },
  bottom: {
    marginTop: scaleWidth(3),
  },
});
