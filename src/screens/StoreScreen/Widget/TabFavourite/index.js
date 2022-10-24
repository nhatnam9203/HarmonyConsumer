import React from "react";
import { StyleSheet, View, FlatList } from "react-native";

import { ItemCard, Text, ItemCardPlaceHolder } from "components";
import { scaleSize } from "utils";
import { useDispatch, useSelector } from "react-redux";
import actions from "@redux/actions";
import * as RootNavigation from "navigations/RootNavigation";

export default function index({ data, isAddGiftCard }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.datalocalReducer.token);
  const gift_send = useSelector(state => state.buygiftReducer.gift_send);

  const navigateToStoreDetail = (item) => {
    dispatch(actions.storeAction.setDetailMerchant(item));
    dispatch(actions.storeAction.getDetailMerchant(item.merchantId, token));

    RootNavigation.navigate("BookAppointmentStack", {
      screen: "StoreDetail",
      params: { merchantId: item.merchantId },
    });
    dispatch(actions.bookingAction.resetBooking());
  };

  const onSelectStore = (item) => {
    let _gift_send = Object.assign({}, gift_send, {
      merchantId: item?.merchantId,
      merchantName: item?.businessName,
    });

    dispatch(actions.buygiftAction.set_gift_send(_gift_send));
    RootNavigation.navigate("Main", {
      screen: "BuyGift",
      params: { merchant: item },
    });
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerFlatList}
        keyExtractor={(_, i) => i + ""}
        data={data}
        renderItem={({ item, index }) => {
          return (
            <React.Fragment>
              {item.merchantId ? (
                <ItemCard
                  key={index + ""}
                  width={scaleSize(382)}
                  height={scaleSize(260)}
                  borderRadius={5}
                  item={item}
                  onPress={isAddGiftCard ? onSelectStore : navigateToStoreDetail}
                  style={{ marginVertical: scaleSize(15) }}
                />
              ) : (
                <ItemCardPlaceHolder
                  key={index + ""}
                  width={scaleSize(382)}
                  height={scaleSize(260)}
                  borderRadius={5}
                />
              )}
            </React.Fragment>
          );
        }}
        ListHeaderComponent={HeaderList}
        ItemSeparatorComponent={Seperator}
        ListEmptyComponent={ListEmptyComponent}
      />
    </View>
  );
}

const Seperator = () => <View style={styles.seperator} />;
const HeaderList = () => (
  <View style={styles.container_title}>
    <Text fontFamily="medium" fontSize={20} style={styles.title}>
      Your favourites
    </Text>
  </View>
);
const ListEmptyComponent = () => <Text fontSize={15}>List is empty</Text>;

const styles = StyleSheet.create({
  seperator: {
    width: "100%",
    height: scaleSize(20),
  },
  contentContainerFlatList: {
    alignItems: "center",
    paddingVertical: scaleSize(20),
  },
  title: {
    // fontWeight: "700",
    color: "#404040",
  },
  container_title: {
    justifyContent: "center",
    width: scaleSize(382),
    marginBottom: scaleSize(20),
  },
});
