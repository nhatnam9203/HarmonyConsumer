import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Image from "react-native-fast-image";
import images from "assets";
import { Text } from "components";
import { scaleWidth, scaleHeight } from "utils";
import moment from "moment-timezone";
import { useSelector } from "react-redux";

export default function Note({ notes, goToAddNote = () => {} }) {
  const { userInfo } = useSelector((state) => state.datalocalReducer);
  const { firstName } = userInfo;

  return (
    <View style={{ marginTop: scaleHeight(2) }}>
      <View
        style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" }}>
        <View style={styles.row}>
          <Image source={images.note_review} style={styles.img} />
          <Text style={styles.title}>Note</Text>
        </View>
        <TouchableOpacity onPress={goToAddNote}>
          <Image source={images.addNote} style={styles.iconNote} />
        </TouchableOpacity>
      </View>

      {notes.map((note, key) => {
        return (
          <View key={"note" + key} style={{ marginTop: scaleHeight(1.5) }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                fontFamily="bold"
                style={[
                  styles.content,
                  {
                    fontSize: scaleWidth(4),
                    color: firstName == note.staffName ? "#0764B0" : "#585858",
                  },
                ]}>
                {`${note.staffName}`}
              </Text>
              <Text
                style={[styles.content, { fontSize: scaleWidth(4), marginLeft: scaleWidth(2) }]}>
                {moment(note.createDate).format("hh:mm A, dddd")}
              </Text>
            </View>
            <Text
              fontFamily="medium"
              style={[styles.content, { color: "#585858", marginTop: scaleWidth(1) }]}>
              {note.note}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  img: {
    width: scaleWidth(5),
    height: scaleWidth(5),
  },
  title: {
    fontSize: scaleWidth(4.1),
    color: "#666666",
    marginLeft: scaleWidth(2),
  },
  content: {
    fontSize: scaleWidth(3.7),
    color: "#888888",
    marginTop: scaleHeight(0.5),
  },
  iconNote: {
    width: scaleWidth(6),
    height: scaleWidth(6),
    marginTop: 7,
  },
});
