import React from "react";
import { View, Image } from "react-native";
import { useSelector } from "react-redux";
import ICONS from "assets";
import { Text, Container, Form, Header } from "components";
import { formatMoney } from "utils";
import * as RootNavigation from "navigations/RootNavigation";
import styles from "./style";

const { ButtonSubmit } = Form;

export default function index(props) {
  const { amount } = props.route.params;
  const sender = useSelector((state) => state.buygiftReducer.sender);
  let _avatarURL = sender.avatarURL ? { uri: sender.avatarURL } : ICONS["personal"];
  const goBackRoot = () => RootNavigation.navigate("Drawer");

  const Sender = () => (
    <>
      <Image source={_avatarURL} style={styles.image} />
      <Text fontSize={15} fontFamily="medium" style={styles.text}>
        {sender.fullName || "Unknown"}
      </Text>

      <Text fontSize={12} color="#585858">
        {sender.phone}
      </Text>
    </>
  );

  return (
    <Container barStyle="dark-content">
      <Header title="Buy gift" />
      <View style={styles.container_center}>
        <Image source={ICONS["giftcard_sended"]} style={styles.image} />

        <Text fontSize={23} fontFamily="medium" color="#1c98c9" style={styles.title}>
          Claim gift card successfully !
        </Text>

        <Text fontSize={25} fontFamily="bold" color="#2ebe03">
          $ {formatMoney(amount)}
        </Text>

        <Text fontSize={17} color="#404040" style={styles.content}>
          You've successfully received the gift card from
        </Text>

        <Sender />

        <View style={styles.button}>
          <ButtonSubmit onSubmit={goBackRoot} title="Done" width={160} style={{ marginTop: 50 }} />
        </View>
      </View>
    </Container>
  );
}
