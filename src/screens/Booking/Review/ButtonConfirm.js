import { Text } from 'components';
import React from 'react';
import { ActivityIndicator, Platform, StyleSheet, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { scaleWidth } from 'utils';

function ButtonConfirm(props) {
  const { onPress, isLoading, isEditAppointment, isCheckEdit, isDeposit } =
    props;

  let isDisable = false;

  if (isEditAppointment) {
    if (!isCheckEdit) {
      isDisable = true;
    }
    if (isCheckEdit) {
      isDisable = false;
    }
  }

  return (
    <View style={styles.containerButton}>
      <TouchableRipple
        disabled={isLoading || (isEditAppointment && !isCheckEdit)}
        onPress={onPress}
        borderless={true}
        style={styles.button(isDisable)}>
        <View>
          {isLoading && <ActivityIndicator size={'small'} color="white" />}
          {!isLoading && (
            <Text style={styles.txtButton(isDisable)}>{`${
              isDeposit ? 'Make a deposit' : 'Confirm'
            }`}</Text>
          )}
        </View>
      </TouchableRipple>
    </View>
  );
}

export default React.memo(ButtonConfirm);

const styles = StyleSheet.create({
  containerButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: scaleWidth(5),
    backgroundColor: 'white',

    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: isDisable => {
    return {
      justifyContent: 'center',
      alignItems: 'center',
      width: scaleWidth(90),
      height: scaleWidth(13.5),
      borderRadius: 8,
      backgroundColor: !isDisable ? '#0764B0' : '#F6F6F6',
    };
  },
  txtButton: isDisable => {
    return {
      fontWeight: Platform.OS === 'android' ? 'bold' : '600',
      fontSize: scaleWidth(4.5),
      color: !isDisable ? 'white' : '#585858',
    };
  },
});
