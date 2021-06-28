import React from "react";
import { View } from "react-native";
import { Text } from "components";
import Image from "react-native-fast-image";
import { scaleWidth } from "utils";
import images from "assets";
import styles from "../styles";

const Stylist = ({ staff }) => {
  const renderImg = staff.imageUrl
    ? {
        uri: staff.imageUrl,
        priority: Image.priority.high,
      }
    : images.avatar;
  return (
    <View style={styles.stylist}>
      <View style={{ flexDirection: "row", alignItems: "stretch" }}>
        <Image source={renderImg} style={styles.avatarStylist} />
        <View style={{ justifyContent: "space-between", marginLeft: scaleWidth(3) }}>
          <Text style={{ fontSize: scaleWidth(4.3) }}>{staff.displayName}</Text>
          <Text style={styles.txtBusinessName}>{staff.businessName}</Text>
        </View>
      </View>
      <Image
        source={images.like_heart}
        style={{ width: scaleWidth(4.5), height: scaleWidth(4.5) }}
      />
    </View>
  );
};

export default Stylist;
