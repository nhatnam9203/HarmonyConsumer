import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Card, Text, Button, Badge } from "components";
import ICONS from "assets";
import { scaleSize } from "utils";
import Configs from "../../../configs";
const { CARD_WIDTH } = Configs;
const ButtonTab = ({ tabs, activeTab, handleChangePage, style }) => {
  const onHandleChangePage = (i) => () => {
    handleChangePage(i);
  };
  return (
    <View style={[styles.tabs, style]}>
      {tabs.map((tab, i) => {
        return (
          <Button
            hitSlop={{ top: 0, left: 0, right: 0, bottom: 0 }}
            key={i + ""}
            onPress={onHandleChangePage(i)}
            style={[
              styles.container,
              activeTab === i
                ? { backgroundColor: "#0764B0" }
                : { backgroundColor: "#FFF", borderColor: "#DDDDDD", borderWidth: 1 },
            ]}>
            <Image
              source={tab.url}
              style={[styles.icon, { tintColor: activeTab === i ? "#FFF" : "#404040" }]}
            />
            <Text
              fontSize={15}
              style={{ fontWeight: "500" }}
              color={activeTab === i ? "#FFF" : "#404040"}>
              {tab.name}
            </Text>
          </Button>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: scaleSize(125),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: scaleSize(32),
    borderRadius: scaleSize(20),
  },
  tabs: {
    width: scaleSize(260),
    height: scaleSize(32),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    width: scaleSize(16),
    height: scaleSize(16),
    resizeMode: "contain",
    marginRight: scaleSize(5),
  },
});
export default ButtonTab;
