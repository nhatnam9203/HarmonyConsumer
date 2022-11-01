import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import ICONS from 'assets';

const REACTION_TYPES = {
  NOT_GOOD: 'NotGood',
  JUST_OKAY: 'JustOkey',
  AWESOME: 'Awesome',
};

export const AppointmentReview = ({ reviewInfo }) => {
  const { message, images, reaction } = reviewInfo || {};

  const _onHandleRenderImage = ({ item, index }) => {
    const _onHandlePressImage = () => {};
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={{
          width: scaleWidth(110),
          height: scaleHeight(100),
          borderRadius: scaleWidth(11),
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: '#D2D2D2',
        }}
        onPress={_onHandlePressImage}>
        <FastImage
          source={{ uri: item?.imageUrl }}
          style={{
            width: scaleWidth(110),
            height: scaleHeight(100),
            resizeMode: 'contain',
          }}
        />
      </TouchableOpacity>
    );
  };

  const _onRenderReactionView = () => {
    let image;
    let txtMess;
    let txtColor;
    switch (reaction) {
      case REACTION_TYPES.AWESOME:
        image = ICONS.awesome;
        txtMess = 'Awesome';
        txtColor = '#2AC267';
        break;
      case REACTION_TYPES.JUST_OKAY:
        image = ICONS.justOk;
        txtMess = 'JustOkay';
        txtColor = '#FFA800';
        break;
      case REACTION_TYPES.NOT_GOOD:
        image = ICONS.notGood;
        txtMess = 'NotGood';
        txtColor = '#ED4343';
        break;
      default:
        break;
    }

    return (
      <View style={styles.reactionContent}>
        <Image
          source={image}
          style={{
            width: scaleWidth(26),
            height: scaleHeight(26),
            resizeMode: 'contain',
            tintColor: txtColor,
          }}
        />
        <View style={styles.margin} />
        <Text style={[styles.reactText, { color: txtColor }]}>{txtMess}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>My Review</Text>
        {_onRenderReactionView()}
      </View>
      <View style={styles.margin} />
      <Text style={styles.messageText}>{message}</Text>
      <View style={styles.margin} />

      <FlatList
        style={styles.flatList}
        horizontal
        data={images}
        renderItem={_onHandleRenderImage}
        ItemSeparatorComponent={() => (
          <View style={{ width: scaleWidth(10) }} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
  },
  row: { flexDirection: 'row' },
  title: {
    fontSize: scaleFont(18),
    fontWeight: '600',
    color: '#3F3F3F',
    flex: 1,
  },
  reactionContent: {
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reactText: {
    fontSize: scaleFont(14),
    fontWeight: '600',
    color: '#2AC267',
  },
  messageText: {
    fontSize: scaleFont(14),
    fontWeight: '400',
    color: '#404040',
    textAlign: 'justify',
  },
  margin: {
    width: scaleWidth(10),
    height: scaleHeight(10),
  },
  flatList: {
    height: scaleHeight(105),
    width: '100%',
  },
});
