import React from "react";
import { Image, ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { setDetailMerchant } from "@redux/actions/storeAction";
import { ItemCardPlaceHolder, Text, ItemCard } from "components";
import { scaleSize } from "utils";
import ICONS from "assets";
import Configs from "configs";
import actions from "@redux/actions";

export default function MerchantList(props) {
  const dispatch = useDispatch();

  const placeholders = useSelector((state) => state.datalocalReducer.placeholders);
  const loading_store = useSelector((state) => state.storeReducer.loading_store);

  const { store_tab_home = [] } = useSelector((state) => state.storeReducer);
  const token = useSelector((state) => state.datalocalReducer.token);

  const goToStoreDetail = (merchant) => {
    const { merchantId } = merchant;
    dispatch(setDetailMerchant(merchant));
    dispatch(actions.storeAction.getDetailMerchant(merchantId, token));
    props.goToStoreDetail(merchantId);
  };

  const Headers = ({ title, icon }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: scaleSize(25),
        }}>
        <Image
          style={{
            width: scaleSize(16.5),
            height: scaleSize(16.5),
            resizeMode: "contain",
            marginRight: scaleSize(10),
            tintColor: "#585858",
          }}
          source={icon}
        />
        <Text fontFamily="medium" fontSize={17}>
          {title}
        </Text>
      </View>
    );
  };

  const ItemList = ({ data }) => {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} scrollEventThrottle={1}>
        {data.map((item, index) => (
          <ItemCard
            key={index + ""}
            width={Configs.CARD_WIDTH}
            height={scaleSize(265)}
            borderRadius={5}
            item={item}
            onPress={goToStoreDetail}
            style={{ marginHorizontal: scaleSize(5) }}
          />
        ))}
      </ScrollView>
    );
  };

  const ItemListHolder = () => {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} scrollEventThrottle={1}>
        {placeholders.map((item, index) => (
          <ItemCardPlaceHolder
            key={index + ""}
            width={Configs.CARD_WIDTH}
            height={scaleSize(265)}
            borderRadius={5}
            style={{ marginHorizontal: scaleSize(5) }}
          />
        ))}
      </ScrollView>
    );
  };

  return (
    <>
      <View style={{ paddingBottom: scaleSize(20), paddingLeft: scaleSize(16) }}>
        <Headers title="Beauty" icon={ICONS["beauty_merchant"]} />
        {!loading_store && <ItemList data={store_tab_home} />}
        {loading_store && <ItemListHolder />}
      </View>
    </>
  );
}
