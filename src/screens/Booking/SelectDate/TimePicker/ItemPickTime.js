import React from "react";
import { slop } from "utils";
import moment from "moment";
import { Text } from "components";
import styles from "./styles";
import { TouchableRipple } from "react-native-paper";

const ItemPickTime = (props) => {
  const { isActive, onPress, isBooked, time } = props;

  return (
    <TouchableRipple
      hitSlop={slop}
      disabled={isBooked}
      onPress={() => onPress(time)}
      style={[
        styles.itemTime(isActive),
        {
          opacity: isBooked ? 0.5 : 1,
        },
      ]}>
      <Text fontFamily={isActive ? "bold" : "regular"} style={styles.txtTime(isActive)}>
        {moment(time, "HH:mm").format("hh:mm A")}
      </Text>
    </TouchableRipple>
  );
};
export default React.memo(ItemPickTime);
