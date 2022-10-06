import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "components";
import images from "assets";
import {
  scaleWidth,
  convertExtraInservice,
  total_of_service,
  findStaffOfService,
  convertMinsToHrsMins,
  convertExtraInservice2,
} from "utils";
import Image from "react-native-fast-image";
import Swipeout from "react-native-swipeout";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles";

export default function Service({
  sv,
  renderImg,
  extras,
  editExtra,
  staff_by_merchant,
  isEditAppointment,
  deleteItem,
  isDisabled,
}) {
  const swipeoutBtns = [
    {
      backgroundColor: "#ffffff",
      component: (
        <TouchableOpacity onPress={() => deleteItem(sv, "service")} style={styles.buttonDelete}>
          <Ionicons name="trash-bin" color="white" size={scaleWidth(6)} />
        </TouchableOpacity>
      ),
    },
  ];

  const _extras = isEditAppointment
    ? extras?.filter(
        (obj) =>
          (obj.bookingServiceId === sv.bookingServiceId || obj.serviceId === sv.serviceId) &&
          obj.isCheck,
      )
    : extras?.filter((obj) => obj.serviceId === sv.serviceId && obj.isCheck);

  const name = sv.name ? sv.name : sv.serviceName;
  const title = findStaffOfService(sv.staffId, staff_by_merchant);
  const duration = total_of_service(sv, _extras).duration;
  const price = total_of_service(sv, _extras).price;

  return (
    <Swipeout
      style={styles.topItem}
      key={"serviceCart" + sv.serviceId + Math.random()}
      backgroundColor="white"
      disabled={isDisabled == 1}
      right={swipeoutBtns}>
      <TouchableOpacity
        disabled={isDisabled == 1}
        onPress={() => editExtra(sv)}
        style={styles.containerItem}>
        <Image source={renderImg} style={styles.imgService} />
        <View style={styles.containerRight}>
          <Text ellipsizeMode="tail" numberOfLines={1} fontFamily="medium" style={styles.name}>
            {`${name}`}
          </Text>

          {_extras.length > 0 && (
            <View style={styles.extraContainer}>
              <Image
                source={images.iconCartService}
                style={styles.iconCartService}
                tintColor="#0764B0"
              />
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.txtExtra}>
                {isEditAppointment
                  ? convertExtraInservice2(_extras, sv)
                  : convertExtraInservice(_extras, sv.serviceId)}
              </Text>
            </View>
          )}

          <View style={[styles.row]}>
            <View style={{ flexDirection: "row" }}>
              <Text
                numberOfLines={1}
                elipsisMode="tail"
                style={[styles.txtDuration, { width: scaleWidth(25) }]}>
                {`${convertMinsToHrsMins(duration)}`}
              </Text>
              <Text style={[styles.txtDuration, { marginLeft: scaleWidth(1), color: "#888888" }]}>
                {`${title}`}
              </Text>
            </View>
            <Text style={[styles.txtDuration, styles.txtPrice]}>{`$ ${price}`}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeout>
  );
}
