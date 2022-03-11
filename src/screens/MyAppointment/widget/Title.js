import React from 'react';
import { View } from 'react-native';
import { Text } from 'components';
import styles from '../styles';

const Title = ({ title, quantity, color = '#D4F8FC' }) => {
  return (
    <View style={styles.row}>
      <Text fontFamily="medium" style={styles.title}>
        {title}
      </Text>
      <View style={[styles.qty, { backgroundColor: color }]}>
        <Text style={styles.textQty}>{`${quantity}`}</Text>
      </View>
    </View>
  );
};

export default Title;
