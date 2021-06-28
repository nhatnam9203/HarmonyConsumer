import React from "react";
import { Text, View, TouchableOpacity, ScrollView, RefreshControl } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Image from "react-native-fast-image";

import actions from "@redux/actions";
import styles from "./styles";
import { Header, StatusBar } from "components";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { scaleWidth, scaleHeight, getImageCard, splitMothAndYear } from "utils";

import * as RootNavigation from "navigations/RootNavigation";

export default function Payment(props) {
  const dispatch = useDispatch();
  const credits = useSelector((state) => state.creditAndBankReducer.credits);
  const banks = useSelector((state) => state.creditAndBankReducer.banks);
  const token = useSelector((state) => state.datalocalReducer.token);
  const loading_card = useSelector((state) => state.creditAndBankReducer.loading_card);
  const [isRefresh, setRefresh] = React.useState(false);

  const payments = [...credits, ...banks];

  const goToAddCard = () => {
    RootNavigation.navigate("AddPayment");
  };

  React.useEffect(() => {
    fetchListCreditAndBankCard();
  }, []);

  const fetchListCreditAndBankCard = () => {
    dispatch(actions.creditAndBankAction.get_creditCard(token));
    dispatch(actions.creditAndBankAction.get_BankCard(token));
  };

  const refreshListCard = () => {
    setRefresh(true);
    fetchListCreditAndBankCard();
    setTimeout(() => {
      setRefresh(false);
    }, 2000);
  };

  const goToPaymentDetail = (item) => () => {
    dispatch(actions.creditAndBankAction.set_detail_card(item));
    RootNavigation.navigate("PaymentDetail");
  };

  const back = () => {
    RootNavigation.back();
  };

  function renderNoCard() {
    return (
      <View>
        <Text style={[styles.txtAddCard, { color: "#404040" }]}>
          You have not linked an account or card yet
        </Text>
        <TouchableOpacity
          onPress={goToAddCard}
          style={[styles.row, { marginTop: scaleWidth(6), marginLeft: scaleWidth(3) }]}>
          <FontAwesome5
            style={{ marginTop: scaleWidth(0.7) }}
            name="plus-circle"
            color={"#0764B0"}
            size={scaleWidth(4)}
          />
          <Text style={styles.txtAddCard}>Add a bank account or card</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function BankCard({ item }) {
    const { bankAcountId, accountHolderName, cardNumber } = item;
    return (
      <TouchableOpacity
        onPress={goToPaymentDetail(item)}
        style={[
          styles.cardContainer,
          { justifyContent: "space-between", height: scaleHeight(20) },
        ]}>
        <Image source={getImageCard("bank")} style={styles.imgCardVisa} />
        <Text style={[styles.txtCardInfo, { color: "#888888" }]}>{accountHolderName}</Text>
        <Text style={[styles.txtCardInfo]}>**** ***** **** {cardNumber}</Text>
        <Text style={styles.statusCard}>status</Text>
      </TouchableOpacity>
    );
  }

  function renderCard() {
    const ExpDate = () => (
      <View style={{ marginRight: 5 }}>
        <Text style={{ fontSize: 8, color: "#A9A9A9" }}>EXP</Text>
        <Text style={{ fontSize: 8, color: "#A9A9A9" }}>DATE</Text>
      </View>
    );
    return (
      <View>
        <Text style={styles.yourPayment}>Your payments</Text>
        {payments.map((item, index) => {
          const { bankAcountId, type, cardholderName, cvv, expDate } = item;
          if (bankAcountId) {
            return <BankCard key={index + ""} item={item} />;
          } else {
            return (
              <TouchableOpacity
                key={index + ""}
                onPress={goToPaymentDetail(item)}
                style={styles.cardContainer}>
                <Image
                  source={getImageCard(type)}
                  style={styles.imgCardVisa}
                  resizeMode="contain"
                />
                <Text style={[styles.txtCardInfo, { marginTop: scaleHeight(2) }]}>
                  **** ***** **** {item.cardNumber}
                </Text>
                {<Text style={styles.cvvCard}>{item.cvv}</Text>}
                <View style={styles.rowBottomCard}>
                  <Text style={styles.txtCardInfo}>{cardholderName}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                    <ExpDate />
                    <Text style={styles.dateCard}> {splitMothAndYear(expDate).fullDate}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }
        })}
        <TouchableOpacity
          onPress={goToAddCard}
          style={[styles.row, { marginTop: scaleWidth(6), marginLeft: scaleWidth(3) }]}>
          <FontAwesome5
            style={{ marginTop: scaleWidth(0.7) }}
            name="plus-circle"
            color={"#0764B0"}
            size={scaleWidth(4)}
          />
          <Text style={styles.txtAddCard}>Add Payment</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "#f8f8f8" }}>
        <StatusBar />
        <Header headerLeft onBack={back} title={"Payment"} />
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isRefresh}
            onRefresh={refreshListCard}
            size={30}
            progressBackgroundColor="#FFFF"
            colors={["#0764B0"]}
            tintColor="#0764B0"
          />
        }
        style={styles.body}>
        {payments.length > 0 && renderCard()}
        {payments.length === 0 && renderNoCard()}
      </ScrollView>
    </View>
  );
}
