import React from "react";
import { View } from "react-native";
import { scaleWidth } from "utils";
import { Text } from "components";
import { TextInputMask } from "react-native-masked-text";
import styles from "./styles";

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
    editable,
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
          {isForce && <Text style={{ fontSize: scaleWidth(4), color: "red" }}> *</Text>}
        </Text>
      )}

      {!isLabel && <Text style={{ fontSize: scaleWidth(4), color: "#585858" }}> </Text>}

      <TextInputMask
        value={value}
        onChangeText={onChange}
        style={styles.input}
        type="custom"
        options={optionsMask}
        placeholder={placeholder}
        placeholderTextColor="#A9A9A9"
        editable={editable}
      />
      {error && <Text style={{ color: "red", fontSize: scaleWidth(4) }}>{error}</Text>}
    </View>
  );
}
