import React from "react";
import { View, StyleSheet, Platform, TouchableOpacity } from "react-native";
import Text from "./Text";
import Image from "react-native-fast-image";
import images from "assets";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { scaleWidth } from "utils";
import Entypo from "react-native-vector-icons/Entypo";

const PopupUpdate = ({ update = () => {}, contentUpdate = [] }) => {
  return (
    <View style={styles.containerUpdate}>
      <Logo />
      <Content contentUpdate={contentUpdate} />
      <ButtonUpdate update={update} />
    </View>
  );
};

const Logo = () => (
  <View style={styles.containerTitle}>
    <Image source={images.whatsNew} style={styles.iconUpdate} />
    <Text style={styles.txtUpdate}>What's new</Text>
  </View>
);

const Content = ({ contentUpdate }) => (
  <View style={styles.body}>
    <Text style={styles.features}>New features</Text>
    {contentUpdate.map((obj, index) => (
      <View key={"content" + index} style={styles.row}>
        <Entypo
          style={{ marginTop: scaleWidth(1) }}
          color="#56CD36"
          name="dot-single"
          size={scaleWidth(10)}
        />
        <Text style={styles.content}>{obj}</Text>
      </View>
    ))}
  </View>
);

const ButtonUpdate = ({ update }) => (
  <View style={styles.bottom}>
    <TouchableOpacity onPress={update} style={styles.buttonUpdate}>
      <Text style={styles.txtButton}>OK</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  containerUpdate: {
    width: scaleWidth(80),
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: scaleWidth(5),
    borderColor: "#0764B0",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  containerTitle: {
    width: scaleWidth(55),
    height: scaleWidth(35),
    backgroundColor: "#0764B0",
    top: -scaleWidth(23),
    borderRadius: 10,
    left: scaleWidth(12.5),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.84,
    elevation: 2,
  },
  iconUpdate: {
    width: scaleWidth(17),
    height: scaleWidth(17),
  },
  txtUpdate: {
    color: "white",
    fontWeight: Platform.OS === "android" ? "bold" : "600",
    fontSize: wp(4.5),
    marginTop: wp(2),
  },
  body: {
    marginTop: -scaleWidth(18),
    paddingBottom: scaleWidth(41),
    paddingHorizontal: scaleWidth(3),
  },
  features: {
    color: "#404040",
    fontSize: scaleWidth(4.5),
    fontWeight: Platform.OS === "android" ? "bold" : "600",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scaleWidth(1),
  },
  content: {
    fontSize: scaleWidth(4),
    color: "#585858",
    marginLeft: scaleWidth(1.5),
  },
  bottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: "#eeeeee",
    padding: scaleWidth(3),
  },
  buttonUpdate: {
    alignSelf: "center",
    width: scaleWidth(50),
    borderRadius: 8,
    backgroundColor: "#f6f6f6",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: scaleWidth(4),
  },
  txtButton: {
    color: "#585858",
    fontSize: scaleWidth(4.5),
    fontWeight: Platform.OS === "android" ? "bold" : "600",
  },
});

export default PopupUpdate;
