import React from "react";
import Image from "react-native-fast-image";
import { Text } from "components";
import styles from "../style";
import images from "assets";
import { scaleWidth } from "utils";

export default function Logo({ phoneVerify }) {
  return (
    <>
      <Image source={images.logoHarmony} style={styles.logo} resizeMode="contain" />
      <Text fontFamily="medium" style={styles.txt1}>
        OTP authentication
      </Text>
      <Text style={styles.txt2}>An authentication code has been sent to</Text>

      <Text style={{ fontWeight: "bold", fontSize: scaleWidth(4.3), marginTop: scaleWidth(2) }}>
        {phoneVerify}
      </Text>
    </>
  );
}
