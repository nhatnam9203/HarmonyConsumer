import React from "react";
import { TouchableOpacity } from "react-native";
import { scaleWidth } from "utils";
import Image from "react-native-fast-image";
import { Text } from "components";
import AntDesign from "react-native-vector-icons/AntDesign";
import styles from "./styles";

export default function Anonymous(props) {
  const { staffId, selectedStaffId, selectStaff, name, icon, color, isDisabled } = props;
  return (
    <TouchableOpacity
      disabled={isDisabled}
      onPress={() => selectStaff(staffId)}
      style={[
        styles.row,
        {
          opacity: isDisabled ? 0.5 : 1,
        },
      ]}>
      <Image source={icon} style={[styles.avatar, { borderRadius: 0 }]} />
      <Text fontFamily="medium" style={[styles.name, { color }]}>
        {name}
      </Text>
      {selectedStaffId === staffId && (
        <AntDesign name="check" size={scaleWidth(6)} color="green" style={styles.iconSelected} />
      )}
    </TouchableOpacity>
  );
}
