import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Text } from "components";
import images from "assets";
import { convertMinsToHrsMins } from "utils";
import moment from "moment-timezone";
import styles from "./styles";

const DateAppointment = ({ date, status, duration, fromTime, goToSelectDate }) => {
  return (
    <React.Fragment>
      <Text fontFamily="medium" style={styles.date}>
        {date}
      </Text>

      <View style={styles.rowTime}>
        <Text fontFamily="medium" style={styles.time}>
          {status === "waiting" ? "Waiting List" : moment(fromTime).format("hh:mm A")}
        </Text>
        <TouchableOpacity onPress={goToSelectDate}>
          <Image source={images.clock_review} style={styles.clock} />
        </TouchableOpacity>
      </View>

      <Text style={styles.duration}>{`Duration : ${convertMinsToHrsMins(duration)}`}</Text>
    </React.Fragment>
  );
};

export default DateAppointment;
