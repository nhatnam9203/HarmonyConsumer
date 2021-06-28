import React from "react";
import { StyleSheet, Dimensions, View } from "react-native";

import { scaleSize } from "utils";
import { Text, Button } from "components";

const { width } = Dimensions.get("window");
export default function InputAccessoryAmount({ data, onChange, value }) {
  const [id, setId] = React.useState(-1);

  const handleOnChange = (item) => () => {
    if (!onChange) return;
    onChange(item.amount.toFixed(2));
    setId(item.id);
  };

  return (
    <View style={styles.container}>
      {data.map((item, index) => {
        const backgroundColor = id == item.id ? "#0764B0" : "#FFF";
        const color_text = id == item.id ? "#FFF" : "#0764B0";
        return (
          <Button
            onPress={handleOnChange(item)}
            key={index + ""}
            style={[styles.item_button, { backgroundColor }]}>
            <Text fontSize={15} color={color_text} style={{ fontWeight: "bold" }}>
              $ {item.amount}
            </Text>
          </Button>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    backgroundColor: "#F1F1F1",
    height: scaleSize(60),
    flexDirection: "row",
    paddingHorizontal: scaleSize(10),
    alignItems: "center",
    justifyContent: "space-between",
  },
  item_button: {
    width: scaleSize(70),
    height: scaleSize(35),
    backgroundColor: "#FFF",
    borderRadius: scaleSize(5),
    borderColor: "#0764B0",
    borderWidth: 1,
  },
});
