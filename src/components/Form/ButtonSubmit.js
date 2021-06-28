import React from "react";
import Button from "../Button";
import Text from "../Text";
import PropTypes from "prop-types";
import { scaleSize } from "utils";
import Configs from "configs";
import { Platform } from "react-native";
const {
  COLORS: { COLOR_MAIN_APP, WHITE },
  FONTSIZE: { regular },
} = Configs;
export default function ButtonSubmit(props) {
  const { title, onSubmit, width, height, backgroundColor, textColor, disabled, style, styleText } =
    props;
  return (
    <Button
      disabled={disabled}
      style={[
        {
          width: scaleSize(width),
          height: scaleSize(height),
          backgroundColor,
          borderRadius: 5,
        },
        style,
      ]}
      onPress={onSubmit}>
      <Text
        style={[
          {
            fontWeight: Platform.OS === "ios" ? "600" : "bold",
          },
          styleText,
        ]}
        color={textColor}
        fontSize={regular}>
        {title}
      </Text>
    </Button>
  );
}
ButtonSubmit.propTypes = {
  onSubmit: PropTypes.func,
  title: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
};
ButtonSubmit.defaultProps = {
  onSubmit: null,
  title: "",
  width: 350,
  height: 50,
  backgroundColor: COLOR_MAIN_APP,
  textColor: WHITE,
};
