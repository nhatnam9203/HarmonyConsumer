import React from "react";
import { View } from "react-native";
import Image from "react-native-fast-image";
import { scaleWidth } from "utils";
import images from "assets";
import styles from "./styles";
import { useSelector } from "react-redux";
import { Text } from "components";

export default function Profile(props) {
  const userInfo = useSelector((state) => state.datalocalReducer.userInfo);
  const userName = userInfo && userInfo.fullName ? userInfo.fullName : "";
  const email = userInfo && userInfo.email ? userInfo.email : "";
  const { avatarURL } = userInfo;
  const renderImg = avatarURL ? { uri: avatarURL, priority: Image.priority.high } : images.avatar;

  return (
    <View style={{ flexDirection: "row" }}>
      <Image source={renderImg} style={styles.avatar} />

      <View style={{ marginLeft: scaleWidth(3), justifyContent: "space-between" }}>
        <Text style={styles.name}>{`${userName}`}</Text>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={images.card_setting} style={styles.icon} />
          <Text style={styles.txtSub}>{`${userInfo.accountId}`}</Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={images.email} style={styles.icon} />
          <Text style={styles.txtSub}>{`${email}`}</Text>
        </View>
      </View>
    </View>
  );
}
