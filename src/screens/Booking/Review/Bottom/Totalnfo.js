import React from "react";
import { View } from "react-native";
import { Text } from "components";
import { scaleHeight, totalPrice } from "utils";
import styles from "./styles";

const TotalInfo = ({ isEditAppointment, duration, services, extras, products }) => {
  return (
    <React.Fragment>
      {isEditAppointment && (
        <View style={styles.duration}>
          <Text style={styles.txtDuration}>Total duration</Text>
          <Text style={styles.txtDuration}>{duration}</Text>
        </View>
      )}
      <View style={[styles.rowTotal, { marginTop: isEditAppointment ? 0 : scaleHeight(2) }]}>
        <Text style={styles.txtTotal}>Total</Text>
        <Text style={styles.txtTotal}>$ {totalPrice(services, extras, products)}</Text>
      </View>
    </React.Fragment>
  );
};

export default TotalInfo;
