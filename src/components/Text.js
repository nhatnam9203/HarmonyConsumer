import React, { Component } from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import { scaleSize } from "utils";
import Cofigs from "../configs";

const fonts = {
  regular: "SFProDisplay-Regular",
  bold: "SFProDisplay-Bold",
  semi: "SFProDisplay-Semibold",
  medium: "SFProDisplay-Medium",
};

export default class TextComponent extends Component {
  render() {
    const { fontSize, color, fontFamily = "regular", style, children, ...anyProps } = this.props;
    const _fontsFamily = fonts[fontFamily];

    return (
      <Text
        style={[
          {
            color,
            fontSize: scaleSize(fontSize),
            fontFamily: _fontsFamily,
          },
          style,
        ]}
        allowFontScaling={false}
        {...anyProps}>
        {children}
      </Text>
    );
  }
}

TextComponent.propTypes = {
  color: PropTypes.string,
  fontSize: PropTypes.number,
  style: PropTypes.any,
};
TextComponent.defaultProps = {
  color: "#585858",
  fontSize: Cofigs.FONTSIZE.small,
  style: {},
};
