import React from "react";
import { StyleSheet, Dimensions, View, Image, ScrollView, Keyboard } from "react-native";

import * as RootNavigation from "navigations/RootNavigation";
import { formatMoney, isEmpty, scaleSize, getImageCard, FormatPrice } from "utils";
import ICONS from "assets";
import {
  Modal,
  Text,
  Button,
  ModalBottomSelect,
  ButtonSelect,
  ButtonSelectCard,
  Switch,
  MoneyButton,
} from "components";
import { ButtonSubmit } from "./Form";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInputMask } from "react-native-masked-text";

// const amounts = [10, 20, 50, 100, 500];
// const balances = [10, 20, 50, 100];
const { width } = Dimensions.get("window");
const heightPopup = 453;

export default function ModalAutoReload({
  isVisible,
  onRequestClose,
  payments = [],
  onSubmit,
  statusAuto,
  autoReloadAmount,
  autoReloadBelow,
  onChangeValueAuto,
  isAutoReload,
  paymentSelect,
}) {
  const refAmountReload = React.useRef(null);
  const refBalance = React.useRef(null);

  const [isVisibleAmount, setIsVisibleAmount] = React.useState(false);
  const [isVisibleBalance, setIsVisibleBalance] = React.useState(false);
  const [isVisiblePayment, setIsVisiblePayment] = React.useState(false);
  const [amount, setAmount] = React.useState(20);
  const [balance, setBalance] = React.useState(20);
  const [payment, setPayment] = React.useState(null);
  const [keyboardHeight, setKeyboardHeight] = React.useState(0);

  const cardNumber = payment ? `x${payment.cardNumber}` : "Select payment";
  const url_payment = payment ? (payment.bankAcountId ? "bank" : payment.type) : "";
  const disabled_submit = payment ? false : true;

  React.useEffect(() => {
    setAmount(isAutoReload == 1 ? autoReloadAmount : 20);
    setBalance(isAutoReload == 1 ? autoReloadBelow : 20);
    setPayment(paymentSelect ? paymentSelect : null);
  }, [isAutoReload]);

  const toggleBalance = () => {
    setIsVisibleBalance(!isVisibleBalance);
  };

  const toggleAmount = () => {
    setIsVisibleAmount(!isVisibleAmount);
  };

  const togglePayment = () => {
    setIsVisiblePayment(!isVisiblePayment);
  };

  const handleOnChangeSelectAmount = (value) => {
    const amount = FormatPrice(formatMoney(value))
    setAmount(amount);
  };

  const handleOnChangeSelectBalance = (value) => {
    const amount = FormatPrice(formatMoney(value))
    setBalance(amount);
  };

  const handleOnChangeSelectPayment = React.useCallback(
    (index, item) => {
      setPayment(item);
      setTimeout(() => {
        setIsVisiblePayment(false);
      }, 200);
    },
    [payment],
  );

  const handleOnChange = (value) => {
    onChangeValueAuto(value);
  };

  const handleKeyBoardShow = (e) => {
    setKeyboardHeight(e.endCoordinates.height);
  }

  const handleKeyBoardHide = (e) => {
    setKeyboardHeight(0);
  }

  const onHandleSubmit = () => {
    Keyboard.dismiss();

    setTimeout(() => {
      let body = {
        autoReloadAmount: amount,
        autoReloadBankId: payment.bankAcountId ? payment.userCardTokenId : 0,
        autoReloadBelow: balance,
        autoReloadCardId: !payment.bankAcountId ? payment.userCardTokenId : 0,
        isAutoReload: Number(statusAuto),
      };
      onSubmit(body);
    }, 200)
    
  };

  const goToAddNewPayment = () => {
    onRequestClose();
    setTimeout(() => {
      RootNavigation.navigate("AddPayment");
    }, 250);
  };

  const onPressAddAmount = (amount) => {
    if (refAmountReload.current?._inputElement.isFocused()) {
      refAmountReload.current.value = formatMoney(amount);
      setAmount(amount)
    } else if (refBalance.current?._inputElement.isFocused()) {
      refBalance.current.value = formatMoney(amount);
      setBalance(amount)
    }
    
  }

  const onRequestClosePopup = () => {
    Keyboard.dismiss();
    setTimeout(() => {
      onRequestClose();
    }, 200)
    
  }

  return (
    <Modal onRequestClose={onRequestClosePopup} isVisible={isVisible}>
      <View style={styles.container}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ height: scaleSize(heightPopup) }}
          enableOnAndroid={true}
          extraScrollHeight={scaleSize(200)}
          onKeyboardWillShow={handleKeyBoardShow}
          onKeyboardWillHide={handleKeyBoardHide}
          >
        <ScrollView style={styles.containerScrollview}
          keyboardShouldPersistTaps="handled">
            <View style={styles.header}>
              <Text fontSize={20} fontFamily="bold">
                Edit auto reload
              </Text>
              <Button onPress={onRequestClosePopup}>
                <Image source={ICONS["close_header"]} style={styles.icon_close} />
              </Button>
            </View>

            {/* ------------ Switch auto reload ----------------- */}
            {/* <View style={{marginLeft: scaleSize(20)}}> */}
            <View style={styles.container_switch}>
              <Text fontSize={17} color="#585858" fontFamily="bold">
                Auto reload
              </Text>

              <Switch value={statusAuto} onValueChange={handleOnChange} />
            </View>

            {/* ------------ Payment ----------------- */}
            <View style={styles.space} />
            {!isEmpty(payments) ? (
              <ButtonSelectCard
                title="Payment"
                value={cardNumber}
                icon={getImageCard(url_payment)}
                onPress={togglePayment}
              />
            ) : (
              <EmptyCard onPress={goToAddNewPayment} />
            )}
            <ModalBottomSelect
              title="Payment"
              isVisible={isVisiblePayment}
              onRequestClose={togglePayment}
              onCloseModal={togglePayment}
              data={payments}
              onSelect={handleOnChangeSelectPayment}
              value={payment}
              renderItem={(item) => <ItemPayment item={item} />}
            />

            {/* ------------ Select Reload amount ----------------- */}
            <View>
              <View style={styles.space} />
              <Text style={styles.textTitle}>Reload amount</Text>
              <View style={styles.input}>
                <TextInputMask
                  ref={refAmountReload}
                  type="money"
                  options={{
                    unit: "$ ",
                    precision: 2,
                    separator: ".",
                  }}
                  style={styles.text_input}
                  value={amount}
                  onChangeText={(value) => handleOnChangeSelectAmount(value)}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.space} />
              <Text style={styles.textTitle}>When balance is below</Text>
              <View style={styles.input}>
                <TextInputMask
                  ref={refBalance}
                  type="money"
                  options={{
                    unit: "$ ",
                    precision: 2,
                    separator: ".",
                  }}
                  style={styles.text_input}
                  value={balance}
                  onChangeText={(value) => handleOnChangeSelectBalance(value)}
                  keyboardType="numeric"
                />
              </View>
              {/* </View> */}
            </View>

        </ScrollView>

        </KeyboardAwareScrollView>
      </View>

      <View style={[styles.containerViewMoneySelect, 
        {bottom: keyboardHeight > 0 
        ? scaleSize(heightPopup) - scaleSize(keyboardHeight) - scaleSize(40) 
        : 40}]}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Save onSubmit={onHandleSubmit} disabled={disabled_submit} />

          { keyboardHeight > 0 && 
            <View style={styles.view_choose_money}>

              <View style={{flexDirection: 'row'}}>
                <MoneyButton 
                  amount="20"
                  onPress={onPressAddAmount}/>
                <MoneyButton 
                  amount="50"
                  onPress={onPressAddAmount}/>
                <MoneyButton 
                  amount="100"
                  onPress={onPressAddAmount}/>
                <MoneyButton 
                  amount="500"
                  onPress={onPressAddAmount}/>
              </View>
            </View>
          }
        </View>
      </View>
    </Modal>
  );
}

const ItemPayment = ({ item }) => {
  const { cardNumber, type, bankAcountId } = item;
  const _type = bankAcountId ? "bank" : type;
  return (
    <View style={styles.container_item_card}>
      <Image source={getImageCard(_type)} style={styles.image_card} />
      <Text fontSize={17} style={{ fontWeight: "700" }}>
        x{cardNumber}
      </Text>
    </View>
  );
};

const ItemAmount = ({ item, index }) => {
  return (
    <Text fontSize={17} style={{ fontWeight: "700" }}>
      $ {formatMoney(item)}
    </Text>
  );
};

const Save = ({ onSubmit, disabled }) => (
  <View style={styles.button_transfer}>
    <ButtonSubmit
      title="Save"
      width={160}
      onSubmit={onSubmit}
      disabled={disabled}
      backgroundColor={!disabled ? "#0764B0" : "#EEEEEE"}
      textColor={!disabled ? "#FFF" : "#585858"}
    />
  </View>
);

const EmptyCard = ({ onPress }) => {
  return (
    <View style={styles.container_select_amount}>
      <Text fontSize={15} color="#888888">
        From this card
      </Text>

      <Button onPress={onPress} style={styles.button_select}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.icon_card} />
          <Text fontSize={15} style={{ marginLeft: scaleSize(10) }}>
            Press in here to add new card
          </Text>
        </View>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height: scaleSize(heightPopup),
    backgroundColor: "#FFF",
    alignItems: "center",
    borderRadius: scaleSize(10),

  },
  containerScrollview: {
    height: scaleSize(heightPopup),
    backgroundColor: "white",
    marginLeft: scaleSize(15)
  },
  header: {
    width: "100%",
    paddingHorizontal: scaleSize(16),
    height: scaleSize(55),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1.5,
    borderColor: "#eeeeee",
  },

  icon_close: {
    width: scaleSize(18),
    height: scaleSize(18),
    resizeMode: "contain",
  },

  space: {
    marginBottom: scaleSize(28),
  },

  container_item_card: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  image_card: {
    width: scaleSize(48),
    height: scaleSize(28),
    resizeMode: "contain",
    marginRight: scaleSize(15),
  },
  button_transfer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  container_select_amount: {
    width: scaleSize(382),
    height: scaleSize(60),
    justifyContent: "space-between",
    paddingBottom: scaleSize(15),
    borderBottomWidth: 1.5,
    borderBottomColor: "#EEEEEE",
  },
  cotent: {
    height: "100%",
    justifyContent: "space-between",
    marginLeft: scaleSize(15),
  },
  icon: {
    width: scaleSize(18),
    height: scaleSize(18),
    resizeMode: "contain",
  },
  icon_card: {
    width: scaleSize(48),
    height: scaleSize(28),
    backgroundColor: "grey",
  },
  button_select: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  container_switch: {
    width: scaleSize(382),
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: scaleSize(15),
  },
  space: {
    marginVertical: scaleSize(12),
  },
  textTitle: {
    fontSize: scaleSize(17),
    color: "#888888"
  },
  input: {
    width: scaleSize(382),
    height: scaleSize(36),
  },
  text_input: {
    fontSize: scaleSize(17),
    color: "#404040",
    fontWeight: "bold",
    paddingVertical: 10,
  },
  containerViewMoneySelect: {
    width: width,
  },
  view_choose_money:{
    backgroundColor: '#f1f1f1',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: scaleSize(30),
    paddingBottom: scaleSize(10),
    paddingTop: scaleSize(10),
    width: width,
  },
});
