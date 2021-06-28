import React from "react";
import { View } from "react-native";
import { Text } from "components";
import styles from "./styles";
import { useSelector } from "react-redux";

export default function index(props) {
  const userInfo = useSelector((state) => state.datalocalReducer.userInfo);
  const credit = userInfo && userInfo.userCard.amount ? userInfo.userCard.amount : "";
  return (
    <View>
      <Text fontFamily="medium" style={styles.cardName}>
        Harmony Card
      </Text>
      <Text style={styles.price}>{`$ ${credit}`}</Text>
    </View>
  );
}
