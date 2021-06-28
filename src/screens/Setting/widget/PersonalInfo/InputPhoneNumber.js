import React from "react";
import { View, TextInput } from "react-native";
import styles from "./styles";

export default function index(props) {
  const { placeholder = "", width = "100%", value, onChange, error, optionsMask } = props;

  return (
    <View style={{ width }}>
      <TextInput
        value={value}
        onChangeText={onChange}
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#A9A9A9"
      />
    </View>
  );
}
