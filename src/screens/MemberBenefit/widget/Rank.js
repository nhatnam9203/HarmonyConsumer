import React, { Component } from "react";
import { Text, View, StyleSheet, Platform, Image, ScrollView } from "react-native";
import { scaleWidth } from "utils";
import images from "assets";

export default class Rank extends Component {
  render() {
    const { title = "", content = "", data = [], currentRank } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.txtUnlock}>{content}</Text>
          {data.map((obj) => (
            <Item key={Math.random() + new Date()} item={obj} />
          ))}
        </ScrollView>
      </View>
    );
  }
}

const Item = ({ item }) => {
  return (
    <View style={styles.item}>
      <View style={styles.wrapImage}>
        <Image
          source={images.ticket_green}
          style={{ width: scaleWidth(5), height: scaleWidth(5) }}
        />
      </View>
      <View style={{ marginLeft: scaleWidth(3), width: scaleWidth(80) }}>
        <Text style={styles.content1}>{item.title}</Text>
        <Text style={styles.content2}>{item.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: "#333",
    fontSize: scaleWidth(4),
    fontWeight: Platform.OS === "android" ? "bold" : "600",
  },
  container: {
    padding: scaleWidth(5),
    flex: 1,
    backgroundColor: "#fff",
  },
  txtUnlock: {
    fontSize: scaleWidth(3.2),
    color: "#888888",
    marginTop: scaleWidth(3),
  },
  wrapImage: {
    padding: scaleWidth(3),
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius: scaleWidth(30),
  },
  item: {
    flexDirection: "row",
    marginTop: scaleWidth(8),
    alignItems: "center",
  },
  content1: {
    color: "#0764B0",
    fontSize: scaleWidth(4),
    fontWeight: Platform.OS === "android" ? "bold" : "600",
  },
  content2: {
    color: "#888888",
    fontSize: scaleWidth(3.2),
    marginTop: scaleWidth(2),
  },
});
