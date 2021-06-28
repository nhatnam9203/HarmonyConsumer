import React, { useState } from "react";
import { ScrollView, View, RefreshControl } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import actions from "@redux/actions";
import ICONS from "assets";
import { Text, Container, Header, Form, ModalAddTip } from "components";
import { MerchantInfo, Appointment, TotalInfo } from "./widget";
import * as RootNavigation from "navigations/RootNavigation";
import { isEmpty } from "lodash";
import styles from "./style";

const { ButtonSubmit } = Form;

export default function index(props) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.datalocalReducer.token);
  const groupAppointment = useSelector((state) => state.appointmentReducer.groupAppointment);
  const loading_group_appt = useSelector((state) => state.appointmentReducer.loading_group_appt);
  const invoice = useSelector((state) => state.paymentReducer.invoice);
  const [isRefresh, setRefresh] = useState(false);
  const [firstLoading, setFirstLoading] = useState(true);

  const { amount } = invoice;

  let { appointments, dueAmount, paidAmount, checkoutPayments, total } = groupAppointment;

  appointments = appointments ? appointments : null;
  const merchant = appointments ? appointments[0].merchant : null;
  const [visibleTip, showModalTip] = React.useState(false);

  React.useEffect(() => {
    getGroupAppointment();
    setTimeout(() => {
      setFirstLoading(false);
    }, 2000);
  }, []);

  React.useEffect(() => {
    if (isEmpty(invoice) && firstLoading == false) {
      RootNavigation.navigate("Home");
    }
    const unsubscribe = props.navigation.addListener("focus", () => {
      setFirstLoading(true);
    });
    return () => {
      setFirstLoading(true);
    };
  }, [invoice]);

  const getGroupAppointment = () => {
    if (invoice.id) {
      dispatch(actions.appointmentAction.getGroupAppointmentById(token, invoice.id));
    } else {
      dispatch({
        type: "SET_GROUP_APPOINTMENT",
        payload: [],
      });
    }
  };

  const onRefresh = () => {
    getGroupAppointment();
  };

  const onToggleModalTip = () => {
    showModalTip(!visibleTip);
  };

  const onBack = () => {
    RootNavigation.back();
  };

  const goToPayMent = (tip = 0) => {
    showModalTip(false);
    setTimeout(() => {
      setFirstLoading(true);
      RootNavigation.navigate("PaymentInvoice", {
        merchantId_invoice: merchant ? merchant.merchantId : 0,
        tipCustomer: tip,
      });
    }, 250);
  };

  const AppointmentList = () => {
    if (appointments) {
      return appointments.map((item, index) => {
        return <Appointment key={index + ""} item={item} />;
      });
    }
    return (
      <>
        {!loading_group_appt && (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <Text fontSize={15}>List is empty</Text>
          </View>
        )}
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
        contentContainerStyle={styles.container_center}>
        {merchant && <MerchantInfo data={merchant} />}

        {appointments && (
          <View style={styles.container_title}>
            <Text fontSize={15} color="#666666">
              Services & Product
            </Text>
          </View>
        )}

        <AppointmentList />

        {appointments && (
          <TotalInfo
            dueAmount={dueAmount}
            paidAmount={paidAmount}
            total={total}
            checkoutPayments={checkoutPayments}
          />
        )}
      </ScrollView>

      {appointments && (
        <View style={styles.container_button}>
          <ButtonSubmit title="Next" width={350} onSubmit={onToggleModalTip} />
        </View>
      )}

      <ModalAddTip
        isVisible={visibleTip}
        onRequestClose={onToggleModalTip}
        onPress={goToPayMent}
        total={amount}
      />
    </Container>
  );
}
