import React from "react";
import { StyleSheet, Animated, View, Image } from "react-native";
import { Marker } from "react-native-maps";

import ICONS from "assets";
import { Text } from "components";
import { scaleWidth, scaleHeight, getTimeWorkingNow_Merchant, scaleSize } from "utils";
import images from "assets";
import Entypo from "react-native-vector-icons/Entypo";

export default function MarkerCustom({
  coordinate,
  onPress,
  style,
  rating,
  showBadget,
  storeSelected = "",
}) {
  let time = storeSelected ? getTimeWorkingNow_Merchant(storeSelected).time : "Close";
  const { businessName, phone, addressFull } = storeSelected;

  return (
    <Marker coordinate={coordinate} onPress={onPress}>
      <InfoMerchant time={time} address={addressFull} phone={phone} businessName={businessName} />
      <Animated.View style={[styles.markerWrap]}>
        <Animated.Image
          source={ICONS["baseline_place"]}
          resizeMode="contain"
          style={[styles.marker, style]}></Animated.Image>
        {showBadget && <Badget value={parseFloat(rating).toFixed(2)} />}
      </Animated.View>
    </Marker>
  );
}

const Badget = ({ value }) => {
  return (
    <View style={styles.container_badget}>
      <View style={styles.sub_badget}>
        <Text fontSize={8} color="#FFFF80" style={{ fontWeight: "bold" }}>
          {value}
        </Text>
      </View>
    </View>
  );
};

const InfoMerchant = ({ businessName, phone, address, time }) => {
  return (
    <View style={styles.containerInfo}>
      <Text style={styles.businessName}>{businessName}</Text>
      <View style={styles.row}>
        {new Array(5).fill().map(() => (
          <Entypo name="star" size={scaleWidth(2.5)} key={Math.random()} color="#FFB700" />
        ))}
      </View>
      <View style={styles.row}>
        <Image style={styles.icon} source={images.phone_blue} />
        <Text style={styles.phone}>{phone}</Text>
      </View>
      <View style={styles.row}>
        <Image style={styles.icon} source={images.clock_blue} />
        <Text style={styles.time}>{time}</Text>
      </View>
      <View style={styles.row}>
        <Image style={styles.icon} source={images.geo_blue} />
        <Text style={styles.address}>{address}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: scaleSize(60),
    height: scaleSize(60),
  },
  marker: {
    width: scaleSize(30),
    height: scaleSize(30),
  },
  container_badget: {
    width: scaleSize(25),
    height: scaleSize(25),
    borderRadius: scaleSize(25),
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    right: scaleSize(5),
    backgroundColor: "#FFF",
  },
  sub_badget: {
    width: scaleSize(20),
    height: scaleSize(20),
    borderRadius: scaleSize(20),
    backgroundColor: "#0764B0",
    justifyContent: "center",
    alignItems: "center",
  },
  containerInfo: {
    borderRadius: 5,
    width: scaleWidth(45),
    backgroundColor: "white",
    padding: scaleWidth(3),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.84,
    zIndex: 1,
    // elevation: 1,
  },
  businessName: {
    fontSize: scaleWidth(3.3),
    fontWeight: "bold",
  },
  phone: {
    fontSize: scaleWidth(3),
  },
  address: {
    fontSize: scaleWidth(2.8),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scaleHeight(0.5),
  },
  icon: {
    width: scaleWidth(2.5),
    height: scaleWidth(2.5),
    marginRight: scaleWidth(2),
    tintColor: "#333",
  },
  time: {
    fontSize: scaleWidth(2.8),
    fontWeight: "bold",
  },
});
