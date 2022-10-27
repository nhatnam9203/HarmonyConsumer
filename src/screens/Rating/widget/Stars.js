import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'components';
import Icon from 'react-native-vector-icons/Ionicons';
import { scaleWidth, scaleHeight } from 'utils';
import styleRoot from '../styles';

export default function Starts({ businessName, rating, setRating, list }) {
  const setActive = star => {
    const { key } = star;
    let rating_clone = JSON.parse(JSON.stringify(rating));

    for (let i = 0; i < rating_clone.length; i++)
      if (i <= key) rating_clone[i].isActive = true;
      else rating_clone[i].isActive = false;

    setRating(rating_clone);
  };

  return (
    <>
      <Text style={[styleRoot.txtSatified, { marginTop: scaleHeight(3) }]}>
        {'How would you rate your overall experience at \n'}
        <Text style={[styleRoot.txtStoreName, { textAlign: 'center' }]}>
          {` ${businessName} `}
        </Text>
        ?
      </Text>

      <View style={styles.container}>
        {rating.map((obj, index) => {
          return (
            <TouchableOpacity
              key={index + 'star'}
              onPress={() => setActive(obj)}>
              <Icon
                name="star"
                style={styles.icon}
                color={obj.isActive ? '#FFB700' : '#E5E5E5'}
                size={scaleWidth(12)}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: scaleHeight(2),
  },
  icon: {
    marginRight: scaleWidth(2),
  },
});
