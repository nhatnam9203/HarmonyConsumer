import React from "react";
import { View, TouchableOpacity, Image, StyleSheet, Platform } from "react-native";
import { scaleWidth, slop, scaleHeight } from "utils";
import styles from "../styles";
import images from "assets";
import { Header, StatusBar, Text } from "components";

export default function HowToAccumulate(props) {
  const back = () => {
    props.goToPage(0);
  };

  return (
    <View style={styles.container}>
      {/* ---------------Tile--------------- */}

      <View style={{ backgroundColor: "#f8f8f8" }}>
        <StatusBar />
        <Header title="Review Store To Get Point" headerLeft onBack={back} />
      </View>

      <Image source={images.question2} style={styles2.imageTop} />

      {/* ---------------Step--------------- */}
      <View style={{ padding: scaleWidth(4) }}>
        <Text style={styles2.title}>Lorem Ipsum is simply </Text>
        <Text style={styles2.content}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry's standard dummy text ever since the 1500s
        </Text>

        <ItemStep isTop step={1} />
        <ItemStep step={2} />
        <ItemStep isBottom step={3} />

        <TouchableOpacity style={styles2.button}>
          <Text style={styles2.txtButton}>Action</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const ItemStep = ({ isTop, isBottom, step }) => {
  return (
    <View style={styles2.itemStep(isTop)}>
      <View style={styles2.itemStepLeft}>
        <View style={styles2.circle}>
          <Text style={styles.txtQty}>{step}</Text>
        </View>
        {!isBottom && <View style={styles2.barStep} />}
      </View>
      <Text style={styles2.txtStep}>Lorem Ipsum is simply dummy text</Text>
    </View>
  );
};

const styles2 = StyleSheet.create({
  title: {
    color: "#0764B0",
    fontSize: scaleWidth(4.4),
    fontWeight: Platform.OS === "android" ? "bold" : "600",
  },
  content: {
    fontSize: scaleWidth(3.7),
    color: "#A9A9A9",
    marginTop: scaleHeight(1),
  },
  imageTop: {
    width: scaleWidth(100),
    height: scaleHeight(20),
  },
  circle: {
    borderRadius: scaleWidth(30),
    borderWidth: 1,
    borderColor: "#36CFE3",
    width: scaleWidth(10),
    height: scaleWidth(10),
    justifyContent: "center",
    alignItems: "center",
  },
  txtStep: {
    fontSize: scaleWidth(3.8),
    color: "#333",
    marginTop: scaleWidth(2),
    marginLeft: scaleWidth(3),
  },
  button: {
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    width: scaleWidth(35),
    height: scaleWidth(12),
    alignSelf: "center",
    backgroundColor: "#0764B0",
    marginTop: scaleWidth(5),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  txtButton: {
    color: "white",
    fontSize: scaleWidth(4),
    fontWeight: Platform.OS === "android" ? "bold" : "600",
  },
  itemStep: (isTop) => {
    return {
      flexDirection: "row",
      marginTop: isTop ? scaleWidth(5) : 0,
    };
  },
  itemStepLeft: {
    justifyContent: "center",
    alignItems: "center",
    width: scaleWidth(10),
  },
  barStep: {
    width: scaleWidth(1),
    height: scaleHeight(3),
    backgroundColor: "#36CFE3",
  },
  txtQty: {
    fontSize: scaleWidth(4),
  },
});
