import React from "react";
import { Switch } from "react-native";

export default function SwitchCustom({ value, onValueChange, style, disabled, trackColor = {} }) {
  return (
    <Switch
      value={value}
      disabled={disabled}
      onValueChange={onValueChange}
      style={[
        {
          transform: [
            {
              scale: 0.9,
            },
          ],
          opacity: 1,
        },

        style,
      ]}
      trackColor={trackColor}
    />
  );
}
