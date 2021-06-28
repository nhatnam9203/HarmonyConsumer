import React from "react";
import { StyleSheet, View, Dimensions, Image } from "react-native";
import { Modal, Text, Form, Button } from "components";
import ICONS from "assets";
import { scaleSize } from "utils";
const { width } = Dimensions.get("window");
const { ButtonSubmit } = Form;
export default function PopupSuccessFully({ isVisible, onRequestClose, onPress, onCancel }) {
  return (
    <Modal onRequestClose={onRequestClose} isVisible={isVisible}>
      <View style={styles.container}>
        <Image style={styles.image} source={ICONS["checked_success"]} />
        <Text fontSize={23} color="#404040" style={styles.title}>
          Successful activation !
        </Text>

        <View style={styles.container_content}>
          <Text fontSize={17} style={styles.text_content}>
            You can now use gift cards to pay for services on HarmonyPay application
          </Text>
        </View>

        <ButtonSubmit title="Add money" width={350} height={48} onSubmit={onPress} />

        <Button onPress={onCancel}>
          <Text fontSize={15} color="#1C98C9">
            Not Now
          </Text>
        </Button>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    height: scaleSize(367),
    backgroundColor: "#FFFF",
    alignItems: "center",
    borderRadius: scaleSize(5),
    paddingVertical: scaleSize(25),
    justifyContent: "space-between",
  },
  image: {
    width: 60,
    height: scaleSize(60),
    resizeMode: "contain",
  },
  title: {
    fontWeight: "500",
    // marginVertical: scaleSize(20)
  },
  container_content: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: scaleSize(20),
  },
  text_content: {
    textAlign: "center",
    lineHeight: scaleSize(20),
  },
});
