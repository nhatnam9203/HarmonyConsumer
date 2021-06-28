import React from "react";
import { StyleSheet, Animated, View } from "react-native";
import { Marker } from "react-native-maps";

import ICONS from "assets";
import { scaleSize } from "utils";
import { Text } from "components";

export default function MarkerCustom({ coordinate, onPress, style, rating, showBadget }) {
  return (
    <Marker coordinate={coordinate} onPress={onPress}>
      <Animated.View style={[styles.markerWrap]}>
        <Animated.Image
          source={ICONS["baseline_place"]}
          resizeMode="contain"
          style={[styles.marker, style]}></Animated.Image>
        {showBadget && <Badget value={rating} />}
      </Animated.View>
    </Marker>
  );
}

const Badget = ({ value }) => {
  return (
    <View style={styles.container_badget}>
      <View style={styles.sub_badget}>
        <Text fontSize={8} color="#FFFF80" style={{ fontWeight: "bold" }}>
          {value}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: scaleSize(60),
    height: scaleSize(60),
  },
  marker: {
    width: scaleSize(30),
    height: scaleSize(30),
  },
  container_badget: {
    width: scaleSize(25),
    height: scaleSize(25),
    borderRadius: scaleSize(25),
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    right: scaleSize(5),
    backgroundColor: "#FFF",
  },
  sub_badget: {
    width: scaleSize(20),
    height: scaleSize(20),
    borderRadius: scaleSize(20),
    backgroundColor: "#0764B0",
    justifyContent: "center",
    alignItems: "center",
  },
});
