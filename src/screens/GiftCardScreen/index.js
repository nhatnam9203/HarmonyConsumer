import React, { useState } from "react";
import { View, FlatList, RefreshControl } from "react-native";
import ScrollableTabView from "components/react-native-scrollable-tab-view";
import { useDispatch, useSelector } from "react-redux";

import actions from "@redux/actions";
import { PrimaryCard, MoreCard, AddCard, BuyGiftTab } from "./widget";
import ICONS from "assets";
import { Header, GiftCardTabBar, StatusBar, Text, FocusAwareStatusBar } from "components";
import * as RootNavigation from "navigations/RootNavigation";
import styles from "./style";
import { scaleSize } from "utils";
import { app } from "@redux/slices"

const tabs = [
  { name: "My cards", url: ICONS["my_card_tab"] },
  { name: "Buy gift", url: ICONS["gift"] },
];

export default function index(props) {
  const { navigation } = props;
  const dispatch = useDispatch();
  const token = useSelector((state) => state.datalocalReducer.token);
  const userInfo = useSelector((state) => state.datalocalReducer.userInfo);
  const card_more = useSelector((state) => state.cardReducer.card_more);
  const card_primary = useSelector((state) => state.cardReducer.card_primary);
  const loading_card = useSelector((state) => state.creditAndBankReducer.loading_card);
  const appUpdate = useSelector(state => state.app.appCallUpdate);

  const _card_more = React.useMemo(() => [...card_more, { giftCardId: -1 }], [card_more]);

  const [isRefresh, setRefresh] = useState(false);

  const getCardByUser = () => {
    dispatch(actions.cardAction.get_card_by_user(token, userInfo.userId));
  };

  const openDrawer = () => {
    navigation.openDrawer();
  };
  const goToDetailCard = (item = {}) => {
    dispatch(actions.cardAction.set_card_detail(item));

    RootNavigation.navigate("DetailGiftCard");
  };

  const goToDetailTemplate = (item = {}) => {
    props.navigation.navigate("DetailTemplate", { template: item });
  };

  const gotoAddNewCard = () => {
    RootNavigation.navigate("AddNewCard");
  };

  const openInbox = () => {
    RootNavigation.navigate("Inbox");
  };

  const onRefresh = () => {
    setRefresh(true);
    dispatch(actions.cardAction.get_card_by_user(token, userInfo.userId, setRefresh));
  };

  React.useEffect(() => {
    if (appUpdate) {
      getCardByUser();
    }
  }, [appUpdate])

  return (
    <View style={{ flex: 1, backgroundColor: "#F7F7F7" }}>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="transparent" />
      <StatusBar barStyle="dark-content" />
      <Header
        title="Gift card"
        headerLeft={true}
        headerRight={true}
        iconLeft={ICONS["drawer"]}
        onBack={openDrawer}
        onPressRight={openInbox}
      />
      <ScrollableTabView
        locked
        initialPage={0}
        style={{ flex: 1, backgroundColor: "white" }}
        prerenderingSiblingsNumber={1}
        renderTabBar={() => <GiftCardTabBar tab={styles.default_tab} style={styles.tabs} />}>
        <MyCard
          isRefresh={isRefresh}
          onRefresh={onRefresh}
          tabLabel={tabs[0]}
          card_primary={card_primary}
          goToDetailCard={goToDetailCard}
          getCardByUser={getCardByUser}
          ListEmptyComponent={() => <ListEmptyComponent gotoAddNewCard={gotoAddNewCard} />}
          ItemSeparatorComponent={() => <ItemSeparatorComponent />}
          _card_more={_card_more}
          gotoAddNewCard={gotoAddNewCard}
        />
        <BuyGiftTab tabLabel={tabs[1]} onNextScreen={goToDetailTemplate} />
      </ScrollableTabView>
    </View>
  );
}

const MyCard = ({
  isRefresh,
  onRefresh,
  tabLabel,
  card_primary,
  goToDetailCard,
  getCardByUser,
  ListEmptyComponent,
  ItemSeparatorComponent,
  _card_more,
  gotoAddNewCard,
}) => {
  return (
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={isRefresh}
          onRefresh={onRefresh}
          size={30}
          progressBackgroundColor="#FFFF"
          colors={["#0764B0"]}
          tintColor="#0764B0"
        />
      }
      tabLabel={tabLabel}
      contentContainerStyle={styles.content_flatlist}
      ListHeaderComponent={() =>
        card_primary && (
          <PrimaryCard card={card_primary} onPress={goToDetailCard} onReload={getCardByUser} />
        )
      }
      ListEmptyComponent={ListEmptyComponent}
      ItemSeparatorComponent={ItemSeparatorComponent}
      data={_card_more}
      numColumns={2}
      keyExtractor={(_, index) => index + ""}
      renderItem={({ item, index }) => {
        const _marginLeft = index % 2 != 0 ? { marginLeft: scaleSize(15) } : {};
        return (
          <React.Fragment>
            {item.giftCardId > -1 ? (
              <MoreCard item={item} index={index} style={_marginLeft} onPress={goToDetailCard} />
            ) : (
              <AddCard onPress={gotoAddNewCard} style={_marginLeft} />
            )}
          </React.Fragment>
        );
      }}
    />
  );
};

const ListEmptyComponent = ({ gotoAddNewCard }) => (
  <View style={{ flex: 1 }}>
    <Text fontSize={15} color="#646464" style={{ marginBottom: scaleSize(15) }}>
      You have no cards
    </Text>
    <AddCard onPress={gotoAddNewCard} />
  </View>
);

const ItemSeparatorComponent = () => <View style={styles.seperator} />;
