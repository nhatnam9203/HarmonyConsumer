import React from "react";
import { View } from "react-native";
import { Text } from "components";
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
    isMessage,
  } = props;

  return (
    <View style={{ width, marginTop: scaleWidth(7) }}>
      {isLabel && (
        <Text style={{ fontSize: scaleWidth(3.8), color: "#585858" }}>
          <Text style={{ fontSize: scaleWidth(3.8) }}>{label}</Text>
          {isForce && <Text style={{ fontSize: scaleWidth(3.8), color: "red" }}> *</Text>}
        </Text>
      )}

      {!isLabel && <Text style={{ fontSize: scaleWidth(3.8), color: "#585858" }}> </Text>}

      <TextInputMask
        value={value}
        onChangeText={onChange}
        multiline={isMessage}
        style={{
          borderWidth: 1,
          borderColor: "#C5C5C5",
          padding: scaleWidth(3),
          paddingBottom: isMessage ? scaleWidth(20) : scaleWidth(3),
          borderRadius: 5,
          marginTop: scaleWidth(4),
          fontSize: scaleWidth(3.8),
          backgroundColor: isMessage ? "#F8F8F8" : "white",
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
