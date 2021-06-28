import React from "react";
import { StyleSheet } from "react-native";

import { Text, Button } from "components";
import { scaleSize } from "utils";

const AddCard = ({ style, onPress }) => {
  return (
    <Button onPress={onPress} style={[styles.container_addcard, style]}>
      <Text fontSize={15} color="#666666">
        + Add a card
      </Text>
    </Button>
  );
};

export default AddCard;

const styles = StyleSheet.create({
  container_addcard: {
    width: scaleSize(183),
    height: scaleSize(116),
    alignItems: "center",
    justifyContent: "center",
    borderStyle: "dashed",
    borderWidth: 1,
    borderRadius: scaleSize(5),
    borderColor: "#7A98BB",
    backgroundColor: "#F8F8F8",
  },
});
