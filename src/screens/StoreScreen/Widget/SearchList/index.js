import React from "react";
import { StyleSheet, View, ScrollView, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import Modal from "react-native-translucent-modal";
import { Text, ItemCard, StatusBar, SearchBar, ItemCardPlaceHolder } from "components";
import ICONS from "assets";
import { scaleSize } from "utils";
import TabBar from "../TabBar";
import actions from "@redux/actions";
import * as RootNavigation from "navigations/RootNavigation";
import { useDispatch } from "react-redux";

const DATA = [
  { name: "Beauty", url: ICONS["beauty_merchant"] },
  // { name: "Restaurant", url: ICONS["restaurant_merchant"] },
];

export default function SearchList({
  isVisible,
  onRequestClose,
  onSubmit,
  onClearData,
  closeSearchList = () => {},
  storeSearch,
}) {
  const dispatch = useDispatch();

  const [isTabActive, setTabActive] = React.useState(0);
  const typingTimeoutRef = React.useRef();

  const token = useSelector((state) => state.datalocalReducer.token);
  const loading_search = useSelector((state) => state.storeReducer.loading_search);
  const placeholders = useSelector((state) => state.datalocalReducer.placeholders);
  const loading_app = useSelector((state) => state.appReducer.loading_app);
  const { valueSearchStore } = useSelector((state) => state.storeReducer);

  const onChangeText = React.useCallback(
    (value) => {
      dispatch(actions.storeAction.onChangeValueSearchStore(value));
      if (!onSubmit) return;
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      typingTimeoutRef.current = setTimeout(() => {
        onSubmit(value);
      }, 300);
    },
    [valueSearchStore],
  );

  const goBack = () => {
    onRequestClose();
    onClearData();
    dispatch(actions.storeAction.onChangeValueSearchStore(""));
  };

  const onHandleOnChangePage = React.useCallback((i) => {
    setTabActive(i);
  }, []);

  const goToStoreDetail = (merchant) => {
    const { merchantId } = merchant;
    dispatch(actions.storeAction.setDetailMerchant(merchant));
    dispatch(actions.storeAction.getDetailMerchant(merchantId, token));
    dispatch(actions.bookingAction.resetBooking());
    RootNavigation.navigate("BookAppointmentStack", {
      screen: "StoreDetail",
      params: { merchantId },
    });
    closeSearchList();
  };

  const renderPlaceholderList = () => (
    <View style={{ paddingHorizontal: scaleSize(18) }}>
      {placeholders.map((item, index) => (
        <ItemCardPlaceHolder key={index + ""} style={{ marginVertical: scaleSize(20) }} />
      ))}
    </View>
  );

  return (
    <Modal animationType="slide" onRequestClose={goBack} visible={isVisible}>
      <View style={styles.container}>
        <View style={styles.header}>
          <StatusBar barStyle="dark-content" />
          <SearchBar
            onPressRight={goBack}
            placeholder="Search..."
            placeholderTextColor="#646464"
            width={382}
            height={48}
            iconRight={ICONS["arrow_back_search"]}
            autoFocus={true}
            onChangeText={onChangeText}
            value={valueSearchStore}
          />

          <TabBar
            activeTab={isTabActive}
            tabs={DATA}
            handleChangePage={onHandleOnChangePage}
            style={styles.tabs}
          />
        </View>

        {!loading_search ? (
          !(storeSearch.length === 0) ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: scaleSize(18),
                paddingBottom: scaleSize(15),
              }}>
              {storeSearch.map((item, index) => (
                <ItemCard
                  isSearchList
                  valueSearch={valueSearchStore}
                  onPress={() => goToStoreDetail(item)}
                  key={index + "storeFavourite"}
                  item={item}
                  style={{ marginVertical: scaleSize(15) }}
                />
              ))}
            </ScrollView>
          ) : (
            <EmptyList />
          )
        ) : (
          renderPlaceholderList()
        )}
        {loading_app && <LoadingIndicator />}
      </View>
    </Modal>
  );
}

const LoadingIndicator = () => {
  return (
    <View style={styles.rootLoading}>
      <View style={styles.styleLoading}>
        <ActivityIndicator size="small" color="white" />
      </View>
    </View>
  );
};

const EmptyList = () => (
  <View style={styles.loading}>
    <Text fontSize={20}>List is empty</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    // alignItems: 'center',
    backgroundColor: "#FFF",
  },
  header: {
    height: scaleSize(170),
    width: "100%",
    backgroundColor: "#F8F8F8",
    alignItems: "center",
    paddingTop: scaleSize(20),
    paddingHorizontal: scaleSize(12),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.3,

    elevation: 13,
  },
  tabs: {
    alignSelf: "flex-start",
    // marginHorizontal: scaleSize(20),
    marginTop: scaleSize(20),
    marginLeft: scaleSize(5),
  },
  title: {
    fontWeight: "700",
    marginTop: scaleSize(20),
  },
  loading: {
    flex: 1,
    paddingTop: scaleSize(20),
    alignItems: "center",
  },
  styleLoading: {
    width: scaleSize(100),
    height: scaleSize(100),
    justifyContent: "center",
    alignItems: "center",
    // opacity: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: scaleSize(10),
  },
  rootLoading: {
    ...StyleSheet.absoluteFill,
    justifyContent: "center",
    alignItems: "center",
    opacity: 1,
    zIndex: 10000,
    position: "absolute",
  },
});
