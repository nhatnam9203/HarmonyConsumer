import { getUserCardById, useAxiosQuery } from '@apis';
import ICONS from 'assets';
import React from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import QRCode from 'react-native-qrcode-svg';
import { useSelector } from 'react-redux';

const DEFAULT_TIMEOUT = 5 * 60; // seconds
const MIN_COUNTER = 10; // seconds

export const HarmonyCard = ({ cardId }) => {
  const timer = React.useRef(null);
  const card_detail = useSelector(state => state.cardReducer.card_detail);
  const [card, setCard] = React.useState(null);
  const [counter, setCounter] = React.useState(null);

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

  const [{ isLoading: getUserCardLoading }, getUserCard] = useAxiosQuery({
    ...getUserCardById(cardId),
    enabled: false,
    onSuccess: (data, response) => {
      setCard(data);
      startTimer(data?.expireTime ?? DEFAULT_TIMEOUT);
    },
  });

  const clearTimer = () => {
    // Handle an undefined timer rather than null
    timer.current !== undefined ? clearInterval(timer.current) : null;
  };

  const startTimer = time => {
    setCounter(time);
    timer.current = setInterval(() => {
      setCounter(prev => prev - 1);
    }, 1000);
  };

  React.useEffect(() => {
    return () => {
      clearTimer();
    };
  }, []);

  React.useEffect(() => {
    if (counter <= MIN_COUNTER) {
      clearTimer();
      if (cardId) {
        getUserCard();
      }
    }
  }, [counter]);

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
            {/* <Text style={styles.paymentCodeText}>{'Payment code'}</Text>
            <View style={styles.margin} /> */}

            <View
              style={{
                flex: 0,
              }}>
              <QRCode value={`${token ?? 'none'}`} size={scaleHeight(150)} />
              {getUserCardLoading && (
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: '#fffd',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <ActivityIndicator
                    loading={getUserCardLoading}
                    size={'small'}
                    color={'#0764B0'}
                  />
                </View>
              )}
            </View>
            <View style={styles.margin} />
            <Text style={styles.paymentCodeText}>Payment code</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: scaleHeight(20),
              }}>
              <Text style={styles.codeExpireText}>{`expire in`}</Text>
              <View
                style={{
                  width: scaleWidth(25),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={[
                    styles.codeExpireText,
                    {
                      color: counter <= 10 ? 'red' : '#0764B0',
                      fontSize: scaleFont(14),
                      fontWeight: '500',
                    },
                  ]}>{`${counter ?? 0}`}</Text>
              </View>
              <Text style={styles.codeExpireText}>{`seconds`}</Text>
            </View>

            <View
              style={[
                styles.amountContent,
                { backgroundColor: 'transparent' },
              ]}>
              <Text style={styles.amountText}>{`$ ${amount}`}</Text>
            </View>
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
        !!imageUrl
          ? { uri: imageUrl, priority: FastImage.priority.high }
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
    height: scaleHeight(250),
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowOpacity: 1,
    elevation: 3,
    padding: 2,
  },

  imageCard: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',

    overflow: 'hidden',
    borderRadius: scaleWidth(6),
  },

  amountContent: {
    height: scaleHeight(34),
    minWidth: scaleWidth(80),
    borderRadius: scaleHeight(17),
    backgroundColor: '#ffffff',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ffffff',
    position: 'absolute',
    top: scaleHeight(8),
    right: scaleWidth(8),
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
    fontSize: scaleFont(17),
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: '#484848',
  },

  codeExpireText: {
    fontSize: scaleFont(12),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: '#484848',
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
