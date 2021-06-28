import React from "react";
import { View, StyleSheet, Image, Platform, TouchableOpacity } from "react-native";
import images from "assets";
import { scaleWidth, scaleHeight } from "utils";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import actions from "@redux/actions";
import { Text } from "components";
import * as RootNavigation from "navigations/RootNavigation";

function Item(props) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.datalocalReducer.token);
  const { item, setLoading, isHistory } = props;
  const { type, isView } = item;

  const day = moment(item.createDate, "").format("YYYY-MM-DD");
  const formatDate = () => {
    if (moment().diff(moment(day, ["YYYY-MM-DD"]), "days") == 1) {
      return "Yesterday, " + moment(item.createDate).format("hh:mm A");
    } else {
      return moment(item.createDate).format("ddd, DD MMMM YYYY hh:mm A");
    }
  };

  const readNotify = () => {
    const { notificationId } = item;

    if (isView === 0) {
      dispatch(actions.inboxAction.readNotify(notificationId, token));
    }

    if (type === "Appointment" || type === "Order") {
      const { appointmentId, merchantId } = item;

      viewDetailAppointment(appointmentId, merchantId);
    }

    if (type === "giftcard") {
      RootNavigation.navigate("ReceiveGiftCard", {
        gifts: item,
      });
    }
  };

  const viewDetailAppointment = (appointmentId, merchantId) => {
    setLoading(true);
    dispatch(actions.staffAction.staffGetByMerchant(merchantId, token));

    dispatch(
      actions.appointmentAction.getDetailAppointment(
        token,
        appointmentId,
        navigateToDetailAppointment,
      ),
    );
  };

  const navigateToDetailAppointment = () => {
    setLoading(false);
    RootNavigation.navigate("BookAppointmentStack", { screen: "MyAppointmentDetail" });
  };

  return (
    <TouchableOpacity
      onPress={readNotify}
      activeOpacity={0.8}
      style={[
        styles.row,
        {
          backgroundColor: isView === 0 ? "#f2f7ff" : "white",
        },
      ]}>
      <IconNotification isHistory={isHistory} type={type} />
      <View style={styles.right}>
        <Text
          fontFamily="medium"
          style={[
            styles.title,
            {
              color: isHistory ? "#666666" : "#0764B0",
            },
          ]}>
          {item.title}
        </Text>
        <Text style={styles.content(isView)}>{`${item.content}`}</Text>
        <Text style={styles.time}>
          {isHistory ? formatDate() : moment(item.createDate).format("hh:mm A")}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const IconNotification = ({ type, isHistory }) => {
  switch (type) {
    case "Appointment":
      return <IconInbox isHistory={isHistory} icon={images.appointment_inbox} />;
    case "Order":
      return <IconInbox isHistory={isHistory} icon={images.appointment_inbox} />;
    case "giftcard":
      return <IconInbox isHistory={isHistory} icon={images.icon_giftcard} />;
    case "Promotion":
      return <IconInbox isHistory={isHistory} icon={images.icon_promotion} />;
    default:
      return null;
  }
};

const IconInbox = React.memo(({ icon, isHistory }) => {
  return (
    <Image
      tintColor={isHistory ? "#666666" : "#0764B0"}
      source={icon}
      style={[styles.icon, { tintColor: isHistory ? "#666666" : "#0764B0" }]}
    />
  );
});

export default React.memo(Item);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    paddingTop: scaleHeight(2),
    paddingHorizontal: scaleWidth(3),
    paddingBottom: scaleHeight(1.3),
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },
  icon: {
    width: scaleWidth(10),
    height: scaleWidth(10),
    resizeMode: "contain",
  },
  right: {
    marginLeft: scaleWidth(3),
  },
  title: {
    color: "#0764B0",
    fontSize: scaleWidth(4.3),
  },
  content: (isView) => {
    return {
      color: isView === 0 ? "#585858" : "#888888",
      fontSize: scaleWidth(4.3),
      width: scaleWidth(81),
      marginTop: scaleHeight(0.8),
      lineHeight: scaleWidth(5.6),
      letterSpacing: 0.2,
    };
  },
  time: {
    fontSize: scaleWidth(3.8),
    color: "grey",
    marginTop: scaleHeight(2.3),
  },
});
