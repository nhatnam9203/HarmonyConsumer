import React from "react";
import { View } from "react-native";
import { Text } from "components";
import { scaleWidth } from "utils";
import { TextInputMask } from "react-native-masked-text";
import { isEmpty } from "lodash";
import styles from "./styles";

const InputDate = ({ title, value, onChangeText, errorText, onBlur }) => {
  const [isFocus, setFocus] = React.useState(false);

  return (
    <View>
      <Text fontFamily="medium" style={styles.title}>
        {title}
      </Text>
      <TextInputMask
        placeholder="MM/DD/YYYY"
        placeholderTextColor="grey"
        value={value}
        onChangeText={(date) => {
          onChangeText(date);
        }}
        onBlur={() => {
          setFocus(false);
          onBlur();
        }}
        onFocus={() => setFocus(true)}
        style={[
          styles.input,
          styles.txtSelected,
          {
            width: scaleWidth(45),
            fontFamily: "SFProDisplay-Regular",
            borderColor: isFocus ? "#0764B0" : "#dddddd",
          },
        ]}
        keyboardType="numeric"
        type={"datetime"}
        options={{
          format: "MM/DD/YYYY",
        }}
      />
      {!isEmpty(errorText) !== "" && (
        <Text fontFamily="regular" style={styles.txtError}>
          {errorText}
        </Text>
      )}
    </View>
  );
};

export default InputDate;
