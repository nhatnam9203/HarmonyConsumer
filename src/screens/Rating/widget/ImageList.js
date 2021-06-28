import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { scaleWidth, slop } from "utils";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function ImageList({ imgList = [], deleteImage }) {
  return (
    <View style={styles.container}>
      {imgList.map((obj, index) => {
        return (
          <View style={styles.item}>
            <Image
              key={index + "imgList" + Math.random()}
              source={{ uri: obj }}
              style={styles.image}
            />
            <TouchableOpacity
              onPress={() => deleteImage(index)}
              style={styles.btnDelete}
              hitSlop={slop}>
              <AntDesign color="white" name="close" size={scaleWidth(3.5)} />
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: scaleWidth(90),
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius: 5,
    backgroundColor: "white",
    padding: scaleWidth(3),
    flexDirection: "row",
    flexWrap: "wrap",
  },
  item: {
    position: "relative",
    marginRight: scaleWidth(5),
  },
  image: {
    width: scaleWidth(20),
    height: scaleWidth(20),
    marginBottom: scaleWidth(3),
  },
  btnDelete: {
    position: "absolute",
    right: -scaleWidth(3),
    top: -scaleWidth(3),
    backgroundColor: "#585858",
    justifyContent: "center",
    alignItems: "center",
    width: scaleWidth(6),
    height: scaleWidth(6),
    borderRadius: 300,
  },
});
