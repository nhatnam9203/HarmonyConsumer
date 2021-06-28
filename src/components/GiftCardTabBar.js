import React from "react";
import { StyleSheet, Image, View, TouchableOpacity, Animated } from "react-native";
import Text from "./Text";
import { scaleSize } from "utils";
class CreditTabBar extends React.Component {
  icons = [];

  constructor(props) {
    super(props);
    this.icons = [];
  }
  handleChangePage = (i) => () => {
    if (!this.props.goToPage) return;
    this.props.goToPage(i);
  };
  render() {
    const containerWidth = this.props.containerWidth;
    const numberOfTabs = this.props.tabs.length;

    const tabUnderlineStyle = {
      position: "absolute",
      width: containerWidth / numberOfTabs,
      height: 4,
      backgroundColor: "#0764B0",
      bottom: 0,
      left: 0,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,

      elevation: 10,
    };

    const translateX = this.props.scrollValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, containerWidth / numberOfTabs],
    });
    return (
      <View style={[styles.tabs, this.props.style]}>
        {this.props.tabs.map((tab, i) => {
          return (
            <TouchableOpacity
              key={i + ""}
              onPress={this.handleChangePage(i)}
              style={[styles.tab, this.props.tab]}>
              <Image
                source={tab.url}
                style={{
                  width: scaleSize(20),
                  height: scaleSize(20),
                  resizeMode: "contain",
                  marginBottom: scaleSize(6),
                  tintColor: this.props.activeTab === i ? "rgb(59,89,152)" : "#7A98BB",
                }}
                ref={(icon) => {
                  this.icons[i] = icon;
                }}
              />
              <Text
                fontSize={17}
                color={this.props.activeTab === i ? "#0764B0" : "#7A98BB"}
                style={{ fontWeight: this.props.activeTab === i ? "700" : "500" }}>
                {tab.name}
              </Text>
            </TouchableOpacity>
          );
        })}
        <Animated.View
          style={[
            tabUnderlineStyle,
            {
              transform: [{ translateX }],
            },
            this.props.underlineStyle,
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tab: {
    width: scaleSize(80),
    height: scaleSize(43),
    alignItems: "center",
    justifyContent: "center",
  },
  tabs: {
    width: scaleSize(180),
    height: scaleSize(80),
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default CreditTabBar;
