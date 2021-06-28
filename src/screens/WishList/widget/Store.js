import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image, Platform } from "react-native";
import * as RootNavigation from "navigations/RootNavigation";
import { scaleWidth } from "utils";
import images from "assets";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function Store(props) {
  const navigatoDetailSore = () => {};

  return (
    <TouchableOpacity style={styles.container} onPress={navigatoDetailSore}>
      <Image style={styles.img} source={images.store_screen} />
      <AntDesign name="heart" style={styles.heart} size={scaleWidth(5)} color={"#ED1C24"} />
      <View style={{ paddingHorizontal: scaleWidth(3) }}>
        <Text style={styles.name}>Lily Nail and Spa</Text>
        <Text style={styles.address}>18/2/2 Bùi Minh Trực f6 q8 hcm</Text>
        <View style={styles.row}>
          <Image style={styles.star} source={images.start_rating} />
          <Text style={styles.txtGreat}>5.0 Great</Text>
          <Text style={styles.txtRating}>25 ratings</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: scaleWidth(94),
    marginLeft: scaleWidth(3),
    borderRadius: 5,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: scaleWidth(3),
    position: "relative",
  },
  img: {
    width: "100%",
    height: scaleWidth(30),
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  name: {
    fontWeight: Platform.OS === "android" ? "bold" : "600",
    fontSize: scaleWidth(4),
    marginTop: scaleWidth(2),
  },
  address: {
    color: "#888888",
    fontSize: scaleWidth(3.5),
    marginTop: scaleWidth(2),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scaleWidth(2),
    marginBottom: scaleWidth(3),
  },
  txtGreat: {
    fontWeight: Platform.OS === "android" ? "bold" : "600",
    fontSize: scaleWidth(3.5),
    marginLeft: scaleWidth(3),
  },
  txtRating: {
    fontSize: scaleWidth(3.5),
    color: "#888888",
    marginLeft: scaleWidth(3),
  },
  star: {
    width: scaleWidth(4),
    height: scaleWidth(4),
  },
  heart: {
    position: "absolute",
    right: scaleWidth(2),
    top: scaleWidth(2),
    zIndex: 99999,
  },
});
