import React from "react";
import { Text, View } from "react-native";
import { scaleWidth, scaleHeight } from "utils";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import styles from "./styles";

const Summary = ({ rating = 0, count = 0 }) => {
  return (
    <View style={styles.summary}>
      <Text style={styles.txtRating}>{`${rating} / 5`}</Text>
      <View style={{ flexDirection: "row", marginVertical: scaleHeight(0.3) }}>
        {new Array(Math.ceil(parseInt(rating))).fill().map(() => (
          <FontAwesome key={Math.random()} name="star" color="#FDB62B" size={scaleWidth(4.5)} />
        ))}
        {Math.floor(rating) < parseFloat(rating) && parseFloat(rating) < Math.ceil(rating) && (
          <FontAwesome name="star-half-empty" color="#FDB62B" size={scaleWidth(4.5)} />
        )}
      </View>
      <Text style={styles.txtCount}>{`${count} reviews`}</Text>
      <View style={styles.line} />
    </View>
  );
};

export default Summary;
