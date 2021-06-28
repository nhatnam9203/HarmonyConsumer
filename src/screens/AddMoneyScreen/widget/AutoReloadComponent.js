import React from "react";
import { StyleSheet, View, Image } from "react-native";
import * as Animatable from "react-native-animatable";

import { scaleSize } from "utils";
import { Text, Button, ModalBottomSelect, Switch } from "components";
import ICONS from "assets";

const amounts = [10, 20, 50, 100, 500];

const balances = [10, 20, 50, 100];

const AutoReloadComponent = ({ amount, balance, selectAmount, selectBalance, isShow, onShow }) => {
  const [isVisibleAmount, setIsVisibleAmount] = React.useState(false);
  const [isVisibleBalance, setIsVisibleBalance] = React.useState(false);
  const [indexAmount, setIndexAmount] = React.useState(-1);
  const [indexBalance, setIndexBalance] = React.useState(-1);

  const handleOnChangeSelectAmount = React.useCallback(
    (index) => {
      setIndexAmount(index);
      selectAmount(amounts[index]);
      setTimeout(() => {
        setIsVisibleAmount(false);
      }, 200);
    },
    [indexAmount],
  );

  const handleOnChangeSelectBalance = React.useCallback(
    (index) => {
      setIndexBalance(index);
      selectBalance(balances[index]);
      setTimeout(() => {
        setIsVisibleBalance(false);
      }, 200);
    },
    [indexBalance],
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
    setIndexBalance(-1);
    selectBalance(0);
    setIndexAmount(-1);
    selectAmount(0);
  };

  const Item = ({ item }) => {
    return (
      <Text fontSize={17} style={{ fontWeight: "700" }}>
        $ {item}
      </Text>
    );
  };

  return (
    <React.Fragment>
      <View style={styles.container_item}>
        <Text fontSize={17} color="#585858" style={{ fontWeight: "500" }}>
          Auto reload
        </Text>

        <Switch value={isShow} onValueChange={handleOnChange} />
      </View>

      <Animatable.View
        animation={isShow ? "fadeIn" : "fadeOut"}
        style={styles.container_content_show}>
        <ButtonSelectAmountComponent
          title="Reload amount"
          value={amount}
          onPress={openModalSelectAmount}
        />
        <ButtonSelectAmountComponent
          title="When balance is below"
          value={balance}
          onPress={openModalSelectBalance}
        />
      </Animatable.View>

      <ModalBottomSelect
        title="Reload amount"
        isVisible={isVisibleAmount}
        onRequestClose={openModalSelectAmount}
        data={amounts}
        onSelect={handleOnChangeSelectAmount}
        value={indexAmount}
        renderItem={(item) => <Item item={item} />}
      />

      <ModalBottomSelect
        title="When balance is below"
        isVisible={isVisibleBalance}
        onRequestClose={openModalSelectBalance}
        data={balances}
        onSelect={handleOnChangeSelectBalance}
        value={indexBalance}
        renderItem={(item) => <Item item={item} />}
      />
    </React.Fragment>
  );
};

const ButtonSelectAmountComponent = ({ title, value, onPress }) => {
  return (
    <React.Fragment>
      <View style={styles.container_select_amount}>
        <Text fontSize={15} color="#888888">
          {title}
        </Text>

        <Button onPress={onPress} style={styles.button_select}>
          <Text fontSize={15} style={{ fontWeight: "bold" }}>
            $ {value.toFixed(2)}
          </Text>

          <Image source={ICONS["arrow_down_amount"]} style={styles.icon} />
        </Button>
      </View>
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
