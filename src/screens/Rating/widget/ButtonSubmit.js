import React from 'react';
import { View, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { scaleWidth, scaleHeight } from 'utils';
import { Text } from 'components';

export default function ButtonSubmit({ onSubmit }) {
  return (
    <View>
      <TouchableOpacity onPress={onSubmit} style={styles.buttonSubmit}>
        <Text style={styles.txtSubmit}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonSubmit: {
    width: scaleWidth(80),
    height: scaleWidth(12),
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0764B0',
    alignSelf: 'center',
    marginTop: scaleHeight(2),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 3,
  },
  txtSubmit: {
    color: 'white',
    fontSize: scaleWidth(4.5),
    fontWeight: '500',
  },
  txtSkip: {
    marginTop: scaleHeight(2),
    textAlign: 'center',
    textDecorationLine: 'underline',
    color: '#0764B0',
    fontSize: scaleWidth(4),
    fontWeight: Platform.OS === 'android' ? 'bold' : '500',
  },
});
