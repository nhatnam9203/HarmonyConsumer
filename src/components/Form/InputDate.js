import React, { useState } from "react";
import { StyleSheet } from "react-native";
import Input from "./Input";
import Button from "../Button";
import { scaleSize, formatDate } from "utils";
import DateTimePickerModal from "react-native-modal-datetime-picker";
export default function InputDate(props) {
  const { isRequire, onChangeText, value, editable, error, touched } = props;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(value);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const birthDate = formatDate(date, "DD-MM-YYYY");
    setDate(birthDate);
    onChangeText(birthDate);
    hideDatePicker();
  };
  const splitDate = date.split("-");
  return (
    <Button onPress={showDatePicker} style={styles.containerInput}>
      <Input
        width={110}
        placeHolder="dd"
        label="Date of birth"
        value={splitDate[0]}
        isRequire={isRequire}
        editable={editable}
        error={error}
        touched={touched}
        onTouchStart={showDatePicker}
      />
      <Input
        width={110}
        placeHolder="mm"
        editable={editable}
        value={splitDate[1]}
        onTouchStart={showDatePicker}
      />
      <Input
        width={110}
        placeHolder="yy"
        editable={editable}
        value={splitDate[2]}
        onTouchStart={showDatePicker}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={new Date(date)}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </Button>
  );
}
const styles = StyleSheet.create({
  containerInput: {
    flexDirection: "row",
    width: scaleSize(350),
    // height: scaleSize(61),
    justifyContent: "space-between",
    alignItems: "center",
  },
});
