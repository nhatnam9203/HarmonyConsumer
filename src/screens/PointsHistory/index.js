import React from "react";
import { View } from "react-native";
import { scaleWidth } from "utils";
import ScrollableTabView from "components/react-native-scrollable-tab-view";
import { GetPoint, UsePoint, ComponentTabbar } from "./widget";
import styles from "./styles";
import { useSelector } from "react-redux";
import { Header, StatusBar } from "components";

export default function index(props) {
  const { points_customer, points_customer_used } = useSelector((state) => state.customerReducer);

  const back = () => {
    props.navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "#f8f8f8" }}>
        <StatusBar />
        <Header onBack={back} headerLeft title="Points history" />
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.wrapScroll}>
          <ScrollableTabView
            style={{ flex: 1, backgroundColor: "white" }}
            renderTabBar={() => <ComponentTabbar />}
            initialPage={0}>
            <GetPoint points_customer={points_customer} />
            <UsePoint points_customer_used={points_customer_used} />
          </ScrollableTabView>
        </View>
      </View>
    </View>
  );
}
