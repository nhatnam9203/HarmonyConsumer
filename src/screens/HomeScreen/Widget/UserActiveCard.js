import ICONS from 'assets';
import { Text } from 'components';
import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';

export const UserActiveCard = ({ card, onPress }) => {
  const { amount, userCardId, imageUrl } = card;

  const onCardPress = () => {
    if (onPress && typeof onPress === 'function') {
      onPress(card);
    }
  };

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onCardPress}>
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    height: scaleHeight(264),
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
});
