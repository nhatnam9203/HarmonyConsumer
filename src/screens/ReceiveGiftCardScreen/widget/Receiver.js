import React from "react";
import { StyleSheet, Image, View, Platform } from "react-native";

import { Text } from "components";
import { scaleSize } from "utils";
import ICONS from "assets";

export default function Sender({ sender }) {
  const { fullName, phone, avatarURL } = sender;
  let _avatarURL = avatarURL ? { uri: avatarURL } : ICONS["personal"];
  return (
    <View style={styles.container}>
      <Image source={_avatarURL} style={styles.image} />

      <View style={styles.content_text}>
        <Text fontSize={20} fontFamily="medium" style={styles.text}>
          {fullName || "Unknown"}
        </Text>

        <Text fontSize={15} color="#585858">
          {phone}
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
    alignItems: "stretch",
    justifyContent: "space-between",
    marginVertical: scaleSize(10),
  },
  image: {
    width: scaleSize(60),
    height: scaleSize(60),
    resizeMode: "contain",
  },
  content_text: {
    flex: 1,
    justifyContent: "space-between",
    height: "100%",
    justifyContent: "space-between",
    paddingVertical: scaleSize(5),
    marginLeft: scaleSize(7),
  },
  text: {
    fontWeight: Platform.OS === "android" ? "bold" : "500",
    color: "#404040",
  },
  button: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "red",
  },
});
