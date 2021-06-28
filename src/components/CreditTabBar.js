import React from "react";
import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
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
    return (
      <View style={[styles.tabs, this.props.style]}>
        {this.props.tabs.map((tab, i) => {
          return (
            <TouchableOpacity
              key={tab}
              onPress={this.handleChangePage(i)}
              style={[
                styles.tab,
                { backgroundColor: this.props.activeTab === i ? "#F8F8F8" : "#FFFF" },
              ]}>
              <Image
                source={tab}
                style={{
                  width: scaleSize(50),
                  height: scaleSize(50),
                  tintColor: this.props.activeTab === i ? "#0764B0" : "#7A98BB",
                }}
                ref={(icon) => {
                  this.icons[i] = icon;
                }}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tab: {
    width: scaleSize(80),
    height: scaleSize(80),
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
