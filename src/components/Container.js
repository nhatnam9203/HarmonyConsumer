import React from "react";
import { View, Platform } from "react-native";
import { getBottomSpace, isIphoneX } from "react-native-iphone-x-helper";
import StatusBar from "./StatusBar";

import PropTypes from "prop-types";

const BOTTOM_HEIGHT = Platform.OS === "ios" ? (isIphoneX() ? getBottomSpace() : 15) : 15;
export default function Container(props) {
  const {
    showStatusBar,
    style,
    backgroundColor = "#F8F8F8",
    barStyle = "light-content",
    paddingBottom = BOTTOM_HEIGHT,
  } = props;
  return (
    <View
      style={{
        flex: 1,
        paddingBottom,
        backgroundColor: "#FFF",
      }}>
      {showStatusBar && <StatusBar backgroundColor={backgroundColor} barStyle={barStyle} />}
      <View
        style={[
          {
            flex: 1,
          },
          style,
        ]}>
        {props.children}
      </View>
    </View>
  );
}
Container.propTypes = {
  showStatusBar: PropTypes.bool,
  padder: PropTypes.bool,
};
Container.defaultProps = {
  showStatusBar: true,
  padder: true,
};
