import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Modal, Text, Button } from "components";
import ICONS from "assets";
import { scaleSize } from "utils";
const { width } = Dimensions.get("window");
export default function index({ isVisible, onRequestClose, content }) {
  return (
    <Modal onRequestClose={onRequestClose} isVisible={isVisible}>
      <View style={styles.container}>
        <View style={styles.container_Top}>
          <Text fontSize={17} style={styles.text_content}>
            {content}
          </Text>
        </View>

        <View style={styles.container_Bottom}>
          <Button onPress={onRequestClose}>
            <Text fontSize={20} color="#0764B0" style={{ fontWeight: "500" }}>
              OK
            </Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    height: scaleSize(150),
    backgroundColor: "#FFFF",
    alignItems: "center",
    borderRadius: scaleSize(5),
    justifyContent: "space-between",
  },
  container_Top: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: scaleSize(20),
    height: scaleSize(93),
  },
  container_Bottom: {
    alignItems: "flex-end",
    justifyContent: "center",
    paddingHorizontal: scaleSize(20),
    borderTopWidth: 1,
    height: scaleSize(57),
    width: "100%",
    borderTopColor: "#EEEEEE",
    paddingRight: scaleSize(30),
  },
  text_content: {
    lineHeight: scaleSize(25),
  },
});
