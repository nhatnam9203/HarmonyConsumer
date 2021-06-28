import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { scaleWidth } from "utils";
import { Text } from "components";

export default function PopupChangePhone(props) {
  const { phone, onPressOK } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Are you sure want to change the phone number?</Text>
      <Text fontFamily="medium" style={styles.txtPhone}>
        {phone}
      </Text>

      <View style={styles.containerButton}>
        <TouchableOpacity onPress={() => props.onCancel()} style={styles.button}>
          <Text fontFamily="medium" style={styles.txtButton}>
            CANCEL
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressOK} style={[styles.button, { alignItems: "flex-end" }]}>
          <Text fontFamily="medium" style={[styles.txtButton, { color: "#1366AE" }]}>
            OK
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: scaleWidth(90),
    borderRadius: 8,
    backgroundColor: "#fff",
    padding: scaleWidth(5),
    paddingTop: scaleWidth(7),
  },
  title: {
    fontSize: scaleWidth(4.5),
    color: "#404040",
  },
  txtContent: {
    fontSize: scaleWidth(4.5),
    color: "#404040",
  },
  txtBlue: {
    fontWeight: "600",
    color: "#1366AE",
  },
  button: {
    width: scaleWidth(30),
    paddingVertical: scaleWidth(4),
  },
  txtButton: {
    fontWeight: "600",
    fontSize: scaleWidth(4),
    color: "#404040",
  },
  txtPhone: {
    marginVertical: scaleWidth(6),
    fontSize: scaleWidth(4),
    color: "#404040",
  },
  containerButton: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#dddddd",
    marginHorizontal: -scaleWidth(5),
    marginBottom: -scaleWidth(5),
    justifyContent: "space-between",
    paddingHorizontal: scaleWidth(5),
  },
});
