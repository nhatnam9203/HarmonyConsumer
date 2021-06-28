import React from "react";
import { Text } from "components";
import styles from "./styles";

const BusinessName = ({ name = "", isEditAppointment }) => {
  return (
    <Text
      fontFamily="bold"
      style={[styles.name, { color: isEditAppointment ? "#0764B0" : "#404040" }]}>
      {`${name}`}
    </Text>
  );
};

export default BusinessName;
