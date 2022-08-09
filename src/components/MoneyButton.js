
import React from "react";
import { StyleSheet, View, Platform, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";

import { formatMoney, scaleSize } from "utils";
import { Text, Button, ModalBottomSelect, Switch, ButtonSelect } from "components";
const amounts = [10, 20, 50, 100, 500];

const balances = [10, 20, 50, 100];

const MoneyButton = ({ amount, onPress }) => {
  return (
    <TouchableOpacity
     style={styles.container}
     onPress={() => onPress(amount)}>
      <Text style={styles.text}> {`$ ${amount}`} </Text>
    </TouchableOpacity>
  );
};

export default MoneyButton;

const styles = StyleSheet.create({
 container: {
  borderRadius: scaleSize(3),
  width: scaleSize(90),
  height: scaleSize(38),
  borderWidth: scaleSize(1),
  borderColor: '#006699',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white',
  marginLeft: scaleSize(7),
 },
 text: {
  color: '#006699',
  fontSize: scaleSize(17),
  fontWeight: '500',
 }
});
