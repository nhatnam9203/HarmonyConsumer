import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text } from "components";
import images from "assets";
import { scaleWidth, convertStatus } from "utils";
export default function StatusAppointment(props) {
  const { status } = props;

  const renderStatus = () => {
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
            <Image source={images.icon_unconfirm} style={[styles.iconStatus]} />
            <Text style={[styles.txtStatus]}>{convertStatus(status)}</Text>
          </View>
        );
      case "cancel":
        return (
          <View style={[styles.wrapStatus, { backgroundColor: "red" }]}>
            <Image
              source={images.icon_cancel}
              style={[styles.iconStatus, { tintColor: "white" }]}
            />
            <Text style={[styles.txtStatus, { color: "white" }]}>{convertStatus(status)}</Text>
          </View>
        );
      case "paid":
        return (
          <View style={[styles.wrapStatus, { backgroundColor: "#2EBE03" }]}>
            <Image
              source={images.icon_green_dollar}
              style={[styles.iconStatus, { tintColor: "white" }]}
            />
            <Text style={[styles.txtStatus, { color: "white" }]}>{convertStatus(status)}</Text>
          </View>
        );

      default:
        break;
    }

    return null;
  };

  return renderStatus();
}

const styles = StyleSheet.create({
  wrapStatus: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scaleWidth(3),
    paddingVertical: scaleWidth(1.3),
    borderRadius: 300,
  },
  txtStatus: {
    fontSize: scaleWidth(3.7),
    color: "#404040",
  },
  iconStatus: {
    width: scaleWidth(4.2),
    height: scaleWidth(4.2),
    marginRight: scaleWidth(1),
  },
});
