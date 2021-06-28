import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from "react-native";
import { scaleWidth, slop } from "utils";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function PopupDelete({ onPressYes, onPressNo, isLoading }) {
  return (
    <View pointerEvents={isLoading ? "none" : "auto"} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Warning!</Text>
        <TouchableOpacity onPress={onPressNo} hitSlop={slop}>
          <AntDesign name="close" color="#404040" size={scaleWidth(6)} />
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <Text style={styles.txtContent}>Are you sure want to cancel the appointment?</Text>
        <View style={styles.rowButton}>
          <TouchableOpacity
            onPress={onPressNo}
            style={[styles.button, { backgroundColor: "white", borderColor: "#0764B0" }]}>
            <Text style={[styles.txtButton, { color: "#0764B0" }]}>No</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressYes} style={styles.button}>
            {!isLoading && <Text style={styles.txtButton}>Yes</Text>}
            {isLoading && <ActivityIndicator size="small" color="white" />}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: scaleWidth(88),
    borderRadius: 8,
    backgroundColor: "#fff",
    paddingTop: scaleWidth(5),
    paddingHorizontal: scaleWidth(5),
    position: "relative",
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: scaleWidth(2),
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },
  title: {
    fontSize: scaleWidth(4.8),
    color: "#ED1C24",
    fontWeight: Platform.OS === "android" ? "bold" : "600",
  },
  body: {
    paddingVertical: scaleWidth(5),
  },
  txtContent: {
    textAlign: "center",
    fontSize: scaleWidth(4.2),
    color: "#646464",
  },
  rowButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: scaleWidth(6),
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderColor: "white",
    width: scaleWidth(35),
    height: scaleWidth(11),
    backgroundColor: "#0764B0",
    borderWidth: 1,
    borderColor: "white",
  },
  txtButton: {
    fontSize: scaleWidth(4),
    color: "white",
    fontWeight: Platform.OS === "android" ? "bold" : "600",
  },
});
