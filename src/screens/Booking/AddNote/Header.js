import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { scaleWidth, slop, scaleHeight } from "utils";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function index(props) {
  const { title, back, addNote } = props;
  return (
    <View style={styles.header}>
      <View style={styles.rowHeader}>
        <TouchableOpacity onPress={back} hitSlop={slop}>
          <AntDesign name="close" size={scaleWidth(5)} />
        </TouchableOpacity>
        <Text style={styles.titleHeader}>{title}</Text>
        <TouchableOpacity onPress={addNote} hitSlop={slop}>
          <AntDesign name="check" size={scaleWidth(5)} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    position: "relative",
  },
  header: {
    backgroundColor: "#F9F9F9",
    paddingTop: scaleHeight(5),
    paddingBottom: scaleHeight(1),
    paddingHorizontal: scaleWidth(3),
  },
  rowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleHeader: {
    fontSize: scaleWidth(4),
    fontWeight: Platform.OS === "android" ? "bold" : "600",
    marginLeft: -scaleWidth(4),
  },
});
