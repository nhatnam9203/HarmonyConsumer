import React, { useMemo } from 'react';
import {
  StyleSheet,
  Dimensions,
  ImageBackground,
  View,
  Image,
} from 'react-native';
import ICONS from 'assets';
import { scaleSize } from 'utils';
import { Text, Button, StatusBar } from 'components';
import { useSelector } from 'react-redux';
import * as RootNavigation from 'navigations/RootNavigation';

const { width } = Dimensions.get('window');

export default function Header({ openDrawer, reloadView }) {
  let { count } = useSelector(state => state.inboxReducer);
  const userInfo = useSelector(state => state.datalocalReducer.userInfo);
  const userName = useMemo(() => {
    return userInfo && userInfo.fullName ? userInfo.fullName : '';
  }, [userInfo]);

  const openInbox = () => {
    RootNavigation.navigate('Inbox');
  };

  const getUserStar = () => {
    return userInfo?.availableRewardPoint ?? 0;
  };

  return (
    <ImageBackground
      source={ICONS['header_home']}
      style={[styles.container_img_background]}>
      <StatusBar barStyle="light-content" />
      <View style={[styles.container_navigation]}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <Button onPress={openDrawer}>
            <Image source={ICONS['drawer']} style={styles.icon_drawer} />
          </Button>

          <Text
            fontSize={20}
            color="#FFFF"
            style={{ fontWeight: '500', marginLeft: scaleSize(15) }}>
            {`Hello ${userName}!`}
          </Text>
        </View>
        <Button onPress={reloadView} style={{ marginRight: 16 }}>
          <Image source={ICONS['reload']} style={styles.icon_drawer} />
        </Button>

        <Button style={{ position: 'relative' }} onPress={openInbox}>
          <Image source={ICONS['tone']} style={styles.icon_tone} />
          {count > 0 && (
            <View style={styles.iconNotify}>
              <Text style={styles.txtNotify}>{count > 99 ? '99+' : count}</Text>
            </View>
          )}
        </Button>
      </View>
      <View style={styles.pointContent}>
        <Text style={styles.pointText}>{getUserStar()}</Text>
        <View style={styles.margin} />
        <Image source={ICONS.star} resizeMode={'center'} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container_img_background: {
    width,
    height: scaleHeight(160),
    alignItems: 'center',
  },
  container_navigation: {
    width: width * 0.9,
    height: scaleSize(44),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: scaleSize(20),
  },
  icon_drawer: {
    width: scaleSize(20),
    height: scaleSize(18),
    tintColor: '#FFF',
    // resizeMode: 'contain'
  },
  icon_tone: {
    width: scaleSize(16),
    height: scaleSize(20),
    tintColor: '#FFF',
    // resizeMode: 'contain'
  },
  iconNotify: {
    width: scaleSize(19),
    height: scaleSize(19),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 300,
    backgroundColor: 'red',
    position: 'absolute',
    top: -scaleSize(10),
    right: -scaleSize(9),
  },
  txtNotify: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: scaleSize(10),
  },

  pointContent: {
    height: scaleHeight(72),
    width: '100%',
    padding: scaleWidth(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  pointText: {
    fontFamily: 'SFProDisplay-Bold',
    fontSize: scaleFont(34),
    // fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: -0.82,
    textAlign: 'left',
    color: '#ffffff',
  },

  margin: {
    width: scaleWidth(8),
    height: scaleHeight(1),
  },
});
