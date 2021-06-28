import React, { useState } from "react";
import { ScrollView, View, RefreshControl } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import actions from "@redux/actions";
import ICONS from "assets";
import { Text, Container, Header, Form, ModalAddTip } from "components";
import { MerchantInfo, Appointment, TotalInfo } from "./widget";
import * as RootNavigation from "navigations/RootNavigation";
import styles from "./style";
import { FormatPrice, formatNumberFromCurrency, formatMoney } from "../../utils";

const { ButtonSubmit } = Form;

export default function index(props) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.datalocalReducer.token);
  const merchant = useSelector((state) => state.storeReducer.merchant_detail);
  const { invoice } = props.route.params;
  console.log({ invoice });
  let {
    appointmentId,
    customDiscountFixed,
    customDiscountPercent,
    discount,
    extras,
    firstName,
    fromTime,
    lastName,
    merchantId,
    paymentMethod,
    paymentTransactionId,
    phoneNumber,
    products,
    services,
    staffId,
    subTotal,
    tax,
    tipAmount,
  } = invoice;

  const total = isNaN(subTotal + tax - discount) ? 0 : subTotal + tax - discount;

  // const amount = invoice.amount ? invoice.amount : total;
  React.useEffect(() => {
    merchantId && getMerchantById();
  }, []);

  const getMerchantById = () => {
    dispatch(actions.storeAction.getDetailMerchant(merchantId, token));
  };

  const setTips = (tips) => {
    dispatch(actions.generalAction.set_tips(tips));
  };

  const onBack = () => {
    RootNavigation.back();
  };

  const goToPayMent = () => {
    let tips = {
      total: formatMoney(total),
      tip: formatMoney(0),
      totalHasTip: formatMoney(total),
    };
    setTips(tips);
    setTimeout(() => {
      RootNavigation.navigate("PaymentInvoice", {
        merchantId_invoice: merchant ? merchant.merchantId : 0,
      });
    }, 250);
  };

  const AppointmentList = () => {
    if (invoice.appointmentId) {
      return <Appointment key={index + ""} item={invoice} />;
    }
    return (
      <>
        <View style={{ flex: 1, paddingTop: 20 }}>
          <Text fontSize={15}>List is empty</Text>
        </View>
      </>
    );
  };
  return (
    <Container barStyle="dark-content">
      <Header
        title="Invoice details"
        headerLeft={true}
        onBack={onBack}
        iconLeft={ICONS["arrow_back_ios"]}
      />

      <ScrollView
        // refreshControl={
        //   <RefreshControl
        //     refreshing={loading_group_appt}
        //     onRefresh={getGroupAppointment}
        //     size={30}
        //     progressBackgroundColor="#FFFF"
        //     colors={["#0764B0"]}
        //     tintColor="#0764B0"
        //   />
        // }
        contentContainerStyle={styles.container_center}>
        {merchant != "" && <MerchantInfo data={merchant} />}

        {invoice.appointmentId && (
          <View style={styles.container_title}>
            <Text fontSize={15} color="#666666">
              Services & Product
            </Text>
          </View>
        )}

        <AppointmentList />

        {invoice.appointmentId && (
          <TotalInfo
            subTotal={subTotal ? subTotal : 0}
            tax={tax ? tax : 0}
            total={total}
            discount={discount ? discount : 0}
          />
        )}
      </ScrollView>

      {invoice.appointmentId && (
        <View style={styles.container_button}>
          <ButtonSubmit title="Next" width={350} onSubmit={goToPayMent} />
        </View>
      )}
    </Container>
  );
}
