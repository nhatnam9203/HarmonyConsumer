import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "components";
import { scaleWidth, slop } from "utils";
import AntDesign from "react-native-vector-icons/AntDesign";
import styles from "../style";

export default function PopupInvite({ setStatusPopupInvite, sendLinkInvite }) {
  const onPressYes = () => {
    sendLinkInvite();
  };

  const closePopup = () => setStatusPopupInvite(false);
  return (
    <View style={styles.containerModal}>
      <Text fontFamily="bold" style={styles.titleModal}>
        Warning ?
      </Text>
      <TouchableOpacity hitSlop={slop} onPress={closePopup} style={styles.btnCloseModal}>
        <AntDesign name="close" size={scaleWidth(6)} color={"#585858"} />
      </TouchableOpacity>
      <Text style={styles.contentModal}>
        The recipient is not a User of Harmony pay system. If you continue sending, they will
        receive a text message download app to use the gift card. Do you want to continue?
      </Text>
      <View style={styles.bottomModal}>
        <TouchableOpacity onPress={closePopup} style={styles.buttonModal}>
          <Text fontFamily={"bold"} style={[styles.txtButtonModal, { color: "#2C6EA4" }]}>
            No
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressYes} style={styles.buttonModal}>
          <Text fontFamily={"bold"} style={[styles.txtButtonModal, { color: "#C33A43" }]}>
            Yes
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
