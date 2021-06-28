import React from "react";
import { StyleSheet, View, TextInput, Image, TouchableOpacity, Text } from "react-native";
import PropTypes from "prop-types";

import { scaleSize } from "utils";
import { Button } from "components";
import ICONS from "assets";

export default function SearchBar({
  width,
  height,
  iconLeft,
  iconRight,
  value,
  onChangeText,
  onPressRight,
  onPressSearchList,
  isEditSelectCredit = 1,
  ...props
}) {
  return (
    <View
      style={[
        {
          width: scaleSize(width),
          height: scaleSize(height),
          backgroundColor: "white",
          opacity: isEditSelectCredit == 0 ? 1 : 0.5,
        },
        styles.wrapper,
      ]}>
      {iconRight && (
        <Button
          onPress={onPressSearchList ? onPressSearchList : onPressRight}
          style={{ marginRight: scaleSize(5) }}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Image style={styles.icon_search} source={iconRight} />
        </Button>
      )}

      {!onPressSearchList && (
        <TextInput
          style={{ fontSize: scaleSize(15), flex: 1, paddingVertical: scaleSize(0.5) }}
          value={value}
          onChangeText={onChangeText}
          {...props}
        />
      )}
      {onPressSearchList && (
        <TouchableOpacity onPress={onPressSearchList} style={{ flex: 1 }}>
          <Text style={{ fontSize: scaleSize(15), color: "#404040" }}>Search...</Text>
        </TouchableOpacity>
      )}

      {iconLeft && <Image style={styles.icon_search} source={iconLeft} />}
    </View>
  );
}

SearchBar.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};
SearchBar.defaultProps = {
  width: 300,
  height: 36,
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    paddingHorizontal: scaleSize(10),
    paddingVertical: scaleSize(8),
    borderWidth: 1,
    borderRadius: scaleSize(5),
    borderColor: "#DDDDDD",
    alignItems: "center",
  },
  icon_search: {
    width: scaleSize(20),
    height: scaleSize(20),
    resizeMode: "contain",
  },
});
