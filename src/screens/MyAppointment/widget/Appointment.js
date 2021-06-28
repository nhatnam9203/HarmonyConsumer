import React from "react";
import { View, StyleSheet, Platform, TouchableOpacity } from "react-native";
import { scaleWidth, scaleHeight, textBottom, convertStatus } from "utils";
import images from "assets";
import moment from "moment";
import { Text } from "components";
import { useDispatch, useSelector } from "react-redux";
import actions from "@redux/actions";
import Image from "react-native-fast-image";

export default function Appointment(props) {
  const token = useSelector((state) => state.datalocalReducer.token);
  const dispatch = useDispatch();

  const { appointment } = props;
  const { fromTime, status, merchant, services, products, extras, appointmentId } = appointment;
  const { businessName, address, merchantId } = merchant ? merchant : "";

  const { banners = [] } = merchant ? merchant : [];

  const renderImgStore =
    banners.length > 0
      ? { uri: banners[0].imageUrl, priority: Image.priority.high }
      : images.bannerMerchant;

  const date = `${moment(fromTime).format("dddd,MMMM DD YYYY, hh:mm A")}`;

  const viewAppointmentDetail = () => {
    props.viewDetailAppointment();
    dispatch(actions.appointmentAction.getDetailAppointment(token, appointmentId));
    dispatch(actions.staffAction.staffGetByMerchant(merchantId, token));
  };

  return (
    <TouchableOpacity
      style={styles.container(status)}
      activeOpacity={0.8}
      onPress={viewAppointmentDetail}>
      <View>
        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.date}>
          {date}
        </Text>
        <Info businessName={businessName} address={address} renderImgStore={renderImgStore} />
        <View style={styles.bottom}>
          <Text style={styles.txtBottom}>{textBottom(services, products, extras)}</Text>
          <Status status={status} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const Status = ({ status }) => {
  switch (status) {
    case "unconfirm":
      return (
        <View style={[styles.wrapStatus, { backgroundColor: "#FFFF80" }]}>
          <Image source={images.icon_unconfirm} style={styles.iconStatus} />
          <Text style={styles.txtStatus}>{convertStatus(status)}</Text>
        </View>
      );
    case "confirm":
      return (
        <View style={[styles.wrapStatus, { backgroundColor: "#D4F8FC" }]}>
          <Image source={images.icon_confirm} style={styles.iconStatus} />
          <Text style={styles.txtStatus}>{convertStatus(status)}</Text>
        </View>
      );
    case "checkin":
      return (
        <View style={[styles.wrapStatus, { backgroundColor: "#0764B0" }]}>
          <Image source={images.icon_checkin} style={styles.iconStatus} />
          <Text style={[styles.txtStatus, { color: "white" }]}>{convertStatus(status)}</Text>
        </View>
      );
    case "waiting":
      return (
        <View style={[styles.wrapStatus, { backgroundColor: "#dddddd" }]}>
          <Image source={images.icon_unconfirm} style={styles.iconStatus} />
          <Text style={[styles.txtStatus]}>{convertStatus(status)}</Text>
        </View>
      );

    default:
      break;
  }

  return null;
};

const Info = ({ businessName, address, renderImgStore }) => {
  return (
    <View style={styles.wrapInfo}>
      <Image source={renderImgStore} style={styles.img} />
      <View style={styles.right}>
        <Text fontFamily="medium" style={styles.storeName}>
          {businessName}
        </Text>
        <View style={styles.rowAddress}>
          <Image source={images.geo_blue} style={styles.geo} tintColor="#666666" />
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={styles.txtAddress}>{`${address}`}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: (status) => {
    return {
      width: scaleWidth(94),
      borderRadius: 5,
      borderWidth: 1,
      borderColor:
        status === "unconfirm"
          ? "#FFFF80"
          : status === "confirm" || status === "waiting"
          ? "#D4F8FC"
          : "#0764B0",
      padding: scaleWidth(5),
      marginTop: scaleHeight(2),
      marginLeft: scaleWidth(3),
      backgroundColor: "white",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.15,
      shadowRadius: 3.84,

      elevation: 3,
    };
  },
  date: {
    fontSize: scaleWidth(4.2),
    color: "#0764B0",
    fontWeight: Platform.OS === "android" ? "bold" : "600",
  },
  wrapInfo: {
    marginTop: scaleHeight(2),
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd",
    paddingBottom: scaleWidth(3),
  },
  img: {
    width: scaleWidth(15),
    height: scaleWidth(15),
    marginTop: Platform.OS === "android" ? scaleHeight(0.5) : 0,
    borderRadius: 5,
  },
  storeName: {
    fontSize: scaleWidth(4.5),
    color: "#404040",
  },
  txtAddress: {
    fontSize: scaleWidth(3.8),
    color: "#666666",
    width: scaleWidth(66),
  },
  geo: {
    width: scaleWidth(4),
    height: scaleWidth(4),
    marginRight: scaleWidth(1),
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: scaleWidth(3),
  },
  right: {
    marginLeft: scaleWidth(3),
    alignItems: "stretch",
  },
  txtBottom: {
    fontSize: scaleWidth(3.8),
    color: "#404040",
  },
  rowAddress: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scaleWidth(5),
  },
  wrapStatus: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scaleWidth(3),
    paddingVertical: scaleWidth(1),
    borderRadius: 300,
  },
  txtStatus: {
    fontSize: scaleWidth(3.5),
    color: "#404040",
  },
  iconStatus: {
    width: scaleWidth(4),
    height: scaleWidth(4),
    marginRight: scaleWidth(1),
  },
});
