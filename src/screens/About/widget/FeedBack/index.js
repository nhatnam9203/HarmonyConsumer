import React from "react";
import { View, Linking } from "react-native";
import styles from "../../styles";
import Link from "./Link";
import Line from "./Line";
import Title from "./Title";
import { Header, StatusBar } from "components";

export default function index(props) {
  const openLink = () => {
    Linking.openURL("https://www.harmonypayment.com/");
  };

  const onBack = () => {
    props.goToPage(0);
  };

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "#f8f8f8" }}>
        <StatusBar />
        <Header headerLeft onBack={onBack} title={"Help and Feedback"} />
      </View>
      <View style={{ flex: 1 }}>
        <Title title="Help" />
        <Link title="Get Help" action={openLink} />
        <Link title="Browse known issues" action={openLink} />
        <Line />
        <Title title="Feedback" />
        <Link title="Send feedback" action={openLink} />
        <Link title="Report a problem" action={openLink} />
        <Link title="Rate us" action={openLink} />
      </View>
    </View>
  );
}
