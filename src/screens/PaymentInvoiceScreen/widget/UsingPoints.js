import React from "react";
import { StyleSheet, View, Image } from "react-native";
import CheckBox from "@react-native-community/checkbox";

import { Text, Button } from "components";
import { scaleSize } from "utils";
import ICONS from "assets";
export default function UsingPoints({ points = 0, pointIsUsed = 0, onValueChange, value }) {
  let txt_available = points > 0 ? "points available" : "You do not have HP points to pay.";

  return (
    <View style={styles.container}>
      <View style={styles.display_row}>
        <Button onPress={onValueChange} disabled={points > 0 ? false : true}>
          <CheckBox
            disabled={true}
            boxType="square"
            style={styles.checkbox}
            value={value}
            tintColors={{ true: "#0764b0" }}
          />
        </Button>

        <Text fontSize={17} color={points > 0 ? "#404040" : "#A9A9A9"}>
          Using HP Points
        </Text>
      </View>

      <Text fontSize={12} color="#888888" style={{ paddingLeft: scaleSize(30) }}>
        {txt_available}
      </Text>

      {points > 0 ? (
        <View style={[styles.display_row, { paddingLeft: scaleSize(29) }]}>
          <Image style={styles.image} source={ICONS["icon_green_dollar"]} />
          <Text fontSize={20} color="#0764b0" fontFamily="bold">
            {points}
          </Text>

          {pointIsUsed > 0 && (
            <Text fontSize={20} color="#ED1C24" style={{ marginLeft: scaleSize(3) }}>
              (-{pointIsUsed})
            </Text>
          )}
        </View>
      ) : (
        <Button style={styles.button}>
          <Text fontSize={15} color="#0764b0">
            How to accumulate points
          </Text>

          <Image style={styles.icon} source={ICONS["arrow_forward"]} />
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: scaleSize(382),
    height: scaleSize(106),
    marginTop: scaleSize(15),
    backgroundColor: "#f8f8f8",
    paddingHorizontal: scaleSize(16),
    paddingVertical: scaleSize(12),
    justifyContent: "space-between",
    borderRadius: scaleSize(5),
  },
  image: {
    width: scaleSize(24),
    height: scaleSize(24),
    marginRight: scaleSize(8),
    resizeMode: "contain",
  },

  icon: {
    width: scaleSize(15),
    height: scaleSize(15),
    resizeMode: "contain",
    tintColor: "#0764B0",
  },

  checkbox: {
    width: scaleSize(20),
    height: scaleSize(20),
    marginRight: scaleSize(10),
  },

  content_text: {
    width: scaleSize(290),
    height: scaleSize(80),
    justifyContent: "space-between",
  },
  button: {
    borderTopWidth: 1.5,
    borderTopColor: "#EEEEEE",
    width: scaleSize(350),
    justifyContent: "space-between",
    alignItems: "center",
    height: scaleSize(30),
    flexDirection: "row",
    paddingTop: scaleSize(8),
    paddingLeft: scaleSize(30),
  },

  display_row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
