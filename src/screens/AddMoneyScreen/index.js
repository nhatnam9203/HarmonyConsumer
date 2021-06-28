import React from "react";
import { View, Image, ScrollView } from "react-native";
import { KeyboardAccessoryView } from "react-native-keyboard-accessory";

import ICONS from "assets";
import { Text, Container, Header, Form, FocusAwareStatusBar } from "components";
import { InputAmount, InputAccessoryAmount, CreditCardList, AutoReloadComponent } from "./widget";
import * as RootNavigation from "navigations/RootNavigation";
import styles from "./style";

const { ButtonSubmit } = Form;

const amounts = [
  { id: 1, amount: 20 },
  { id: 2, amount: 50 },
  { id: 3, amount: 100 },
  { id: 4, amount: 200 },
  { id: 5, amount: 500 },
];

const money_sources = [
  { id: 1, user_name: "ANGELA LYNCH", account_number: "2321", url: ICONS["visa_active"] },
  { id: 2, user_name: "ANGELA PHUONG TRINH", account_number: "1234", url: ICONS["jcb_active"] },
];
export default function index(props) {
  const [isShowReload, setShowReload] = React.useState(false);
  const [amount_reload, setAmountReload] = React.useState(0);
  const [balance, setBalance] = React.useState(0);
  const [value, setValue] = React.useState("0");

  const titleSubmit = isShowReload ? "Save & Add" : "Add money";

  const onBack = () => {
    RootNavigation.back();
  };
  const gotoCardDetail = () => {
    RootNavigation.navigate("DetailGiftCard");
  };

  return (
    <React.Fragment>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="transparent" />
      <Container barStyle="dark-content">
        <Header
          title="Add money"
          iconLeft={ICONS["close_header"]}
          headerLeft={true}
          onBack={onBack}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container_center}
          contentContainerStyle={{ alignItems: "center", flexGrow: 1 }}>
          <Text fontSize={17} style={styles.title_left}>
            Card
          </Text>

          <Image style={styles.image_creditcard} source={ICONS["primary_card"]} />

          <View style={styles.container_balance}>
            <Text fontSize={15} style={{ fontWeight: "500" }}>
              Card balance
            </Text>

            <Text fontSize={15} style={{ fontWeight: "500" }}>
              $ 100000
            </Text>
          </View>

          <Text fontSize={17} style={styles.title_left}>
            Amount
          </Text>

          <InputAmount value={value} onChangeText={setValue} />

          <Text fontSize={17} style={styles.title_left}>
            Money Source
          </Text>

          <CreditCardList data={money_sources} />

          <AutoReloadComponent
            amount={amount_reload}
            balance={balance}
            selectAmount={setAmountReload}
            selectBalance={setBalance}
            isShow={isShowReload}
            onShow={setShowReload}
          />

          <View style={[styles.container_button_submit]}>
            <ButtonSubmit title={titleSubmit} width={350} onSubmit={gotoCardDetail} />
          </View>
        </ScrollView>
      </Container>

      <KeyboardAccessoryView nativeID={"uniqueId"}>
        <InputAccessoryAmount data={amounts} onChange={setValue} value={value} />
      </KeyboardAccessoryView>
    </React.Fragment>
  );
}
