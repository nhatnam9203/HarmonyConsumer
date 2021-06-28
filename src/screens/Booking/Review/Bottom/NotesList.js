import React from "react";
import { View } from "react-native";
import { Text } from "components";
import { scaleHeight, scaleWidth } from "utils";
import moment from "moment-timezone";
import styles from "./styles";

const NotesList = ({ isEditAppointment, notes, firstName }) => {
  if (isEditAppointment) {
    return notes.map((note, key) => {
      return (
        <View key={"note" + key} style={{ marginTop: scaleHeight(1) }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              fontFamily="bold"
              style={[
                styles.textNote,
                {
                  fontSize: scaleWidth(4),
                  color: firstName == note.staffName ? "#0764B0" : "#585858",
                },
              ]}>
              {`${note.staffName}`}
            </Text>
            <Text style={[styles.textNote, { fontSize: scaleWidth(4), marginLeft: scaleWidth(2) }]}>
              {moment(note.createDate).format("hh:mm A, dddd")}
            </Text>
          </View>
          <Text
            fontFamily="medium"
            style={[styles.textNote, { color: "#585858", marginTop: scaleWidth(1) }]}>
            {note.note}
          </Text>
        </View>
      );
    });
  }
  return null;
};

export default NotesList;
