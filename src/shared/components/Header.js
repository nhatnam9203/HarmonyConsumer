import React from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import images from 'assets';
import { isIphoneX, getStatusBarHeight } from 'react-native-iphone-x-helper';

const STATUSBAR_HEIGHT =
  Platform.OS === 'ios'
    ? isIphoneX()
      ? getStatusBarHeight()
      : 20
    : StatusBar.currentHeight;
export const NavigationHeader = ({ children }) => {
  return (
    <ImageBackground
      style={styles.imgBackground}
      source={images.background_reward_profile}>
      <View style={styles.content}>{children}</View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imgBackground: {
    width: '100%',
    paddingTop: STATUSBAR_HEIGHT,
  },

  content: {},
});
