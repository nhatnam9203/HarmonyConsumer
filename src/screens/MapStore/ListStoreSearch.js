import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "components";
import { scaleWidth, scaleHeight, slop } from "utils";

export default function ListStoreSearch({ listStore, selectStore }) {
  if (listStore.length > 0) {
    return (
      <View style={styles.container}>
        {listStore.map((store, index) => {
          return (
            <TouchableOpacity
              hitSlop={slop}
              onPress={() => selectStore(store)}
              style={styles.btn}
              key={index}>
              <Text style={styles.txt}>{store.businessName}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
  return null;
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: scaleHeight(9) + scaleWidth(9),
    left: scaleWidth(3),
    width: scaleWidth(94),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#eeeeee",
    backgroundColor: "white",
    padding: scaleWidth(3),
    zIndex: 99999,
    elevation: 1,
  },
  btn: {
    marginBottom: scaleHeight(1.3),
  },
  txt: {
    fontSize: scaleWidth(3.8),
  },
});
