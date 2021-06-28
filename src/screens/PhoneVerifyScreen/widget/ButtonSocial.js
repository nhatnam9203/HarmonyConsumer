import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { scaleWidth } from "utils";
import Image from "react-native-fast-image";

const ButtonSocial = ({ icon, onPress = () => {} }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <Image source={icon} style={styles.btn} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: scaleWidth(11),
    height: scaleWidth(11),
    marginHorizontal: scaleWidth(3.5),
  },
});

export default ButtonSocial;
