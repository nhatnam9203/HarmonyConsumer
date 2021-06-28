import React from "react";
import { View } from "react-native";
import { getTimeAvaible } from "../helper";
import { useSelector } from "react-redux";
import ColumnTimePicker from "./ColumnTimePicker";
import styles from "./styles";

export default function index(props) {
  const { setTimePicker } = props;
  const timePicker = useSelector((state) => state.bookingReducer.timePicker);
  const staff_available_time = useSelector((state) => state.staffReducer.staff_available_time);
  const { morning, afternoon, evening } = getTimeAvaible(staff_available_time);

  const setSelectedTime = (time) => {
    setTimePicker(time);
  };

  return (
    <View style={styles.rowTime}>
      <ColumnTimePicker
        onPress={setSelectedTime}
        timePicker={timePicker}
        title="Morning"
        staff_available_time={staff_available_time}
        data={morning}
      />
      <ColumnTimePicker
        onPress={setSelectedTime}
        timePicker={timePicker}
        title="Afternoon"
        data={afternoon}
      />
      <ColumnTimePicker
        onPress={setSelectedTime}
        timePicker={timePicker}
        title="Evening"
        data={evening}
      />
    </View>
  );
}
