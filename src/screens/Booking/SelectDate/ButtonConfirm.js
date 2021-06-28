import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { Text } from "components";
import { scaleWidth } from "utils";
import { TouchableRipple } from "react-native-paper";
import { useSelector } from "react-redux";

function ButtonConfirm({ onPress, title }) {
  const timePicker = useSelector((state) => state.bookingReducer.timePicker);
  const staff_available_time = useSelector((state) => state.staffReducer.staff_available_time);
  const isActive = timePicker !== "" ? true : false;

  const conditionVisibileButton = () => {
    const time = staff_available_time.find((obj) => obj.time == timePicker && obj.isBooked == true);
    if (time) {
      return true;
    }
    return false;
  };

  if (timePicker !== "" && !conditionVisibileButton()) {
    return (
      <View style={styles.wrapBtn}>
        <TouchableRipple
          rippleColor="#333"
          borderless={true}
          disabled={timePicker !== "" ? false : true}
          onPress={onPress}
          style={styles.btn(isActive)}>
          <Text style={styles.txtBook(isActive)}>{title}</Text>
        </TouchableRipple>
      </View>
    );
  }
  return null;
}

export default React.memo(ButtonConfirm);

const styles = StyleSheet.create({
  btn: (isActive) => {
    return {
      borderRadius: 8,
      backgroundColor: isActive ? "#0764B0" : "#F6F6F6",
      width: scaleWidth(90),
      height: scaleWidth(13.5),
      justifyContent: "center",
      alignItems: "center",
    };
  },
  wrapBtn: {
    position: "absolute",
    padding: scaleWidth(5),
    bottom: scaleWidth(0),
    left: 0,
    right: 0,
    height: scaleWidth(23.5),
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.84,
    elevation: 5,
  },
  txtBook: (isActive) => {
    return {
      fontSize: scaleWidth(4.5),
      fontWeight: Platform.OS === "android" ? "bold" : "600",
      color: isActive ? "white" : "#404040",
    };
  },
});
