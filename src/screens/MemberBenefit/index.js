import React from "react";
import { View, StyleSheet } from "react-native";
import { scaleWidth, scaleHeight } from "utils";
import ScrollableTabView from "components/react-native-scrollable-tab-view";
import { ComponentTabbar, Rank } from "./widget";
import { useSelector } from "react-redux";
import { Header, StatusBar } from "components";
import * as RootNavigation from "navigations/RootNavigation";

export default function index(props) {
  const { memberBenefits } = useSelector((state) => state.customerReducer);
  const { rewardProfile } = useSelector((state) => state.customerReducer);
  const { currentRank } = rewardProfile ? rewardProfile : "";

  const back = () => {
    RootNavigation.back();
  };

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "#f8f8f8" }}>
        <StatusBar />
        <Header title="Member benefit" headerLeft onBack={back} />
      </View>
      <View style={styles.wrapScroll}>
        <ScrollableTabView renderTabBar={() => <ComponentTabbar />} initialPage={0}>
          {memberBenefits.map((obj) => {
            return (
              <Rank
                key={obj.id}
                title={`${obj.rank} benefits`}
                data={obj.content}
                content={obj.noteRank}
                currentRank={currentRank}
              />
            );
          })}
        </ScrollableTabView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    backgroundColor: "#F8F8F8",
  },
  wrapScroll: {
    marginTop: scaleWidth(5),
    height: "100%",
    width: scaleWidth(100),
  },
});
