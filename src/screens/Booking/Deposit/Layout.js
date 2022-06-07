import { NavigationHeader } from '@shared/components';
import { default as ICONS, default as images } from 'assets';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { formatNumberFromCurrency, formatMoney } from 'utils';

export const Layout = ({
  onBack,
  onClose,
  appointment,
  calcDepositAmount,
  depositPercent,
  myCard,
  onReloadCard,
  onPayment,
  isDepositAppointment,
  loadingPage,
}) => {
  const { amount, userCardId, imageUrl } = myCard || {};
  const depositAmount = calcDepositAmount();

  const isReload =
    formatNumberFromCurrency(depositAmount) > formatNumberFromCurrency(amount);

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
          <TouchableOpacity onPress={onClose}>
            <Image source={images.close_header} style={styles.iconTop} />
          </TouchableOpacity>
        </View>
      </NavigationHeader>

      {/**Contents*/}
      <View>
        <View style={styles.margin} />
        {/* Appointment  */}
        <View style={styles.bgContent}>
          <Row>
            <Text style={styles.text}>Subtotal</Text>
            <View style={{ flex: 1 }} />
            <Text
              style={[
                styles.text,
                { fontWeight: '600', fontSize: scaleFont(16) },
              ]}>
              {`$ ${formatMoney(appointment?.subTotal ?? 0)}`}
            </Text>
          </Row>

          <Row>
            <Text style={styles.text}>Discount</Text>
            <View style={{ flex: 1 }} />
            <Text style={styles.text}>
              {`$ -${formatMoney(appointment?.discount ?? 0)}`}
            </Text>
          </Row>

          <Row>
            <Text style={styles.text}>Tax</Text>
            <View style={{ flex: 1 }} />
            <Text style={styles.text}>
              {`$ ${formatMoney(appointment?.tax ?? 0)}`}
            </Text>
          </Row>

          <Row>
            <Text
              style={[
                styles.text,
                {
                  fontWeight: '600',
                  fontSize: scaleFont(18),
                  color: '#0764B0',
                },
              ]}>
              Total
            </Text>
            <View style={{ flex: 1 }} />
            <Text
              style={[
                styles.text,
                {
                  fontWeight: '600',
                  fontSize: scaleFont(18),
                  color: '#0764B0',
                },
              ]}>
              {`$ ${formatMoney(appointment?.total ?? 0)}`}
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
              {`Deposit amount (${formatNumberFromCurrency(depositPercent)}%)`}
            </Text>
            <View style={{ flex: 1 }} />
            <Text style={[styles.text, { color: '#0764B0' }]}>{`$ ${formatMoney(
              depositAmount,
            )}`}</Text>
          </Row>
        </View>
        <View style={styles.margin} />
        <View style={styles.margin} />

        {/* Card */}
        <View style={styles.bgContent}>
          <Text>Primary Card</Text>
          <View style={styles.margin} />

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FastImage
              style={styles.imageCard}
              source={
                imageUrl
                  ? { uri: imageUrl, priority: FastImage.priority.high }
                  : ICONS.primary_card
              }
            />
            <View style={styles.margin} />
            <View
              style={{
                alignItems: 'flex-start',
                justifyContent: 'space-evenly',
                flex: 1,
              }}>
              <Text
                style={[
                  styles.textCard,
                  {
                    fontWeight: '400',
                    marginBottom: scaleHeight(5),
                  },
                ]}>{`My card - ${userCardId}`}</Text>
              <Text
                style={[
                  styles.textCard,
                  {
                    fontWeight: '500',
                  },
                ]}>{`$ ${amount}`}</Text>
            </View>
            {isReload && (
              <TouchableOpacity
                onPress={onReloadCard}
                style={{ flexDirection: 'row', padding: scaleWidth(10) }}>
                <Image
                  source={ICONS.auto_reload_detail}
                  style={{
                    width: scaleWidth(16),
                    height: scaleHeight(16),
                    tintColor: 'red',
                  }}
                />
                <Text
                  style={{
                    marginLeft: scaleWidth(5),
                    color: 'red',
                    fontSize: scaleFont(13),
                    fontWeight: '300',
                  }}>
                  Reload
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.margin} />
        <View style={styles.margin} />
        {/* Notice */}
        {isReload && (
          <View style={[styles.bgContent, { backgroundColor: '#f662' }]}>
            <Text
              style={{
                color: 'red',
                fontSize: scaleFont(13),
                fontWeight: '300',
              }}>
              Your card is not enough to pay, Please reload your card.
            </Text>
          </View>
        )}
      </View>

      {/* Button Pay */}
      <View style={styles.bottom}>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: isReload ? '#ddd' : '#0764B0' },
          ]}
          disabled={isReload}
          onPress={onPayment}>
          {isDepositAppointment || loadingPage ? (
            <ActivityIndicator size={'small'} color="white" />
          ) : (
            <Text
              style={[
                styles.textStyle,
                { color: isReload ? 'black' : 'white' },
              ]}>
              Pay
            </Text>
          )}
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
    backgroundColor: '#fff',
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

  textCard: {
    fontSize: scaleFont(15),
  },

  bgContent: {
    backgroundColor: '#eee',
    marginHorizontal: scaleWidth(10),
    borderRadius: scaleWidth(6),
    padding: scaleHeight(10),
    borderColor: '#ddd8',
    borderWidth: 1,
  },

  margin: {
    height: scaleHeight(20),
    width: scaleWidth(10),
  },

  text: {
    fontSize: scaleFont(16),
    fontWeight: '500',
    color: '#4d4d4d',
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

  imageCard: {
    width: scaleWidth(90),
    height: scaleHeight(60),
    resizeMode: 'contain',
    borderRadius: scaleWidth(4),
  },
});
