import React from "react";
import { TouchableOpacity } from "react-native";
import Image from "react-native-fast-image";
import icons from "assets";
import styles from "./styles";
import { Text } from "components";

function ButtonReview({ onPress }) {
  return (
    <React.Fragment>
      <Text style={styles.txtClickHere}>Click here to review on Google.</Text>
      <TouchableOpacity style={styles.buttonReviewContainer} onPress={onPress}>
        <Image resizeMode="contain" source={icons.buttonReview} style={styles.buttonReview} />
      </TouchableOpacity>
    </React.Fragment>
  );
}

export default React.memo(ButtonReview);
