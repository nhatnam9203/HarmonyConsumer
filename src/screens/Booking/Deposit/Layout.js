import { NavigationHeader } from '@shared/components';
import React from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import images from 'assets';
import { formatNumberFromCurrency } from 'utils';

export const Layout = ({
  onBack,
  close,
  appointment,
  calcDepositAmount,
  depositPercent,
}) => {
  return (
    <View style={styles.container}>
      {/** Navigation Bar*/}
      <NavigationHeader>
        <View style={styles.toolBar}>
          <TouchableOpacity onPress={onBack}>
            <Image source={images.arrow_back_ios} style={styles.iconTop} />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={styles.textStyle}>Make a deposit</Text>
          </View>
          <TouchableOpacity onPress={close}>
            <Image source={images.close_header} style={styles.iconTop} />
          </TouchableOpacity>
        </View>
      </NavigationHeader>
      {/** Navigation Bar*/}
      <View>
        <View style={styles.margin} />
        <View style={styles.bgContent}>
          <Row>
            <Text style={styles.text}>Appointment total</Text>
            <View style={{ flex: 1 }} />
            <Text style={styles.text}>
              {`$ ${formatNumberFromCurrency(appointment?.total ?? 0)}`}
            </Text>
          </Row>
          <View
            style={{
              height: 1,
              backgroundColor: '#ddd8',
              width: '100%',
              marginVertical: scaleHeight(5),
            }}
          />
          <Row>
            <Text style={[styles.text, { color: '#0764B0' }]}>
              {`Deposit amount (${depositPercent}%)`}
            </Text>
            <View style={{ flex: 1 }} />
            <Text
              style={[
                styles.text,
                { color: '#0764B0' },
              ]}>{`$ ${formatNumberFromCurrency(calcDepositAmount())}`}</Text>
          </Row>
        </View>
      </View>

      <View style={styles.bottom}>
        <TouchableOpacity style={styles.button}>
          <Text style={[styles.textStyle, { color: 'black' }]}>Pay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Row = ({ children, style }) => {
  return (
    <View
      style={[
        style,
        {
          flexDirection: 'row',
          paddingVertical: scaleHeight(10),
        },
      ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: '#feffff',
  },

  toolBar: {
    marginTop: scaleHeight(10),
    height: scaleHeight(50),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaleWidth(15),
  },

  iconTop: {
    width: scaleWidth(18),
    height: scaleHeight(18),
    resizeMode: 'contain',
    tintColor: '#ffffff',
  },

  textStyle: {
    color: 'white',
    fontSize: scaleFont(18),
    fontWeight: '600',
  },

  bgContent: {
    backgroundColor: '#eee6',
    marginHorizontal: scaleWidth(10),
    borderRadius: scaleWidth(6),
    padding: scaleHeight(10),
    borderColor: '#ddd8',
    borderWidth: 1,
  },

  margin: {
    height: scaleHeight(20),
  },

  text: {
    fontSize: scaleFont(15),
    fontWeight: '500',
  },

  bottom: {
    height: scaleHeight(150),
    width: '100%',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    width: '90%',
    height: scaleHeight(50),
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaleWidth(4),
  },
});
