import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { scaleWidth, scaleHeight } from "utils";

export default class ProgressBar extends Component {
  render() {
    const { colorTrack, percent, colorThumb, style } = this.props;
    return (
      <View style={[styles.track, { backgroundColor: colorTrack, style }]}>
        <View style={styles.thumb(percent, colorThumb)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  track: {
    width: "70%",
    height: scaleHeight(1.3),
    borderRadius: scaleWidth(5),
    borderWidth: 0,
  },
  thumb: (percent, colorThumb) => {
    return {
      width: percent,
      height: "100%",
      backgroundColor: colorThumb,
      borderRadius: scaleWidth(5),
      borderWidth: 0,
    };
  },
});
