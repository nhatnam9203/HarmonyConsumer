import React from "react";
import { View, Image, FlatList, RefreshControl } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import actions from "@redux/actions";
import { get_creditCard, get_BankCard } from "@redux/actions/creditAndBankAction";
import { CreditCard, BankCard } from "./widget";
import ICONS from "assets";
import { Text, Container, Button, Header, Form } from "components";
import * as RootNavigation from "navigations/RootNavigation";
import styles from "./style";

const { ButtonSubmit } = Form;

export default function index(props) {
  const [indexCard, setIndexCard] = React.useState(-1);
  const token = useSelector((state) => state.datalocalReducer.token);
  const credits = useSelector((state) => state.creditAndBankReducer.credits);
  const banks = useSelector((state) => state.creditAndBankReducer.banks);
  const loading_card = useSelector((state) => state.creditAndBankReducer.loading_card);
  const gift_send = useSelector((state) => state.buygiftReducer.gift_send);
  const dispatch = useDispatch();
  const [isRefresh, setRefresh] = React.useState(false);

  React.useEffect(() => {
    fetchListCreditAndBankCard();
  }, []);

  const fetchListCreditAndBankCard = () => {
    dispatch(get_creditCard(token));
    dispatch(get_BankCard(token));
  };

  const onRefresh = () => {
    setRefresh(true);
    fetchListCreditAndBankCard();
    setTimeout(() => {
      setRefresh(false);
    }, 300);
  };

  const onSelectCreditCard = (item) => {
    setIndexCard(item);
  };

  const onBack = () => {
    RootNavigation.back();
  };

  const addPayment = () => {
    RootNavigation.navigate("AddPayment");
  };

  const goToSelectReceiverGiftCard = () => {
    if (indexCard !== -1) {
      gift_send["cardTokenId"] =
        indexCard != -1
          ? indexCard.userCardTokenId
            ? indexCard.userCardTokenId
            : indexCard.bankAcountId
          : 0;

      gift_send["type"] =
        indexCard != -1 ? (indexCard.userCardTokenId ? "credit_card" : "bank") : "harmony";
      dispatch(actions.buygiftAction.set_gift_send(gift_send));
      RootNavigation.navigate("SelectReceiverGiftCard");
    }
  };

  const ListCreditCard = ({ item, index }) => {
    return <CreditCard item={item} onPress={onSelectCreditCard} isSelected={indexCard} />;
  };

  const ListBankCard = () => {
    return banks.map((item, index) => {
      return (
        <BankCard
          key={index + ""}
          item={item}
          onPress={onSelectCreditCard}
          isSelected={indexCard}
        />
      );
    });
  };

  const ListFooterComponent = () => (
    <>
      <ListBankCard />
      <Button onPress={addPayment} style={styles.button_add}>
        <Image source={ICONS["add_payment"]} style={styles.icon_add} />
        <Text fontSize={18} color="#0764B0">
          Add payment
        </Text>
      </Button>
    </>
  );

  return (
    <Container barStyle="dark-content">
      <Header
        title="Buy gift"
        headerLeft={true}
        onBack={onBack}
        iconLeft={ICONS["arrow_back_ios"]}
      />

      <FlatList
        contentContainerStyle={styles.container_center}
        data={credits}
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
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        ListEmptyComponent={_ListEmptyComponent}
        renderItem={ListCreditCard}
        ItemSeparatorComponent={ItemSeperator}
        keyExtractor={(_, index) => index + ""}
      />

      <View style={styles.button_submit}>
        <ButtonSubmit onSubmit={goToSelectReceiverGiftCard} title="Next" width={350} />
      </View>
    </Container>
  );
}

const ListHeaderComponent = () => (
  <View style={styles.header}>
    <Text fontSize={17} color="#666666">
      Select the account for payment
    </Text>
  </View>
);
const _ListEmptyComponent = () => (
  <View style={{ flex: 1 }}>{/* <Text>List is empty</Text> */}</View>
);

const ItemSeperator = () => <View style={{ height: 15 }}></View>;
