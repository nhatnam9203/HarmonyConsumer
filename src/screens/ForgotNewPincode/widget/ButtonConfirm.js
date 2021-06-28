import React from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "components";
import styles from "../styles";

export default function ButtonConfirm({ changeNewPincode = () => {}, newPincode, confirmPincode }) {
  return (
    <TouchableOpacity
      onPress={changeNewPincode}
      style={styles.buttonSave(newPincode, confirmPincode)}
      disabled={!(newPincode.toString().length == 6 && confirmPincode.toString().length == 6)}>
      <Text style={styles.txtSave(newPincode, confirmPincode)}>Confirm</Text>
    </TouchableOpacity>
  );
}
