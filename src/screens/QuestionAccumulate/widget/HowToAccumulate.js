import React from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { scaleWidth, slop } from 'utils';
import styles from '../styles';
import images from 'assets';
import { Header, StatusBar } from 'components';
import { ProgressBar2 } from 'components';

export default function HowToAccumulate(props) {
  const back = () => {
    props.navigation.goBack();
  };

  const reviewStore = () => {
    props.goToPage(1);
  };

  const referringFriends = () => {
    props.goToPage(2);
  };

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: '#f8f8f8' }}>
        <StatusBar />
        <Header title="Accummulate Star" headerLeft onBack={back} />
      </View>

      {/* ---------------Item--------------- */}
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View style={styles.body}>
          <Image
            resizeMode="contain"
            style={styles.imgTop}
            source={images.question1}
          />
          <Text
            style={[
              styles.titleHeader,
              { color: '#0764B0', alignSelf: 'center' },
            ]}>
            How to accumulate Star
          </Text>
          <Item
            onPress={reviewStore}
            images={images.question2}
            onPress={reviewStore}
            content="Review Store To Get Point"
            qty="+2"
          />
          <Item
            onPress={referringFriends}
            isRefer={true}
            images={images.question3}
            onPress={referringFriends}
            content="Referring Friend"
            qty="+2"
          />
          <ItemMission />
          <View style={{ height: scaleWidth(80) }} />
        </View>
      </ScrollView>
    </View>
  );
}

const Item = ({ content = '', qty = '', onPress, images, isRefer }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <Image style={styles.imgItem} source={images} />
      <View style={styles.bottomItem}>
        <Text style={styles.txtBottomItem}>{content}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.txtBottomItem2}>{qty}</Text>
          {isRefer && (
            <Image
              style={{
                width: scaleWidth(4.5),
                height: scaleWidth(4.5),
                marginLeft: scaleWidth(2),
              }}
              source={require('assets/Question/dongxu.png')}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ItemMission = () => {
  return (
    <View style={[styles.item, { padding: scaleWidth(3) }]}>
      <Text style={styles.txtBottomItem}>Mission</Text>
      <Text style={styles.txtItem2}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </Text>

      <View style={styles.bodyItem2}>
        <Image
          source={images.bia}
          style={{ width: scaleWidth(7), height: scaleWidth(7) }}
        />
        <ProgressBar2
          colorTrack={'#EEEEEE'}
          colorThumb={'#2EBE03'}
          percent={50}
        />
        <TouchableOpacity style={styles.btnGo}>
          <Text style={styles.txtGo}>Go</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomItem2}>
        <Text style={styles.txtBottomItem}>+10</Text>
        <Image style={styles.img10} source={images.dongxu} />
      </View>
    </View>
  );
};
