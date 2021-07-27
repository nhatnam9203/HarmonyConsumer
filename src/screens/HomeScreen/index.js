import React from "react";
import {
  ScrollView,
  View,
  RefreshControl,
  BackHandler,
  Alert,
  ImageBackground,
  ActivityIndicator,
} from "react-native";

import { Container, Text, FocusAwareStatusBar } from "components";
import { Header, GiftCard, GiftCardActive, ButtonList, Banner, MerchantList } from "./Widget";
import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import actions from "@redux/actions";
import * as RootNavigation from "navigations/RootNavigation";
import ICONS from "assets";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function index(props) {
  const dispatch = useDispatch();
  const { navigation } = props;

  const token = useSelector((state) => state.datalocalReducer.token);
  const current_location = useSelector((state) => state.datalocalReducer.current_location);
  const invoice = useSelector((state) => state.paymentReducer.invoice);
  const userInfo = useSelector((state) => state.datalocalReducer.userInfo);
  const userCard = userInfo.userCard ? userInfo.userCard : null;
  const number_invoice = invoice.id ? 1 : 0;
  const [refreshing, setRefreshing] = React.useState(false);

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

  const _onRefresh = () => {
    setRefreshing(true);
    dispatch(actions.inboxAction.countUnread(token));
    dispatch(actions.paymentAction.get_number_invoice(token));
    fetchListCreditAndBankCard();
    getCardByUser();
    updateAccount();
    wait(2000).then(() => setRefreshing(false));
  };

  return (
    <Container showStatusBar={false} paddingBottom={0}>
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="transparent" />
      <ScrollView
        // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />}
        bounces={false}
        horizontal={false}
        contentContainerStyle={styles.container_center}
        showsVerticalScrollIndicator={false}>
        <Header openDrawer={openDrawer} reloadView={_onRefresh} />

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
      {refreshing && (
        <View
          style={{
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}>
          <LoadingIndicator animating={refreshing} color="#0764f9" size="large" />
        </View>
      )}
    </Container>
  );
}

const LoadingIndicator = () => {
  return (
    <View
      style={{
        width: 50,
        height: 50,
        borderRadius: 6,
        backgroundColor: "#0005",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <ActivityIndicator color="#fff" />
    </View>
  );
};
