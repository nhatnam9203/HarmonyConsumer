import React from "react";
import { TouchableOpacity } from "react-native";
import Image from "react-native-fast-image";
import { Text } from "components";
import styles from "../style";
import images from "assets";
import { scaleWidth } from "utils";

export default function ButtonChangePhone({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={{ flexDirection: "row", marginTop: scaleWidth(3) }}>
      <Image source={images.edit} style={styles.icon} />
      <Text style={styles.txtSend}>Change Phone Number</Text>
    </TouchableOpacity>
  );
}
