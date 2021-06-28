import React, { useState } from "react";
import { View, Dimensions } from "react-native";
import styles from "./styles";
import { scaleSize } from "utils";
import ICONS from "assets";
// import { SelectStoreSpecial, SelectAmount } from "./widget";
import { Text, Button } from "components";

import * as RootNavigation from "navigations/RootNavigation";

const { width } = Dimensions.get("window");

export default function index({ item, onPress }) {
  const { name, stores } = item;

  const onHandleOnPress = (store) => () => {
    onPress(store);
  };

  const renderItem = (item, index) => {
    return (
      <Button key={index + ""} onPress={onHandleOnPress(item)}>
        <View style={styles.item_store}>
          <Text fontSize={15} style={{ fontWeight: "500" }}>
            {item.merchant_name}
          </Text>

          <Text fontSize={12}>{item.address}</Text>
        </View>
      </Button>
    );
  };

  return (
    <View style={{ width, paddingLeft: scaleSize(20) }}>
      <Text fontSize={17} color="#0764B0" style={styles.title}>
        {name}
      </Text>
      {stores.map(renderItem)}
    </View>
  );
}
