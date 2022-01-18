import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { scaleWidth, scaleHeight } from 'utils';
import LinearGradient from 'react-native-linear-gradient';
import Configs from '@src/configs';

const {
  COLORS: { DRAWER, COLOR_MAIN_APP },
} = Configs;

export default class ProgressBar extends Component {
  render() {
    const { colorTrack, percent = 0, colorThumb, style } = this.props;
    return (
      <View style={[styles.track, { backgroundColor: colorTrack, style }]}>
        <LinearGradient
          colors={[COLOR_MAIN_APP, DRAWER]}
          style={styles.thumb(percent, colorThumb)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    height: scaleHeight(0.85),
    borderRadius: scaleWidth(5),
    borderWidth: 0,
  },
  thumb: (percent, colorThumb) => {
    return {
      width: `${percent}%`,
      height: '100%',
      backgroundColor: colorThumb,
      borderRadius: scaleWidth(12),
      borderWidth: 0,
    };
  },
});
