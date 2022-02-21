import { getUserCardById, useAxiosQuery } from '@apis';
import ICONS from 'assets';
import React from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import QRCode from 'react-native-qrcode-svg';
import { useSelector } from 'react-redux';

export const HarmonyCard = ({ cardId }) => {
  const flipAnimation = React.useRef(new Animated.Value(0)).current;
  let flipRotation = 0;
  flipAnimation.addListener(({ value }) => (flipRotation = value));

  const flipToFrontStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 180],
          outputRange: ['0deg', '180deg'],
        }),
      },
    ],
  };
  const flipToBackStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 180],
          outputRange: ['180deg', '360deg'],
        }),
      },
    ],
  };

  const flipToFront = () => {
    Animated.timing(flipAnimation, {
      toValue: 180,
      duration: 350,
    }).start();
  };
  const flipToBack = () => {
    Animated.timing(flipAnimation, {
      toValue: 0,
      duration: 250,
    }).start();
  };

  const [loading, getUserCard] = useAxiosQuery({
    ...getUserCardById(cardId),
    enabled: false,
    onSuccess: (data, response) => {
      setCard(data);
    },
  });

  const card_detail = useSelector(state => state.cardReducer.card_detail);

  const [card, setCard] = React.useState(null);

  React.useEffect(() => {
    if (cardId) {
      getUserCard();
    }
  }, [cardId]);

  React.useEffect(() => {
    if (card?.userCardId === card_detail?.userCardId) {
      getUserCard();
    }
  }, [card_detail?.userCardId]);

  const { amount = 0, userCardId, imageUrl, token } = card || {};

  return (
    <Pressable onPress={() => (!!flipRotation ? flipToBack() : flipToFront())}>
      <View style={styles.cardWrapper}>
        <Animated.View
          style={[styles.container, styles.cardFront, flipToFrontStyle]}>
          <View style={styles.content}>
            <CardImage imageUrl={imageUrl} />
          </View>
          <View style={styles.amountContent}>
            <Text style={styles.amountText}>{`$ ${amount}`}</Text>
          </View>
        </Animated.View>

        <Animated.View
          style={[styles.container, styles.cardBack, flipToBackStyle]}>
          <View style={styles.content}>
            <QRCode value={`${token ?? 'none'}`} size={165} />
            <View style={styles.margin} />
            <Text style={styles.paymentCodeText}>{'Payment code'}</Text>
          </View>
        </Animated.View>
      </View>
      <View style={styles.margin} />
      <NoticeText />
    </Pressable>
  );
};

const CardImage = React.memo(({ imageUrl }) => {
  return (
    <FastImage
      style={styles.imageCard}
      source={
        imageUrl
          ? { uri: imageUrl, priority: FastImage.priority.normal }
          : ICONS.card_sample
      }
    />
  );
});

const NoticeText = React.memo(() => {
  return <Text style={styles.noticeText}>{'Click on the card to flip!'}</Text>;
});

const styles = StyleSheet.create({
  container: {
    width: scaleWidth(382),
    height: scaleHeight(232),
    borderRadius: 5,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowOpacity: 1,
    backgroundColor: '#fff',
  },

  imageCard: {
    width: '100%',
    height: scaleHeight(232),
    resizeMode: 'contain',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  amountContent: {
    height: scaleHeight(40),
    minWidth: scaleWidth(115),
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
    top: scaleHeight(10),
    right: scaleWidth(10),
    justifyContent: 'center',
    alignItems: 'center',
  },

  amountText: {
    fontFamily: 'SFProDisplay-Bold',
    fontSize: scaleFont(18),
    fontStyle: 'normal',
    fontWeight: 'bold',
    letterSpacing: -0.5,
    textAlign: 'right',
    color: '#2ebe03',
  },

  cardWrapper: {},
  cardFront: {
    // position: 'absolute',
    backfaceVisibility: 'hidden',
  },
  cardBack: {
    position: 'absolute',
    backfaceVisibility: 'hidden',
  },
  paymentCodeText: {
    fontSize: scaleFont(15),
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: '#585858',
  },

  margin: {
    width: scaleWidth(15),
    height: scaleHeight(10),
  },

  noticeText: {
    fontSize: scaleFont(12),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
    color: '#888888',
    alignSelf: 'center',
  },
});
