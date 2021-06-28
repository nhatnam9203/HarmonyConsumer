import React from "react";
import { Text, View, StyleSheet, Image, Platform, TouchableOpacity } from "react-native";
import { scaleWidth, scaleHeight } from "utils";
import images from "assets";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as RootNavigation from "navigations/RootNavigation";
import { useDispatch } from "react-redux";

export default function PaySuccess(props) {
  const dispatch = useDispatch();

  const navigateToHome = () => {
    RootNavigation.navigate("Home");
    dispatch({
      type: "SET_GROUP_APPOINTMENT",
      payload: [],
    });
  };

  const navigateToRating = () => {
    RootNavigation.navigate("Rating");
  };

  return (
    <View style={styles.container}>
      <Image source={images.checked_transaction} style={styles.iconLogo} />
      <Text style={styles.txtSuccess}>Transaction successfull !</Text>
      <Text style={styles.ratingNow}>Rating now</Text>
      <View style={styles.containerStar}>
        {new Array(5).fill().map(() => (
          <Ionicons
            key={"star" + Math.random()}
            style={styles.star}
            name="star"
            size={scaleWidth(6)}
            color="#FFB700"
          />
        ))}
      </View>
      <Text style={styles.content}>Let us know your experience of staff and service.</Text>
      <TouchableOpacity onPress={navigateToRating} style={styles.btnNext}>
        <Text style={styles.txtNext}>Next</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToHome}>
        <Text style={styles.txtNotNow}>Not now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    paddingTop: scaleHeight(15),
  },
  iconLogo: {
    width: scaleWidth(17),
    height: scaleWidth(17),
  },
  txtSuccess: {
    fontSize: scaleWidth(5),
    color: "#1C98C9",
    marginTop: scaleHeight(4),
  },
  ratingNow: {
    color: "#2EBE03",
    fontSize: scaleWidth(4.5),
    fontWeight: Platform.OS === "android" ? "bold" : "700",
    marginTop: scaleHeight(4),
  },
  containerStar: {
    flexDirection: "row",
    marginTop: scaleHeight(4),
  },
  star: {
    marginRight: scaleWidth(2),
  },
  content: {
    fontSize: scaleWidth(4),
    color: "#585858",
    marginTop: scaleHeight(4),
    textAlign: "center",
  },
  btnNext: {
    borderRadius: 5,
    width: scaleWidth(33),
    height: scaleWidth(12),
    marginTop: scaleHeight(4),
    backgroundColor: "#0764B0",
    justifyContent: "center",
    alignItems: "center",
  },
  txtNext: {
    fontSize: scaleWidth(4),
    color: "white",
    fontWeight: Platform.OS === "android" ? "600" : "bold",
  },
  txtNotNow: {
    color: "#0764B0",
    fontSize: scaleWidth(3.8),
    marginTop: scaleHeight(1),
  },
});
