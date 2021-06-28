import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { scaleWidth } from "utils";
import images from "assets";

const tabs = [
  {
    key: 0,
    name: "Bronze",
    image: images.crowns_bronze,
  },
  {
    key: 1,
    name: "Silver",
    image: images.crowns_silver,
  },
  {
    key: 2,
    name: "Gold",
    image: images.crowns_gold,
  },
  {
    key: 3,
    name: "Platinum",
    image: images.crowns_platinum,
  },
];

const CustomTab = ({ goToPage, activeTab }) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
      }}>
      {tabs.map((tab, index) => {
        return (
          <TouchableOpacity
            style={{
              width: "25%",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: index === activeTab ? "white" : "#F9F9F9",
              paddingVertical: scaleWidth(4),
              borderTopWidth: 0,
            }}
            onPress={() => goToPage(index)}
            key={index}>
            <Image source={tab.image} style={{ width: scaleWidth(5), height: scaleWidth(5) }} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTab;
