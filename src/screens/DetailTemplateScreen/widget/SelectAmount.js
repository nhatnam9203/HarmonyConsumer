import React from "react";
import { StyleSheet, View } from "react-native";

import { scaleSize } from "utils";
import { amounts } from "mocks";
import { Text, Button } from "components";

const SelectAmount = ({ value, onChangeValue }) => {
  const onHandleChangeValue = (value) => () => {
    onChangeValue(value);
  };

  const Item = (item, index) => {
    const { amount } = item;
    const activeBackgoundColor = amount == value ? { backgroundColor: "#0764B0" } : {};
    const activeColorText = amount == value ? "#FFF" : "#0764B0";
    return (
      <Button
        key={index + ""}
        onPress={onHandleChangeValue(amount)}
        style={[styles.button, activeBackgoundColor]}>
        <Text fontSize={15} color={activeColorText} style={{ fontWeight: "bold" }}>
          $ {amount}
        </Text>
      </Button>
    );
  };

  return (
    <React.Fragment>
      <Text fontSize={15} style={{ alignSelf: "flex-start", marginTop: scaleSize(15) }}>
        Amount:
      </Text>

      <View style={styles.container}>{amounts.map(Item)}</View>
    </React.Fragment>
  );
};

export default SelectAmount;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: scaleSize(40),
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: scaleSize(17),
  },
  button: {
    width: scaleSize(70),
    height: scaleSize(40),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#0764B0",
    borderRadius: scaleSize(5),
  },
  icons: {
    width: scaleSize(15),
    height: scaleSize(15),
    tintColor: "#0764B0",
    resizeMode: "contain",
  },
});
