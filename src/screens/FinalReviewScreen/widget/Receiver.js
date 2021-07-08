import React from "react";
import { StyleSheet, Image, View } from "react-native";

import { Text } from "components";
import { scaleSize } from "utils";
import ICONS from "assets";

export default function index({ receiver = {}, infoReceiver = null }) {
  const { fullName, phone, avatarURL } = receiver;
  const avatar = avatarURL ? { uri: avatarURL } : ICONS["personal"];
  // console.log({ fullName });
  return (
    <View style={styles.container}>
      <Image source={avatar} style={styles.image} />

      <View style={styles.content_text}>
        <Text fontSize={17} fontFamily="medium" style={styles.text}>
          {infoReceiver ? infoReceiver.full_name : fullName || "Unknown"}
        </Text>

        <Text fontSize={15} color="#585858">
          {infoReceiver ? infoReceiver.phoneReceiver : phone}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: scaleSize(60),
    flexDirection: "row",
    alignItems: "center",
    marginVertical: scaleSize(10),
  },
  image: {
    width: scaleSize(55),
    height: scaleSize(55),
    resizeMode: "contain",
    marginRight: scaleSize(10),
  },
  content_text: {
    flex: 1,
    justifyContent: "space-between",
    height: "100%",
    paddingVertical: scaleSize(5),
  },
  text: {
    fontWeight: "bold",
    color: "#404040",
    fontSize: scaleSize(17),
  },
  button: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "red",
  },
});
