import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "components";
import Triangle from "react-native-triangle";
import { scaleWidth, scaleHeight } from "utils";
import * as Animatable from "react-native-animatable";

export default class ToolTip extends React.Component {
  render() {
    return (
      <Animatable.View
        animation="pulse"
        iterationCount={"infinite"}
        direction="alternate"
        style={styles.warp}>
        <View style={styles.container}>
          <Text style={styles.txt}>
            Plesase enter phone number to register with social account.
          </Text>
        </View>
        <View style={styles.triangle}>
          <Triangle width={20} height={10} color={"#f6f6f6"} direction={"down"} />
        </View>
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  warp: {
    position: "absolute",
    left: scaleWidth(0),
    bottom: scaleHeight(6),
  },
  container: {
    backgroundColor: "#f6f6f6",
    borderRadius: 5,
    padding: scaleWidth(3),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.24,

    elevation: 5,
  },
  txt: {},
  triangle: {
    marginLeft: scaleWidth(5),
  },
});
