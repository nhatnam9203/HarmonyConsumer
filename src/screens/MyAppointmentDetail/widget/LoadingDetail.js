import React, { Component } from "react";
import { View } from "react-native";
import { Text } from "components";
import { scaleWidth } from "utils";

export default class LoadingDetail extends Component {
  render() {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          backgroundColor: "white",
        }}>
        {/* <Text
          style={{
            fontSize: scaleWidth(6),
            fontStyle: "italic",
          }}>
          {" "}
          Loading...
        </Text> */}
      </View>
    );
  }
}
