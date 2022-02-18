import React from "react";
import { View, StyleSheet, Image, Platform } from "react-native";
import { scaleWidth } from "utils";
import { Text } from "components";
import images from "assets";
import { TouchableOpacity } from "react-native-gesture-handler";
import Feather from "react-native-vector-icons/Feather";

export default function PointCanUse(props) {
  const goToQuestionAccumulate = () => {
    props.navigation.navigate("QuestionAccumulate");
  };

  const { availableRewardPoint = 0 } = props;

  return (
    <TouchableOpacity
      disabled={true}
      onPress={goToQuestionAccumulate}
      style={styles.container}
      activeOpacity={0.8}>
      <Text style={styles.title}>Star can use</Text>
      <View style={styles.row}>
        <Image source={images.dollar_green} style={styles.image} />
        <Text style={styles.quantity}>{availableRewardPoint}</Text>
        <Text style={styles.txtPoint}>Star</Text>
      </View>
      {/*       <View style={styles.rowBottom} activeOpacity={1}>
        <Text style={styles.txtAccummulate}>How to accumulate points</Text>
        <Feather name="chevron-right" color={"#0764B0"} size={scaleWidth(4)} />
      </View> */}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: scaleWidth(94),
    marginHorizontal: scaleWidth(3),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    elevation: 2,
    padding: scaleWidth(3),
    borderRadius: 3,
    backgroundColor: "white",
  },
  title: {
    color: "#585858",
    fontSize: scaleWidth(4),
  },
  image: {
    width: scaleWidth(8),
    height: scaleWidth(8),
  },
  quantity: {
    color: "#0764B0",
    fontWeight: Platform.OS === "android" ? "bold" : "600",
    fontSize: scaleWidth(7),
    marginLeft: scaleWidth(1.4),
  },
  txtPoint: {
    color: "#888888",
    fontSize: scaleWidth(3.5),
    marginTop: scaleWidth(2),
    marginLeft: scaleWidth(1.4),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scaleWidth(3),
    // borderBottomWidth: 1,
    // borderBottomColor: "#dddddd",
    // paddingBottom: scaleWidth(4),
  },
  rowBottom: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scaleWidth(3),
    justifyContent: "space-between",
  },
  txtAccummulate: {
    color: "#0764B0",
    fontSize: scaleWidth(4),
  },
});
