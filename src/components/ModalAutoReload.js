import React from "react";
import { StyleSheet, Dimensions, View, Image } from "react-native";

import * as RootNavigation from "navigations/RootNavigation";
import { formatMoney, isEmpty, scaleSize, getImageCard } from "utils";
import ICONS from "assets";
import {
  Modal,
  Text,
  Button,
  ModalBottomSelect,
  ButtonSelect,
  ButtonSelectCard,
  Switch,
} from "components";
import { ButtonSubmit } from "./Form";

const amounts = [10, 20, 50, 100, 500];
const balances = [10, 20, 50, 100];
const { width } = Dimensions.get("window");

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
  const [isVisibleAmount, setIsVisibleAmount] = React.useState(false);
  const [isVisibleBalance, setIsVisibleBalance] = React.useState(false);
  const [isVisiblePayment, setIsVisiblePayment] = React.useState(false);
  const [amount, setAmount] = React.useState(amounts[0]);
  const [balance, setBalance] = React.useState(balances[0]);
  const [payment, setPayment] = React.useState(null);

  const cardNumber = payment ? `x${payment.cardNumber}` : "Select payment";
  const url_payment = payment ? (payment.bankAcountId ? "bank" : payment.type) : "";
  const disabled_submit = payment ? false : true;

  React.useEffect(() => {
    setAmount(isAutoReload == 1 ? autoReloadAmount : amounts[0]);
    setBalance(isAutoReload == 1 ? autoReloadBelow : balances[0]);
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

  const handleOnChangeSelectAmount = React.useCallback(
    (index, item) => {
      setAmount(item);
      setTimeout(() => {
        setIsVisibleAmount(false);
      }, 200);
    },
    [amount],
  );

  const handleOnChangeSelectBalance = React.useCallback(
    (index, item) => {
      setBalance(item);
      setTimeout(() => {
        setIsVisibleBalance(false);
      }, 200);
    },
    [balance],
  );

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

  const onHandleSubmit = () => {
    let body = {
      autoReloadAmount: amount,
      autoReloadBankId: payment.bankAcountId ? payment.userCardTokenId : 0,
      autoReloadBelow: balance,
      autoReloadCardId: !payment.bankAcountId ? payment.userCardTokenId : 0,
      isAutoReload: Number(statusAuto),
    };
    onSubmit(body);
  };

  const goToAddNewPayment = () => {
    onRequestClose();
    setTimeout(() => {
      RootNavigation.navigate("AddPayment");
    }, 250);
  };

  return (
    <Modal onRequestClose={onRequestClose} isVisible={isVisible}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text fontSize={20} fontFamily="bold">
            Edit auto reload
          </Text>
          <Button onPress={onRequestClose}>
            <Image source={ICONS["close_header"]} style={styles.icon_close} />
          </Button>
        </View>

        {/* ------------ Switch auto reload ----------------- */}
        <View style={styles.container_switch}>
          <Text fontSize={17} color="#585858" fontFamily="bold">
            Auto reload
          </Text>

          <Switch value={statusAuto} onValueChange={handleOnChange} />
        </View>
        {/* ------------ Switch auto reload ----------------- */}

        {/* ------------ Select Reload amount ----------------- */}
        <View style={styles.space} />
        <ButtonSelect
          title="Reload amount"
          value={`$ ${formatMoney(amount)}`}
          onPress={toggleAmount}
        />
        <ModalBottomSelect
          title="Reload amount"
          isVisible={isVisibleAmount}
          onRequestClose={toggleAmount}
          onCloseModal={toggleAmount}
          data={amounts}
          onSelect={handleOnChangeSelectAmount}
          value={amount}
          renderItem={(item) => <ItemAmount item={item} />}
        />
        {/* ------------ Select Reload amount ----------------- */}

        {/* ------------ Select balance ----------------- */}
        <View style={styles.space} />
        <ButtonSelect
          title="When balance below"
          value={`$ ${formatMoney(balance)}`}
          onPress={toggleBalance}
        />
        <ModalBottomSelect
          title="When balance below"
          isVisible={isVisibleBalance}
          onRequestClose={toggleBalance}
          onCloseModal={toggleBalance}
          data={balances}
          onSelect={handleOnChangeSelectBalance}
          value={balance}
          renderItem={(item) => <ItemAmount item={item} />}
        />
        {/* ------------ Select balance ----------------- */}

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
        {/* ------------ Payment ----------------- */}

        <Save onSubmit={onHandleSubmit} disabled={disabled_submit} />
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
    height: scaleSize(453),
    backgroundColor: "#FFF",
    alignItems: "center",
    borderRadius: scaleSize(10),
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
    alignItems: "flex-end",
    paddingRight: scaleSize(16),
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
});
