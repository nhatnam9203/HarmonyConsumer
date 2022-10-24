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
  ScrollView,
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
  cardList,
  onAddCard,
  cardSelected,
  onSelectCard,
}) => {
  const depositAmount = calcDepositAmount();

  const isReload =
    cardSelected &&
    formatNumberFromCurrency(depositAmount) >
      formatNumberFromCurrency(cardSelected?.amount);

  const isDisablePayment = !cardSelected || isReload;

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

        {/* Cards Render */}
        {cardList?.length > 0 ? (
          <CardSelectionComponent
            cardList={cardList}
            depositAmount={depositAmount}
            cardSelected={cardSelected}
            onSelectCard={onSelectCard}
            onReloadCard={onReloadCard}
          />
        ) : (
          <NoCardsComponent onAddCard={onAddCard} />
        )}

        <View style={styles.margin} />
      </View>
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

      {/* Button Pay */}
      <View style={styles.bottom}>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: isDisablePayment ? '#ddd' : '#0764B0' },
          ]}
          disabled={isDisablePayment}
          onPress={onPayment}>
          {isDepositAppointment || loadingPage ? (
            <ActivityIndicator size={'small'} color="white" />
          ) : (
            <Text
              style={[
                styles.textStyle,
                { color: isDisablePayment ? 'black' : 'white' },
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

const NoCardsComponent = ({ onAddCard }) => {
  return (
    <View
      style={{
        width: '100%',
        height: '40%',
        justifyContent: 'center',
        paddingHorizontal: scaleWidth(20),
      }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: scaleHeight(16),
        }}>
        <Text style={styles.title}>{'CARD NOT FOUND.'}</Text>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.content} numberOfLines={2}>
          {
            'Please, click the button to add a card that you can use for future transactions.'
          }
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: scaleHeight(16),
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            borderColor: '#0764B0',
            borderWidth: 1,
            borderRadius: scaleWidth(3),
            padding: scaleWidth(10),
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={onAddCard}>
          <Image
            source={ICONS.add_payment}
            style={{ width: scaleWidth(28), height: scaleHeight(28) }}
          />
          <View style={{ width: scaleWidth(8) }} />
          <Text
            style={{
              fontSize: scaleFont(16),
              color: '#0764B0',
              fontWeight: '500',
            }}>
            {'Add a card'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CardDetailComponent = ({
  item,
  depositAmount,
  selected,
  onSelectCard,
  onReloadCard,
}) => {
  const { userCardId, amount, imageUrl } = item;
  const isReload =
    formatNumberFromCurrency(depositAmount) > formatNumberFromCurrency(amount);

  const _onHandleSelectCard = () => {
    if (onSelectCard && typeof onSelectCard === 'function') {
      onSelectCard(item);
    }
  };

  const _onHandleReloadCard = () => {
    if (onReloadCard && typeof onReloadCard === 'function') {
      onReloadCard(item);
    }
  };

  return (
    <TouchableOpacity
      style={styles.cardContent}
      onPress={_onHandleSelectCard}
      activeOpacity={0.9}>
      <View
        style={{
          width: scaleWidth(30),
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={
            selected ? ICONS.radio_button_active : ICONS.radio_button_inactive
          }
          style={{
            width: scaleWidth(20),
            height: scaleHeight(20),
            tintColor: selected ? '#0764B0' : '#7d7d7d',
          }}
        />
      </View>
      <View style={styles.margin} />

      <FastImage
        style={styles.imageCard}
        source={
          imageUrl
            ? { uri: imageUrl, priority: FastImage.priority.high }
            : ICONS.primary_card
        }
      />
      <View style={styles.margin} />

      <View style={{ alignItems: 'center', flex: 1 }}>
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
      </View>
      {isReload && (
        <TouchableOpacity
          onPress={_onHandleReloadCard}
          style={{
            flexDirection: 'row',
            padding: scaleWidth(6),
            height: '100%',
            alignItems: 'center',

            borderRadius: scaleWidth(3),
          }}>
          <Image
            source={ICONS.auto_reload_detail}
            style={{
              width: scaleWidth(20),
              height: scaleHeight(20),
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
    </TouchableOpacity>
  );
};

const CardSelectionComponent = ({
  cardList,
  depositAmount,
  cardSelected,
  onSelectCard,
  onReloadCard,
}) => {
  return (
    <View
      style={{
        width: '100%',
        height: '40%',
        paddingHorizontal: scaleWidth(10),
      }}>
      <View
        style={{
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          marginVertical: scaleHeight(16),
        }}>
        <Text style={styles.title}>{'Select card to pay'}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          {cardList?.map(x => (
            <CardDetailComponent
              key={`${x.userCardId}`}
              item={x}
              depositAmount={depositAmount}
              selected={x.userCardId === cardSelected?.userCardId}
              onSelectCard={onSelectCard}
              onReloadCard={onReloadCard}
            />
          ))}
        </ScrollView>
      </View>
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

  cardContent: {
    backgroundColor: '#eee',
    marginHorizontal: scaleWidth(10),
    borderRadius: scaleWidth(6),
    padding: scaleHeight(10),
    borderColor: '#ddd8',
    borderWidth: 1,
    flexDirection: 'row',
    height: scaleHeight(80),
    marginVertical: scaleWidth(10),
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

  title: {
    fontSize: scaleFont(18),
    fontWeight: '600',
    color: '#4d4d4d',
  },

  content: {
    fontSize: scaleFont(16),
    fontWeight: 'normal',
    color: '#4d4d4d',
    textAlign: 'center',
  },
});
