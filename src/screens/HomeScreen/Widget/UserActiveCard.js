import ICONS from 'assets';
import { Text } from 'components';
import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import { getMerchantText } from 'utils';

export const UserActiveCard = ({ card, onPress }) => {
  const { amount = 0, userCardId, imageUrl } = card || {};
  const { cards } = useSelector(state => state.cardReducer) || {};
  const onCardPress = () => {
    if (onPress && typeof onPress === 'function') {
      onPress(card);
    }
  };

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onCardPress}>
      {cards && cards.length > 0 ?
      <View>
        <FastImage
          style={styles.imageCard}
          source={
            imageUrl
              ? { uri: imageUrl, priority: FastImage.priority.high }
              : ICONS.card_sample
          }
        />
        <View style={styles.amountContent}>
          <Text style={styles.amountText}>{`$ ${amount}`}</Text>
        </View>
        {getMerchantText(card) 
          ? <Text style={styles.merchantText}
            numberOfLines={1}
            ellipsizeMode={'tail'}>
            {getMerchantText(card)}
            </Text> 
          : <></>
        }
      </View>
      : 
      <View style={styles.viewWelcome}>
        <Text style={styles.welcomeText}>
          Welcome to 
          <Text style={styles.hightlightText}> HarmonyPay! </Text> 
          To use the full functions, please add a Gift card
        </Text>
        <Image 
          style={styles.iconWelcome} 
          source={ICONS.welcome}
          resizeMode={'contain'}/>
      </View>
      }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    // height: scaleHeight(264),
    padding: scaleWidth(16),
  },
  imageCard: {
    width: '100%',
    height: scaleHeight(232),
    resizeMode: 'contain',
  },
  amountContent: {
    height: scaleHeight(40),
    minWidth: scaleWidth(100),
    borderRadius: scaleHeight(20),
    backgroundColor: '#ffffff',
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: scaleHeight(3),
    },
    shadowRadius: 6,
    shadowOpacity: 1,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ffffff',
    position: 'absolute',
    top: scaleHeight(25),
    right: scaleWidth(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  amountText: {
    fontFamily: 'SFProDisplay-Bold',
    fontSize: scaleFont(21),
    fontStyle: 'normal',
    letterSpacing: -0.5,
    textAlign: 'right',
    color: '#2ebe03',
  },
  viewWelcome: {
    width: '100%',
    height: scaleHeight(224),
    padding: scaleWidth(16),
    backgroundColor: '#ffffff',
    shadowColor: '#C0C0C0',
    shadowOffset: {
      width: 0,
      height: scaleHeight(3),
    },
    shadowRadius: 10,
    shadowOpacity: 1,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ffffff',
    alignItems: 'center',
    elevation: 3,
  },
  welcomeText: {
    fontSize: scaleFont(15),
    fontStyle: 'normal',
  },
  merchantText: {
    fontSize: scaleFont(15),
    fontStyle: 'normal',
    color: '#646464',
    marginTop: scaleHeight(10),
    marginBottom: scaleHeight(15),
    marginLeft: scaleWidth(10),
    marginRight: scaleWidth(10)
  },
  hightlightText: {
    fontSize: scaleFont(15),
    fontStyle: 'normal',
    color: '#0764b0',
  },
  iconWelcome: {
    width: scaleWidth(150),
    height: scaleHeight(120),
    marginTop: scaleHeight(15)
  },
});
