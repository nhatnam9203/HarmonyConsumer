import React from "react";
import { View } from "react-native";
import { Text } from "components";
import { scaleWidth } from "utils";
import Entypo from "react-native-vector-icons/Entypo";
import styles from "./styles";

const Address = ({ address = "" }) => {
  return (
    <View style={styles.addressWrap}>
      <Entypo name="location" color="#585858" size={scaleWidth(4)} />
      <Text numberOfLines={1} elipsisMode={"tail"} style={styles.txtLocation}>
        {`${address}`}
      </Text>
    </View>
  );
};

export default Address;
