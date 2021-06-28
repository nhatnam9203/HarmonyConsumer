import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import Image from "react-native-fast-image";
import { scaleWidth, scaleHeight, convertMinsToHrsMins } from "utils";
import { Text, ProgressiveImage } from "components";
import { useSelector } from "react-redux";
import moment from "moment";
import images from "assets";

export default function index(props) {
  const appointment_detail_customer = useSelector(
    (state) => state.appointmentReducer.appointment_detail_customer,
  );

  const { fromTime, toTime, merchant, duration, status } = appointment_detail_customer;

  const { businessName, address } = merchant ? merchant : "";

  const { banners = [] } = merchant ? merchant : [];

  const time = moment(fromTime).format("hh:mm A");
  const end = moment(toTime).format("hh:mm A");

  const renderImgStore =
    banners.length > 0 ? { uri: banners[[banners.length - 1]].imageUrl } : images.bannerMerchant;

  return (
    <View style={styles.wrap}>
      <Date status={status} time={time} duration={duration} end={end} />

      <View style={styles.storeRow}>
        <LogoStore renderImgStore={renderImgStore} />
        <InfoStore businessName={businessName} address={address} />
      </View>
    </View>
  );
}

const Date = ({ time, duration, end, status }) => (
  <React.Fragment>
    <Text fontFamily="medium" style={styles.time}>
      {time}
    </Text>
    <Text style={styles.toTime}>
      {`Duration : ${convertMinsToHrsMins(duration)}, end at ${end}`}
    </Text>
  </React.Fragment>
);

const LogoStore = ({ renderImgStore }) => (
  <ProgressiveImage style={styles.storeImg} source={renderImgStore} />
);

const InfoStore = ({ businessName, address }) => (
  <View style={styles.rightStore}>
    <Text style={styles.storeName}>{businessName}</Text>
    <View style={styles.rowAddress}>
      <Image source={images.geo_blue} style={styles.geo} tintColor="#666666" />
      <Text numberOfLines={1} elipsisMode={"tail"} style={styles.txtAddress}>{`${address}`}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  date: {
    fontSize: scaleWidth(4),
    color: "#404040",
    fontWeight: Platform.OS === "android" ? "bold" : "500",
  },
  time: {
    fontSize: scaleWidth(4.5),
    color: "#0764B0",
    marginTop: scaleWidth(3),
  },
  toTime: {
    color: "#888888",
    fontSize: scaleWidth(3.8),
    marginTop: scaleWidth(1),
  },
  storeRow: {
    marginTop: scaleHeight(2.5),
    flexDirection: "row",
    paddingBottom: scaleWidth(3),
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },
  storeImg: {
    width: scaleWidth(20),
    height: scaleWidth(20),
    borderRadius: 5,
  },
  rightStore: {
    marginLeft: scaleWidth(3),
    justifyContent: "space-between",
    paddingRight: scaleWidth(3),
  },
  storeName: {
    fontSize: scaleWidth(4.8),
    color: "#404040",
    fontWeight: Platform.OS === "android" ? "bold" : "700",
  },
  txtAddress: {
    fontSize: scaleWidth(4),
    color: "#666666",
    width: scaleWidth(63),
  },
  geo: {
    width: scaleWidth(4),
    height: scaleWidth(4),
    marginRight: scaleWidth(1),
  },
  rowAddress: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scaleWidth(5),
  },
  wrap: {
    paddingHorizontal: scaleWidth(3),
  },
});
