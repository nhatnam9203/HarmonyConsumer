import React from "react";
import { TouchableOpacity } from "react-native";
import Image from "react-native-fast-image";
import { Text } from "components";
import styles from "../style";
import images from "assets";
import { scaleWidth } from "utils";

export default function ButtonResendOTP({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={{ flexDirection: "row", marginTop: scaleWidth(22) }}>
      <Image source={images.comment} style={styles.icon} />
      <Text style={styles.txtSend}>Resend OTP</Text>
    </TouchableOpacity>
  );
}
