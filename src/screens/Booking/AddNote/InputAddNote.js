import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { scaleWidth } from "utils";

export default function index(props) {
  const { valueNote, setValueNote, onSubmit } = props;

  return (
    <TextInput
      value={valueNote}
      onChangeText={(text) => setValueNote(text)}
      placeholder="Type your note here"
      placeholderTextColor="#404040"
      onSubmitEditing={onSubmit}
      style={styles.input}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    color: "#000000",
    fontSize: scaleWidth(3.8),
  },
});
