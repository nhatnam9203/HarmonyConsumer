import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Text } from "components";
import images from "assets";
import { scaleHeight, scaleWidth } from "utils";

import AntDesign from "react-native-vector-icons/AntDesign";
import styles from "./styles";

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
