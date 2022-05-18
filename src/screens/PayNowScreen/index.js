import React from "react";
import { View, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import actions from "@redux/actions";
import ICONS from "assets";
import { Text, Button, Header, Badge, StatusBar, FocusAwareStatusBar } from "components";
import * as RootNavigation from "navigations/RootNavigation";
import styles from "./style";
const data = [
  { title: "Pending invoice", url: ICONS["invoice_pending"], screen: "InvoiceDetail" },
  // { title: "Scan QR code", url: ICONS["scan_invoice"], screen: "ScanGiftCard" },
];
export default function index(props) {
  // const dispatch = useDispatch();
  // const token = useSelector((state) => state.datalocalReducer.token);
  const invoice = useSelector((state) => state.paymentReducer.invoice);
  const number_invoice = invoice.id ? 1 : 0;

  const onBack = () => {
    RootNavigation.back();
  };

  const goToScan = () => {
    let obj = {
      headerText: "Scan QR Code",
      field: null,
      marker: ICONS["marker_qrcode"],
    };
    RootNavigation.navigate("ScanGiftCard", { objScan: obj });
  };

  const goToInvoice = () => {
    RootNavigation.navigate("InvoiceDetail");
  };

  const PaymentMethodList = () => {
    return data.map((item, index) => {
      const _onPress = index == 0 ? goToInvoice : goToScan;
      return (
        <Button onPress={_onPress} key={index + ""} style={styles.card}>
          <Image style={styles.image} source={item.url} />
          <Text fontSize={17} color="#0764b0">
            {item.title}
          </Text>

          {index == 0 && (
            <Badge
              width={20}
              height={20}
              backgroundColor="#ed1c24"
              title={number_invoice}
              style={styles.badget}
            />
          )}
        </Button>
      );
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="transparent" />
      <View style={{ backgroundColor: "#f8f8f8" }}>
        <StatusBar />
        <Header
          title="PayNow"
          headerLeft={true}
          iconLeft={ICONS["arrow_back_ios"]}
          onBack={onBack}
        />
      </View>
      <View style={styles.container_center}>
        <PaymentMethodList />
      </View>
    </View>
  );
}
