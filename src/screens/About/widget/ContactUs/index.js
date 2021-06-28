import React from "react";
import { View, ScrollView } from "react-native";
import styles from "../../styles";
import { Header, StatusBar } from "components";
import InfoContact from "./InfoContact";
import SendEmail from "./SendEmail";
import { scaleHeight } from "utils";

export default function index(props) {
  const onBack = () => {
    props.goToPage(0);
  };

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "#f8f8f8" }}>
        <StatusBar />
        <Header headerLeft onBack={onBack} title={"Contact US"} />
      </View>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <InfoContact />
        <SendEmail />
        <View style={{ height: scaleHeight(15) }} />
      </ScrollView>
    </View>
  );
}
