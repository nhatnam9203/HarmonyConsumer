import React from "react";
import { StyleSheet, View } from "react-native";
import { scaleSize } from "utils";
import { ItemCard } from "components";
import BannerLoading from "./BannerLoading";
import { Text } from "components";
import Configs from "configs";
import SwiperFlatList from "react-native-swiper-flatlist";
import { useSelector, useDispatch } from "react-redux";
import actions from "@redux/actions";
const { CARD_WIDTH } = Configs;

export default function Banner(props) {
  const dispatch = useDispatch();
  const store_top = useSelector((state) => state.storeReducer.store_top);
  const token = useSelector((state) => state.datalocalReducer.token);

  const goToStoreDetail = (merchant) => {
    const { merchantId } = merchant;
    dispatch(actions.storeAction.setDetailMerchant(merchant));
    dispatch(actions.storeAction.getDetailMerchant(merchantId, token));
    props.goToStoreDetail(merchantId);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.txtTopStore} color="#585858" fontSize={19} fontFamily="medium">
        Top store
      </Text>
      <SwiperFlatList
        autoplay
        autoplayDelay={5}
        autoplayLoop
        autoplayLoopKeepAnimation={true}
        showPagination
        paginationDefaultColor={"#D5F8FC"}
        paginationActiveColor={"#1C98C9"}
        paginationStyle={{
          marginBottom: -scaleSize(23),
        }}
        paginationStyleItem={{
          width: scaleSize(11),
          height: scaleSize(11),
          marginLeft: -scaleSize(2),
        }}>
        {store_top.length == 0 ? (
          <BannerLoading />
        ) : (
          store_top.map((item, index) => (
            <ItemCard
              key={index + ""}
              width={CARD_WIDTH - 20}
              height={scaleSize(265)}
              borderRadius={5}
              item={item}
              onPress={goToStoreDetail}
              style={{ marginHorizontal: scaleSize(5) }}
            />
          ))
        )}
      </SwiperFlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: scaleSize(320),
    top: -scaleSize(50),
    marginBottom: scaleSize(15),
    marginTop: scaleSize(15),
  },
  dotDefault: {
    bottom: -scaleSize(45),
    backgroundColor: "#D4F8FC",
    width: scaleSize(10),
    height: scaleSize(10),
    borderRadius: scaleSize(5),
  },
  activeDot: {
    backgroundColor: "#1C98C9",
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eeeeee",
  },
  txtTopStore: {
    marginBottom: scaleSize(20),
  },
});
