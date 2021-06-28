import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { Text, ProgressiveImage } from "components";
import Image from "react-native-fast-image";
import { scaleHeight, scaleWidth, findStaffOfService, convertMinsToHrsMins } from "utils";
import { useSelector } from "react-redux";
import { total_of_service, convertExtraInservice } from "./helper";
import images from "assets";

export default function Service({ sv, renderImg, index, extras }) {
  const staff_by_merchant = useSelector((state) => state.staffReducer.staff_by_merchant);
  const title = findStaffOfService(sv.staffId, staff_by_merchant);
  const _extras = extras.filter((obj) => obj.bookingServiceId === sv.bookingServiceId);

  const duration = total_of_service(sv, _extras).duration;

  return (
    <View style={styles.containerItem}>
      <ProgressiveImage source={renderImg} style={styles.imgService} />
      <View style={{ marginLeft: scaleWidth(3), justifyContent: "space-between" }}>
        <ServiceName name={sv.serviceName} />
        {_extras.length > 0 && (
          <Extras extrasName={convertExtraInservice(_extras, sv.bookingServiceId)} />
        )}
        <View style={styles.row}>
          <View style={styles.bottom}>
            <Duration duration={duration} />
            <Staff title={title} />
          </View>
          <Price price={total_of_service(sv, _extras).price} />
        </View>
      </View>
    </View>
  );
}

const ServiceName = ({ name }) => (
  <Text fontFamily="medium" numberOfLines={1} ellipsizeMode={"tail"} style={styles.name}>
    {`${name}`}
  </Text>
);

const Extras = ({ extrasName }) => (
  <View style={styles.extraContainer}>
    <Image source={images.iconCartService} tintColor={"#0764B0"} style={styles.iconCartService} />
    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.txtExtra}>
      {extrasName}
    </Text>
  </View>
);

const Duration = ({ duration }) => (
  <Text
    numberOfLines={1}
    ellipsizeMode={"tail"}
    style={[styles.txtDuration, { width: scaleWidth(25) }]}>
    {`${convertMinsToHrsMins(duration)}`}
  </Text>
);

const Staff = ({ title }) => (
  <Text
    numberOfLines={1}
    ellipsizeMode={"tail"}
    style={[styles.txtDuration, { marginLeft: scaleWidth(1), color: "#888888" }]}>
    {`${title}`}
  </Text>
);

const Price = ({ price }) => (
  <Text style={[styles.txtDuration, styles.txtPrice]}>{`$ ${price}`}</Text>
);

const styles = StyleSheet.create({
  title: {
    fontSize: scaleWidth(4),
    color: "#404040",
    marginVertical: scaleHeight(2),
  },
  imgService: {
    width: scaleWidth(18),
    height: scaleWidth(18),
    borderRadius: 5,
  },
  name: {
    fontSize: scaleWidth(4.5),
    color: "#0764B0",
    width: scaleWidth(72),
  },
  txtDuration: {
    fontSize: scaleWidth(4),
    color: "#585858",
    maxWidth: scaleWidth(25),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: scaleWidth(73),
  },
  containerItem: {
    flexDirection: "row",
    marginTop: scaleHeight(0.4),
    paddingBottom: scaleHeight(1),
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    marginTop: scaleHeight(1.2),
  },
  extraContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconCartService: {
    width: scaleWidth(4.2),
    height: scaleWidth(4.2),
    marginRight: scaleWidth(2),
    tintColor: "#0764B0",
  },
  txtExtra: {
    color: "#0764B0",
    fontSize: scaleWidth(3.7),
  },
  bottom: {
    flexDirection: "row",
    alignItems: "center",
  },
  txtPrice: {
    fontWeight: Platform.OS === "ios" ? "600" : "bold",
  },
});
