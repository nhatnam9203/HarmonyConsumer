import React, { useRef } from "react";
import { TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
export default function ButtonComponent(props) {
  const {
    onPress,
    defaultStyle,
    style,
    children,
    hitSlop = { top: 20, bottom: 20, left: 20, right: 20 },
    ...anyProps
  } = props;
  const clickingTimeoutRef = useRef(null);
  const onHandleClick = () => {
    if (!onPress) return;
    // if (clickingTimeoutRef.current) {
    //   clearTimeout(clickingTimeoutRef.current);
    // }
    // clickingTimeoutRef.current = setTimeout(() => {
    //   onPress();
    // }, 300);
    onPress();
  };
  return (
    <TouchableOpacity
      onPress={onHandleClick}
      activeOpacity={1}
      hitSlop={hitSlop}
      style={[defaultStyle, style]}
      {...anyProps}>
      {children}
    </TouchableOpacity>
  );
}
ButtonComponent.propTypes = {
  onPress: PropTypes.func,
  defaultStyle: PropTypes.any,
  style: PropTypes.any,
};
ButtonComponent.defaultProps = {
  onPress: null,
  defaultStyle: {
    alignItems: "center",
    justifyContent: "center",
  },
  style: {},
};
