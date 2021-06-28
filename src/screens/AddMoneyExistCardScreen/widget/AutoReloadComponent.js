import React from "react";
import { StyleSheet, View, Platform } from "react-native";
import * as Animatable from "react-native-animatable";

import { formatMoney, scaleSize } from "utils";
import { Text, Button, ModalBottomSelect, Switch, ButtonSelect } from "components";
const amounts = [10, 20, 50, 100, 500];

const balances = [10, 20, 50, 100];

const AutoReloadComponent = ({ amount, balance, selectAmount, selectBalance, isShow, onShow }) => {
  const [isVisibleAmount, setIsVisibleAmount] = React.useState(false);
  const [isVisibleBalance, setIsVisibleBalance] = React.useState(false);

  const handleOnChangeSelectAmount = React.useCallback(
    (index, item) => {
      selectAmount(item);
      setTimeout(() => {
        setIsVisibleAmount(false);
      }, 200);
    },
    [amount],
  );

  const handleOnChangeSelectBalance = React.useCallback(
    (index, item) => {
      selectBalance(item);
      setTimeout(() => {
        setIsVisibleBalance(false);
      }, 200);
    },
    [balance],
  );

  const handleOnChange = (value) => {
    onShow(value);
    if (!value) clearValue();
  };

  const openModalSelectAmount = React.useCallback(() => {
    setIsVisibleAmount(!isVisibleAmount);
  }, [isVisibleAmount]);

  const openModalSelectBalance = React.useCallback(() => {
    setIsVisibleBalance(!isVisibleBalance);
  }, [isVisibleBalance]);

  const clearValue = () => {
    selectBalance(0);
    selectAmount(0);
  };

  const Item = ({ item, index }) => {
    return (
      <Text fontSize={17} style={{ fontWeight: Platform.OS === "android" ? "bold" : "600" }}>
        $ {formatMoney(item)}
      </Text>
    );
  };

  return (
    <React.Fragment>
      <View style={styles.container_item}>
        <Text fontSize={20} color="#585858" style={{ fontWeight: "500" }}>
          Auto reload
        </Text>

        <Switch value={isShow} onValueChange={handleOnChange} />
      </View>

      <Animatable.View
        animation={isShow ? "fadeIn" : "fadeOut"}
        style={styles.container_content_show}>
        {isShow && (
          <>
            <ButtonSelect
              title="Reload amount"
              value={`$ ${amount}`}
              onPress={openModalSelectAmount}
            />
            <ButtonSelect
              title="When balance is below"
              value={`$ ${balance}`}
              onPress={openModalSelectBalance}
            />
          </>
        )}
      </Animatable.View>

      <ModalBottomSelect
        title="Reload amount"
        isVisible={isVisibleAmount}
        onRequestClose={openModalSelectAmount}
        data={amounts}
        onSelect={handleOnChangeSelectAmount}
        value={amount}
        onCloseModal={() => setIsVisibleAmount(false)}
        renderItem={(item) => <Item item={item} />}
      />
      <ModalBottomSelect
        title="When balance is below"
        isVisible={isVisibleBalance}
        onRequestClose={openModalSelectBalance}
        data={balances}
        onSelect={handleOnChangeSelectBalance}
        value={balance}
        onCloseModal={() => setIsVisibleBalance(false)}
        renderItem={(item) => <Item item={item} />}
      />
    </React.Fragment>
  );
};

export default AutoReloadComponent;

const styles = StyleSheet.create({
  container_item: {
    width: scaleSize(382),
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: scaleSize(15),
  },
  container_content_show: {
    width: scaleSize(382),
    height: scaleSize(130),
    // backgroundColor: 'red',
    marginTop: scaleSize(10),
    justifyContent: "space-between",
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
  button_select: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
