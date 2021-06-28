import React from "react";
import { View, Image } from "react-native";
import QRCode from "react-native-qrcode-svg";

import ICONS from "assets";
import { Text, Container, Form, Header } from "components";
import * as RootNavigation from "navigations/RootNavigation";
import styles from "./style";
import { scaleSize } from "utils";

const { ButtonSubmit } = Form;

export default function index(props) {
  const { qr_code } = props.route.params;

  const goBackRoot = () => {
    RootNavigation.navigate("Drawer");
  };

  return (
    <Container barStyle="dark-content">
      <Header title="Transaction successful" />
      <View style={styles.container_center}>
        <Text fontSize={23} fontFamily="medium" color="#1c98c9" style={styles.title}>
          Transaction Successful !
        </Text>
        <QRCode size={scaleSize(300)} value={qr_code + ""} />

        <Text fontSize={17} color="#404040" style={styles.content}>
          Scan to verify on Merchant Application
        </Text>

        <View style={{ marginTop: scaleSize(30) }}>
          <ButtonSubmit onSubmit={goBackRoot} title="Done" width={160} />
        </View>
      </View>
    </Container>
  );
}
