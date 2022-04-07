import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Text } from 'components';
import { scaleWidth, scaleHeight, formatNumberFromCurrency } from 'utils';

export default function Total(props) {
  const { total, totalPaid, status, depositAmount = 0 } = props;

  const deposit = formatNumberFromCurrency(depositAmount);
  return (
    <View style={styles.container}>
      {deposit > 0 && (
        <View style={styles.row}>
          <Text style={{ fontSize: 18, color: 'red' }}>Deposited</Text>
          <Text style={{ fontSize: 18, color: 'red' }}>$ {depositAmount}</Text>
        </View>
      )}

      <View style={styles.row}>
        <Text style={styles.txt}>Total</Text>
        <Text style={styles.txt}>
          $ {status === 'paid' ? totalPaid : total}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: scaleWidth(3),
    backgroundColor: '#FAFAFA',
    marginTop: scaleHeight(3),
  },
  txt: {
    color: '#0764B0',
    fontWeight: Platform.OS === 'android' ? 'bold' : '700',
    fontSize: scaleWidth(4.5),
    // marginTop: scaleHeight(1.5),
  },
  txt2: {
    color: '#6A6A6A',
    fontSize: scaleWidth(4.3),
  },
  row: {
    flexDirection: 'row',
    width: scaleWidth(88),
    justifyContent: 'space-between',
    paddingVertical: scaleHeight(0.5),
  },
});
