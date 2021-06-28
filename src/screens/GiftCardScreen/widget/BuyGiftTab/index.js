import React from "react";
import { View, FlatList } from "react-native";

import { buygifts } from "mocks";
import { Text } from "components";
import { scaleSize } from "utils";
import styles from "../../style";
import Item_buygift from "./item_buygift";
import Custom_template from "./custom_template";

export default function index({ onNextScreen }) {
  const goToDetail = (item) => onNextScreen(item);

  const ListFooterComponent = () => <Custom_template onPress={goToDetail} />;

  return (
    <FlatList
      contentContainerStyle={styles.content_flatlist}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={ListEmptyComponent}
      // ListFooterComponent={ListFooterComponent}
      ItemSeparatorComponent={ItemSeparatorComponent}
      data={buygifts}
      keyExtractor={(_, index) => index + ""}
      renderItem={({ item, index }) => <Item_buygift item={item} onPress={goToDetail} />}
    />
  );
}

const ItemSeparatorComponent = () => <View style={[styles.seperator, { height: scaleSize(25) }]} />;

const ListEmptyComponent = () => (
  <View style={{ flex: 1 }}>
    <Text fontSize={15} color="#646464">
      List is empty
    </Text>
  </View>
);

const ListHeaderComponent = () => (
  <View style={{ flex: 1 }}>
    <Text fontSize={17.5} color="#404040" style={{ marginBottom: scaleSize(15) }}>
      Select Gift card template
    </Text>
  </View>
);
