import React from "react";
import { View, TouchableOpacity } from "react-native";
import { scaleWidth } from "utils";
import { Text } from "components";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function index(props) {
  const {
    label = "",
    isForce = false,
    isLabel = false,
    width = "100%",
    value = "",
    error,
    onPress,
  } = props;

  return (
    <View style={{ width, marginTop: scaleWidth(7) }}>
      {isLabel && (
        <Text style={{ fontSize: scaleWidth(4), color: "#585858" }}>
          <Text
            fontFamily="medium"
            style={{
              fontSize: scaleWidth(4),
              color: "#585858",
              // fontWeight: Platform.OS === "android" ? "bold" : "600",
            }}>
            {label}
          </Text>
          {isForce && <Text style={{ fontSize: scaleWidth(4), color: "red" }}>*</Text>}
        </Text>
      )}

      {!isLabel && <Text style={{ fontSize: scaleWidth(4), color: "#585858" }}> </Text>}

      <TouchableOpacity
        onPress={onPress}
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "#eeeeee",
          paddingBottom: scaleWidth(1),
          marginTop: scaleWidth(3.5),
          fontSize: scaleWidth(3.8),
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <Text style={{ fontSize: scaleWidth(4), color: "#666666" }}>{value}</Text>
        <AntDesign name="caretdown" color="#585858" size={scaleWidth(3)} />
      </TouchableOpacity>
      {error && <Text style={{ color: "red", fontSize: scaleWidth(4) }}>{error}</Text>}
    </View>
  );
}
