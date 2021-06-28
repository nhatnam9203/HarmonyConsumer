import React from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, Image, Platform } from "react-native";
import { scaleWidth, scaleHeight, slop } from "utils";
import * as RootNavigation from "navigations/RootNavigation";
import images from "assets";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function Header({ storeName, onChangeStoreName }) {
  const back = () => {
    RootNavigation.back();
  };

  return (
    <View style={styles.header}>
      <View style={styles.row}>
        <TouchableOpacity hitSlop={slop} onPress={back}>
          <Image source={images.arrow_back} style={styles.iconBack} />
        </TouchableOpacity>
        <View style={styles.input}>
          <TextInput
            onChangeText={(text) => onChangeStoreName(text)}
            value={storeName}
            style={styles.textInput}
            placeholder="Search store ..."
          />
          <TouchableOpacity onPress={() => onChangeStoreName("")} hitSlop={slop}>
            <AntDesign color={"#404040"} name="close" size={scaleWidth(5.5)} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#f8f8f8",
    paddingTop: scaleHeight(6),
    paddingBottom: scaleHeight(2),
    paddingHorizontal: scaleWidth(5),
    paddingVertical: scaleWidth(1),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 1.84,
    zIndex: 1,
    elevation: 3,
  },
  input: {
    width: scaleWidth(82),
    borderRadius: 5,
    paddingVertical: Platform.OS === "ios" ? scaleWidth(2) : 0,
    // height : scaleWidth(10),
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#dddddd",
    paddingHorizontal: scaleWidth(3),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    fontSize: scaleWidth(4),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBack: {
    width: scaleWidth(4.5),
    height: scaleWidth(4.5),
    marginRight: scaleWidth(3),
  },
});
