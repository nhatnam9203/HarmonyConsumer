import { Text } from 'components';
import React from 'react';
import { View } from 'react-native';
import { totalPrice } from 'utils';
import styles from './styles';

const TotalInfo = ({
  isEditAppointment,
  duration,
  services,
  extras,
  products,
  isDeposit,
}) => {
  const total = totalPrice(services, extras, products);

  return (
    <React.Fragment>
      <View
        style={{
          borderRadius: scaleWidth(8),
          backgroundColor: isDeposit ? '#f884' : '#FAFAFA',
          marginTop: scaleHeight(20),
          padding: scaleWidth(10),
          justifyContent: 'space-between',
        }}>
        {isEditAppointment && (
          <View style={styles.duration}>
            <Text style={styles.txtDuration}>Total duration</Text>
            <Text style={styles.txtDuration}>{duration}</Text>
          </View>
        )}
        <View style={{ height: scaleHeight(10) }} />

        <View style={styles.rowTotal}>
          <Text style={styles.txtTotal}>Total</Text>
          <Text style={styles.txtTotal}>{`$ ${total}`}</Text>
        </View>
        <View style={{ height: scaleHeight(10) }} />
        {isDeposit && (
          <Text
            style={{
              color: '#f44',
              fontSize: scaleFont(14),
            }}>{`A deposit is required for this appointment`}</Text>
        )}
      </View>
    </React.Fragment>
  );
};

export default TotalInfo;
