import React, { useState } from "react";
import { Text, View, TextInput } from "react-native";
import { scaleWidth } from "utils";
import { TextInputMask } from "react-native-masked-text";

export default function index(props) {
  const {
    label = "",
    placeholder = "",
    isForce = false,
    isLabel = false,
    width = "100%",
    value,
    onChange,
    error,
    optionsMask,
    disabled = false,
  } = props;

  // console.log({ disabled });

  return (
    <View style={{ width, marginTop: scaleWidth(7) }}>
      {isLabel && (
        <Text style={{ fontSize: scaleWidth(4), color: "#585858" }}>
          <Text>{label}</Text>
          {isForce && <Text style={{ fontSize: scaleWidth(4), color: "red" }}>*</Text>}
        </Text>
      )}

      {!isLabel && <Text style={{ fontSize: scaleWidth(4), color: "#585858" }}> </Text>}

      <TextInputMask
        value={value}
        autoCapitalize={false}
        onChangeText={disabled ? () => {} : onChange}
        style={{
          borderBottomWidth: 1,
          borderBottomColor: disabled ? "#eeeeee" : "#C5C5C5",
          paddingBottom: scaleWidth(1),
          marginTop: scaleWidth(3.5),
          fontSize: scaleWidth(3.7),
          color: disabled ? "#eeeeee" : "#585858",
        }}
        type="custom"
        options={optionsMask}
        placeholder={placeholder}
        placeholderTextColor="#A9A9A9"
      />
      {error && <Text style={{ color: "red", fontSize: scaleWidth(3.5) }}>{error}</Text>}
    </View>
  );
}
