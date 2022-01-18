import React from 'react';
import { View } from 'react-native';
import { Card, Text, Button, LazyImage, ProgressiveImage } from 'components';
import ICONS from 'assets';
import Image from 'react-native-fast-image';
import styles from '../styles';
import Configs from '@src/configs';
const { CARD_WIDTH } = Configs;

const GiftCard = ({ onaddMoney, onAddCard, card }) => {
  const { amount, userCardId, imageUrl } = card;
  return (
    <Card width={CARD_WIDTH} height={234} borderRadius={6} style={styles.card}>
      <View style={styles.header_card}>
        <Text fontSize={17} fontFamily="medium">
          Card {userCardId}
        </Text>
        <Text fontSize={17} color="#2EBE03" fontFamily="bold">
          $ {amount}
        </Text>
      </View>

      <View style={styles.body_card}>
        <View style={styles.body_card_left}>
          <ImageCard imageUrl={imageUrl} />
        </View>

        <View style={styles.body_card_right}>
          <Button onPress={onaddMoney} style={styles.button_add_card}>
            <Image style={styles.icon_button} source={ICONS.card_placeholder} />
            <Text color="#888888" fontSize={10}>
              Add money
            </Text>
          </Button>
          <Button onPress={onAddCard} style={styles.button_add_card}>
            <Image
              style={styles.icon_button}
              source={ICONS.giftcard_placeholder}
            />
            <Text color="#888888" fontSize={10}>
              Add a card
            </Text>
          </Button>
        </View>
      </View>
    </Card>
  );
};

const ImageCard = React.memo(({ imageUrl }) => {
  return (
    <ProgressiveImage
      style={styles.img_card_left}
      source={
        imageUrl
          ? { uri: imageUrl, priority: Image.priority.high }
          : ICONS.card_sample
      }
      thumbnailSource={ICONS.card_sample}
    />
  );
});
export default GiftCard;
