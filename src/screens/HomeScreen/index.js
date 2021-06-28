import React from "react";
import { ScrollView, View, StatusBar, BackHandler, Alert } from "react-native";

import { Container, Text, FocusAwareStatusBar } from "components";
import { Header, GiftCard, GiftCardActive, ButtonList, Banner, MerchantList } from "./Widget";
import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import actions from "@redux/actions";
import * as RootNavigation from "navigations/RootNavigation";

export default function index(props) {
  const dispatch = useDispatch();
  const { navigation } = props;

  const token = useSelector((state) => state.datalocalReducer.token);
  const current_location = useSelector((state) => state.datalocalReducer.current_location);
  const invoice = useSelector((state) => state.paymentReducer.invoice);
  const userInfo = useSelector((state) => state.datalocalReducer.userInfo);
  const userCard = userInfo.userCard ? userInfo.userCard : null;
  const number_invoice = invoice.id ? 1 : 0;

  const { lat, lng } =
    current_location && current_location.location ? current_location.location : 0;

  React.useEffect(() => {
    dispatch(
      actions.storeAction.searchStore(
        "",
        "all",
        "favoritest",
        lat,
        lng,
        1,
        token,
        (screen = "Home"),
      ),
    );
    dispatch(actions.inboxAction.countUnread(token));
    dispatch(actions.paymentAction.get_number_invoice(token));
    dispatch(actions.appointmentAction.getAppointmentUpcoming(token, () => {}));
    fetchListCreditAndBankCard();
    getCardByUser();
    updateAccount();
    getTopMerchant();
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);
  }, []);

  const getTopMerchant = () => {
    dispatch(actions.storeAction.getTopMerchant(token, lat, lng));
  };

  const updateAccount = () => {
    if (!userInfo.accountId) {
      const body = {
        latitude: parseFloat(lat),
        longitude: parseFloat(lng),
      };
      dispatch(actions.authAction.updateAccount(body, token));
    }
  };

  const fetchListCreditAndBankCard = () => {
    dispatch(actions.creditAndBankAction.get_creditCard(token));
    dispatch(actions.creditAndBankAction.get_BankCard(token));
  };

  const getCardByUser = () => {
    dispatch(actions.cardAction.get_card_by_user(token, userInfo.userId));
  };

  const handleBackButton = () => {
    if (props.navigation.isFocused()) {
      Alert.alert(
        "Exit App",
        "Exiting the application?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => BackHandler.exitApp(),
          },
        ],
        {
          cancelable: false,
        },
      );
      return true;
    }
  };

  const openDrawer = () => {
    navigation.openDrawer();
  };

  const addMoney = () => {
    dispatch(actions.cardAction.set_card_reload(userCard));
    RootNavigation.navigate("AddMoneyExistCard");
  };

  const addCard = () => {
    navigation.navigate("AddNewCard");
  };

  const activeFirstCard = () => {
    navigation.navigate("FlowAddCard");
  };

  const booking = () => {
    navigation.navigate("Store");
  };

  const paynow = () => {
    navigation.navigate("PayNow");
  };

  const goToStoreDetail = (merchantId) => {
    dispatch(actions.bookingAction.resetBooking());
    RootNavigation.navigate("BookAppointmentStack", {
      screen: "StoreDetail",
      params: { merchantId },
    });
  };

  return (
    <Container showStatusBar={false} paddingBottom={0}>
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="transparent" />
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.container_center}
        showsVerticalScrollIndicator={false}>
        <Header openDrawer={openDrawer} />

        {userCard && <GiftCard onaddMoney={addMoney} onAddCard={addCard} card={userCard} />}
        {!userCard && <GiftCardActive onPress={activeFirstCard} />}
        <ButtonList onBooking={booking} onPaynow={paynow} invoice={number_invoice} />

        <Banner goToStoreDetail={goToStoreDetail} />
        <View style={styles.title_popular}>
          <Text color="#585858" fontSize={19} fontFamily="medium">
            Popular near you
          </Text>
        </View>
        <MerchantList goToStoreDetail={goToStoreDetail} />
      </ScrollView>
    </Container>
  );
}
