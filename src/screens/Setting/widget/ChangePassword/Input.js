import React from "react";
import { Text, View } from "react-native";
import { scaleWidth } from "utils";
import { TextInputMask } from "react-native-masked-text";

export default function index(props) {
  const {
    label = "",
    placeholder = "",
    width = "100%",
    value,
    onChange,
    error,
    optionsMask,
  } = props;

  return (
    <View style={{ width, marginTop: scaleWidth(7) }}>
      <Text style={{ fontSize: scaleWidth(3.5), color: "#585858" }}>
        <Text>{label}</Text>
      </Text>

      <TextInputMask
        value={value}
        onChangeText={onChange}
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "#EEEEEE",
          paddingBottom: scaleWidth(1),
          marginTop: scaleWidth(4),
        }}
        secureTextEntry={true}
        type="custom"
        options={optionsMask}
        placeholder={placeholder}
        placeholderTextColor="#A9A9A9"
      />
      {error && <Text style={{ color: "red", fontSize: scaleWidth(3.5) }}>{error}</Text>}
    </View>
  );
}
