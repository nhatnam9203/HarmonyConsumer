import React from "react";
import { StyleSheet, Image, View } from "react-native";

import { scaleSize } from "utils";
import { Text, Button } from "components";

const CreditCardList = ({ data }) => {
  return (
    <View>
      {data.map((item, index) => {
        return (
          <View key={index + ""} style={styles.container_item}>
            <Image source={item.url} style={styles.icon} />

            <View style={styles.cotent}>
              <Text fontSize={15} color="#888888">
                {item.user_name}
              </Text>
              <Text fontSize={12} color="#404040">
                ⦁⦁⦁⦁ {item.account_number}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default CreditCardList;

const styles = StyleSheet.create({
  container_item: {
    width: scaleSize(382),
    height: scaleSize(60),
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EEEEEE",
    borderRadius: scaleSize(5),
    flexDirection: "row",
    paddingHorizontal: scaleSize(12),
    paddingVertical: scaleSize(12),
    marginBottom: scaleSize(12),
  },
  cotent: {
    height: "100%",
    justifyContent: "space-between",
    marginLeft: scaleSize(15),
  },
  icon: {
    width: scaleSize(32),
    height: scaleSize(32),
    resizeMode: "contain",
  },
});
