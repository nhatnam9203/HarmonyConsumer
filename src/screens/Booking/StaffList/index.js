import React from "react";
import { View, StyleSheet } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { Text } from "components";
import ListStaff from "./List";
import Header from "./Header";
import { scaleWidth } from "utils";
import useHook from "./hook";

export default function index(props) {
  const [status, selectedStaffId, selectStaff, selectDate] = useHook(props);

  return (
    <View style={styles.container}>
      <Header title={`Select Staff`} step={2} />
      <ListStaff status={status} selectedStaffId={selectedStaffId} selectStaff={selectStaff} />
      {selectedStaffId !== "" && (
        <View style={styles.bottom}>
          <TouchableRipple borderless={true} onPress={selectDate} style={styles.btn}>
            <Text style={styles.txtBook}>Book</Text>
          </TouchableRipple>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  btn: {
    borderRadius: 8,
    backgroundColor: "#0764B0",
    width: scaleWidth(90),
    height: scaleWidth(13, 5),
    justifyContent: "center",
    alignItems: "center",
  },
  bottom: {
    position: "absolute",
    padding: scaleWidth(5),
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 1.84,
    elevation: 2,
  },
  txtBook: {
    fontSize: scaleWidth(4.5),
    fontWeight: Platform.OS === "android" ? "bold" : "600",
    color: "white",
  },
});
