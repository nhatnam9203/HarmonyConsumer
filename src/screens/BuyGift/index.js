import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import styles from './style';
import { buygifts } from "mocks";
import { Text, HeaderCustom, FocusAwareStatusBar, StatusBar } from "components";
import { scaleSize } from "utils";
import Item_buygift from "./item_buygift";
import Custom_template from "./custom_template";
export default function index(props) {

  const ListFooterComponent = () => <Custom_template onPress={goToDetail} />;
  const onCancel = () => {
    props.navigation.popToTop();
  }
  const onBack = () => {
    props.navigation.goBack();
  }

  const goToDetailTemplate = (item = {}) => {
    props.navigation.navigate('DetailTemplate', { template: item });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F8F8' }}>
    <FocusAwareStatusBar
      barStyle="dark-content"
      backgroundColor="transparent"
    />
    <StatusBar barStyle="dark-content" />
    <HeaderCustom
      title="Select template"
      headerLeft={true}
      onBack={onBack}
      onRightPress={onCancel}
      headerRight={true}
      textRight={'Cancel'}
      textRightStyle={styles.textCancel}
      colorTextRight={'red'}
    />
      <FlatList
        contentContainerStyle={styles.content_flatlist}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={ListEmptyComponent}
        // ListFooterComponent={ListFooterComponent}
        ItemSeparatorComponent={ItemSeparatorComponent}
        data={buygifts}
        keyExtractor={(_, index) => index + ""}
        renderItem={({ item, index }) => <Item_buygift item={item} onPress={goToDetailTemplate} />}
      />
    </View>
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
