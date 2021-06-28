import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { scaleWidth } from "utils";
import AntDesign from "react-native-vector-icons/AntDesign";
import { TextInputMask } from "react-native-masked-text";

export default function index(props) {
  const {
    label = "",
    placeholder = "",
    isForce = false,
    isLabel = false,
    width = "100%",
    value = "",
    onChange,
    error,
    optionsMask,
    onPress,
  } = props;

  return (
    <View style={{ width, marginTop: scaleWidth(7) }}>
      {isLabel && (
        <Text style={{ fontSize: scaleWidth(4), color: "#585858" }}>
          <Text>{label}</Text>
          {isForce && <Text style={{ fontSize: scaleWidth(4), color: "red" }}>*</Text>}
        </Text>
      )}

      {!isLabel && <Text style={{ fontSize: scaleWidth(4), color: "#585858" }}> </Text>}

      <TouchableOpacity
        onPress={onPress}
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "#C5C5C5",
          paddingBottom: scaleWidth(1),
          marginTop: scaleWidth(3.5),
          fontSize: scaleWidth(3.7),
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <Text>{value}</Text>
        <AntDesign name="caretdown" color="#585858" size={scaleWidth(3)} />
      </TouchableOpacity>
      {error && <Text style={{ color: "red", fontSize: scaleWidth(3.5) }}>{error}</Text>}
    </View>
  );
}
