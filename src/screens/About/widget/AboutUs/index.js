import React, { Component } from "react";
import { View, Image } from "react-native";
import styles from "../../styles";
import images from "assets";
import { Text, Header, StatusBar } from "components";
import { scaleWidth } from "utils";
import Configs from '@src/configs';

export default function index(props) {
  const onBack = () => {
    props.goToPage(0);
  };

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "#f8f8f8" }}>
        <StatusBar />
        <Header headerLeft onBack={onBack} title={"About Us"} />
      </View>
      <View style={styles.body}>
        <Image style={styles.logo} source={images.logoHarmony3} />
        <Text style={styles.txtVersion}>{`Version ${Configs.VERSION}`}</Text>
        <Text style={styles.txtCopyright}>Copyright @ 2019 HarmonyPay Inc,.</Text>
        <Text style={styles.aboutContent}>
          Taking the mission statement from Jerry MaGuire to heart, we strive to build a company
          that's truly care for our clients. As Dicky Fox always said the same thing when asked for
          his secret
        </Text>
        <Text style={[styles.term, { marginTop: scaleWidth(6) }]}>Application terms</Text>
        <Text style={[styles.term, { marginTop: scaleWidth(3) }]}>Privacy statement</Text>
      </View>
    </View>
  );
}
