import React from "react";
import { View } from "react-native";
import ScrollableTabView from "components/react-native-scrollable-tab-view";

import * as RootNavigation from "navigations/RootNavigation";
import { Header, Text, CreditTabBar, Form, StatusBar } from "components";
import { BankForm, CreditForm } from "./widget";
import { scaleSize } from "utils";
import ICONS from "assets";

export default function index() {
  const onBack = () => {
    RootNavigation.back();
  };
  const refTabCredit = React.useRef(null);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ backgroundColor: "#f8f8f8" }}>
        <StatusBar />
        <Header title="Add payments" headerLeft={true} onBack={onBack} />
      </View>
      <View
        style={{
          alignSelf: "flex-start",
          alignItems: "center",
          marginVertical: scaleSize(30),
          marginHorizontal: scaleSize(16),
        }}>
        <Text fontSize={17} color="#888888" style={{ fontWeight: "500" }}>
          Payment Methods
        </Text>
      </View>

      <View style={{ flex: 1 }}>
        <ScrollableTabView
          prerenderingSiblingsNumber={1}
          initialPage={0}
          renderTabBar={() => <CreditTabBar style={{ marginLeft: scaleSize(16) }} />}>
          <CreditForm tabLabel={ICONS["credit_form"]} ref={refTabCredit} />
          <BankForm tabLabel={ICONS["bank_form"]} />
        </ScrollableTabView>
      </View>
      {/* </ScrollView> */}
    </View>
  );
}
