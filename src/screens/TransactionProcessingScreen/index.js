import React from "react";
import { View, Image } from "react-native";
import ICONS from "assets";
import { Text, Container, Header } from "components";
import * as RootNavigation from "navigations/RootNavigation";
import styles from "./style";

export default function index(props) {
  const { receiverInfo } = props.route.params;
  React.useEffect(() => {
    setTimeout(() => {
      RootNavigation.navigate("TransactionSuccessful", { receiverInfo });
    }, 2000);
  }, []);
  return (
    <Container barStyle="dark-content">
      <Header title="Buy gift" />
      <View style={styles.container_center}>
        <Image source={ICONS["wait_time"]} style={styles.image} />

        <Text fontSize={23} fontFamily="medium" color="#1c98c9" style={styles.title}>
          Transaction processing ...
        </Text>

        <Text fontSize={17} color="#404040" style={styles.content}>
          You will receive a notification when the transaction is complete
        </Text>
      </View>
    </Container>
  );
}
