import React from "react";
import { View } from "react-native";
import { Text } from "components";
import { scaleWidth } from "utils";
import Entypo from "react-native-vector-icons/Entypo";
import styles from "./styles";

const Rating = ({ rating = 0 }) => {
  if (rating > 0) {
    return (
      <View style={styles.rating}>
        <Text style={styles.txtRating}>{rating}</Text>
        {new Array(parseInt(rating)).fill().map(() => (
          <Entypo name="star" size={scaleWidth(3.5)} key={Math.random()} color="#FFB700" />
        ))}
      </View>
    );
  } else {
    return (
      <View style={styles.rating}>
        <Text style={styles.txtRating}>{rating}</Text>
        <Entypo name="star" size={scaleWidth(3.5)} key={Math.random()} color="#FFB700" />
      </View>
    );
  }
};

export default Rating;
