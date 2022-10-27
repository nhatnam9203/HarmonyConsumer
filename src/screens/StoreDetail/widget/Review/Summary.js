import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { scaleWidth, scaleHeight } from 'utils';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

const Summary = ({ rating = 0, count = 0, onHandleAddReview }) => {
  const _onHandleAddReview = () => {
    if (onHandleAddReview && typeof onHandleAddReview === 'function') {
      onHandleAddReview();
    }
  };

  return (
    <View style={styles.summary}>
      <View style={{ flex: 0, marginHorizontal: scaleWidth(1) }}>
        <Text style={styles.txtRating}>{`${parseFloat(rating).toFixed(
          1,
        )} / 5`}</Text>
        <View
          style={{ flexDirection: 'row', marginVertical: scaleHeight(0.3) }}>
          {new Array(Math.ceil(parseInt(rating))).fill().map(() => (
            <FontAwesome
              key={Math.random()}
              name="star"
              color="#FDB62B"
              size={scaleWidth(5)}
            />
          ))}
          {Math.floor(rating) < parseFloat(rating) &&
            parseFloat(rating) < Math.ceil(rating) && (
              <FontAwesome
                name="star-half-empty"
                color="#FDB62B"
                size={scaleWidth(5)}
              />
            )}
        </View>
        <Text style={styles.txtCount}>{`${count} reviews`}</Text>
      </View>
      <View
        style={{
          width: scaleWidth(30),
          height: scaleHeight(5),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            borderRadius: 5,
            width: '100%',
            height: scaleWidth(12),
            backgroundColor: '#0764B0',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={_onHandleAddReview}>
          <Text style={{ color: 'white', fontWeight: '700', fontSize: 14 }}>
            Add Review
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Summary;
