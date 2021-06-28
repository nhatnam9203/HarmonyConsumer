import React, { useState } from "react";
import { View, Image, Dimensions } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera } from "react-native-camera";

import ICONS from "assets";
import { Text, Container, Button, Header } from "components";

import * as RootNavigation from "navigations/RootNavigation";
import styles from "./style";
const { height } = Dimensions.get("window");

export default function index(props) {
  const {
    objScan: { headerText, marker, onPress, field },
  } = props.route.params;

  const onBack = () => {
    RootNavigation.back();
  };

  const onHandleRead = async (scans) => {
    const { data } = scans;
    if (field) {
      onPress(field, data + "");
    } else {
      const invoice = await JSON.parse(data);

      setTimeout(() => {
        RootNavigation.navigate("InvoiceDetailByScan", { invoice: invoice });
      }, 200);
    }

    onBack();
  };

  return (
    <Container barStyle="dark-content">
      <Header
        title={headerText}
        iconLeft={ICONS["arrow_back_ios"]}
        headerLeft={true}
        onBack={onBack}
      />

      <View style={styles.container_center}>
        <QRCodeScanner
          containerStyle={styles.container_scan}
          cameraStyle={{ height: height - 60 }}
          onRead={onHandleRead}
          reactivateTimeout={4000}
          reactivate={true}
          flashMode={RNCamera.Constants.FlashMode.auto}
          cameraProps={{ flashMode: RNCamera.Constants.FlashMode.auto }}
          showMarker={true}
          customMarker={<Image source={marker} style={styles.image_marker_qr} />}
        />
      </View>
    </Container>
  );
}
