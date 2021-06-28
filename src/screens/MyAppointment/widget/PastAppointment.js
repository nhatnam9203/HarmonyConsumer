import React from "react";
import { View, StyleSheet, Platform, TouchableOpacity } from "react-native";
import { scaleWidth, scaleHeight } from "utils";
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
  const { fromTime, status, merchant, appointmentId } = appointment;

  const { businessName, address, merchantId } = merchant ? merchant : "";
  const { banners = [] } = merchant ? merchant : [];
  const renderImgStore =
    banners.length > 0
      ? { uri: banners[[0]].imageUrl, priority: Image.priority.high }
      : images.bannerMerchant;
  const start = `${moment(fromTime).format("dddd,MMMM DD YYYY, hh:mm A")}`;

  const viewAppointmentDetail = () => {
    props.viewDetailAppointment();
    dispatch(actions.appointmentAction.getDetailAppointment(token, appointmentId));
    dispatch(actions.staffAction.staffGetByMerchant(merchantId, token));
  };

  const renderIcon = () => {
    switch (status) {
      case "paid":
        return (
          <View style={styles.wrapIcon}>
            <Image style={styles.iconImage} source={images.icon_green_dollar} />
          </View>
        );
      case "cancel":
        return (
          <View style={styles.wrapIcon}>
            <Image style={styles.iconImage} source={images.icon_cancel} />
          </View>
        );

      default:
        break;
    }
    return null;
  };

  return (
    <TouchableOpacity onPress={viewAppointmentDetail} style={styles.container}>
      <View style={styles.wrapInfo}>
        <View style={{ position: "relative" }}>
          <Image source={renderImgStore} style={styles.img} />
          {renderIcon()}
        </View>
        <View style={styles.right}>
          <Text style={styles.txtAddress}>{`${start}`}</Text>
          <View style={styles.rowAddress}>
            <Text fontFamily="medium" style={styles.storeName}>{`${businessName}`}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: scaleWidth(94),
    borderRadius: 5,
    marginLeft: scaleWidth(3),
    backgroundColor: "white",
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
    paddingBottom: scaleWidth(4),
  },
  img: {
    width: scaleWidth(15),
    height: scaleWidth(15),
    borderRadius: 5,
    marginTop: Platform.OS === "android" ? scaleHeight(0.5) : 0,
  },
  storeName: {
    fontSize: scaleWidth(4.5),
    color: "#404040",
  },
  txtAddress: {
    fontSize: scaleWidth(3.8),
    color: "#585858",
  },
  geo: {
    width: scaleWidth(4),
    height: scaleWidth(4),
    marginRight: scaleWidth(1),
    tintColor: "#404040",
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
    fontSize: scaleWidth(3.5),
    color: "#404040",
  },
  rowAddress: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scaleWidth(5),
  },
  wrapIcon: {
    position: "absolute",
    bottom: -scaleWidth(1.3),
    right: -scaleWidth(1.7),
    zIndex: 1,
    backgroundColor: "white",
    borderRadius: 300,
  },
  iconImage: {
    width: scaleWidth(4),
    height: scaleWidth(4),
  },
});
