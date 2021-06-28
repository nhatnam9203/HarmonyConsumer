import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "components";
import images from "assets";
import { scaleHeight, scaleWidth } from "utils";

import AntDesign from "react-native-vector-icons/AntDesign";

const ButtonAddNote = ({ noteValue, goToAddNote }) => {
  return (
    <View style={styles.rowButtonAddNote}>
      <View style={styles.rowTextNote}>
        <Image source={images.note_review} style={styles.note} />
        <Text style={styles.txtNote}>Notes</Text>
      </View>
      {noteValue == "" ? (
        <TouchableOpacity onPress={goToAddNote}>
          <Image source={images.addNote} style={styles.iconNote} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={goToAddNote}>
          <AntDesign
            style={{ marginTop: scaleHeight(1.3) }}
            name="edit"
            size={scaleWidth(5.5)}
            color={"#585858"}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ButtonAddNote;

const styles = StyleSheet.create({
  note: {
    width: scaleWidth(5),
    height: scaleWidth(5),
  },
  iconNote: {
    width: scaleWidth(6),
    height: scaleWidth(6),
    marginTop: 7,
  },
  txtNote: {
    marginLeft: scaleWidth(2),
    color: "#585858",
    fontSize: scaleWidth(4.1),
  },
  textNote: {
    fontSize: scaleWidth(4),
    color: "#888888",
    marginTop: scaleHeight(1),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  txtAddNote: {
    fontSize: scaleWidth(3.7),
    color: "#404040",
    marginTop: scaleHeight(1),
  },
  rowButtonAddNote: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: scaleHeight(1.5),
  },
  rowTextNote: {
    flexDirection: "row",
    marginTop: scaleHeight(2),
    alignItems: "center",
  },
});
