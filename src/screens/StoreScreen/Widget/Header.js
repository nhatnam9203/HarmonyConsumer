import React from "react";
import { StyleSheet, Dimensions, View, Image } from "react-native";
import ICONS from "assets";
import { scaleSize } from "utils";
import { Text, Button, SearchBar } from "components";
import { useSelector } from "react-redux";
import * as RootNavigation from "navigations/RootNavigation";
const { width } = Dimensions.get("window");

export default function Header({ openDrawer, propInput, onfocusSearch, icon }) {
  const { count } = useSelector((state) => state.inboxReducer);

  const openInbox = () => {
    RootNavigation.navigate("Inbox");
  };

  return (
    <View style={styles.container_header}>
      <Button onPress={openDrawer}>
        <Image style={styles.icon_drawer} source={icon ? icon : ICONS["drawer"]} />
      </Button>

      <SearchBar
        placeholder="Search..."
        placeholderTextColor="#646464"
        iconLeft={ICONS["searchbar"]}
        onPressSearchList={onfocusSearch}
        // {...propInput}
      />

      <Button style={{ position: "relative" }} onPress={openInbox}>
        <Image style={styles.icon_tone} source={ICONS["tone"]} />
        {count > 0 && (
          <View style={styles.iconNotify}>
            <Text style={styles.txtNotify}>{count > 99 ? "99+" : count}</Text>
          </View>
        )}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container_header: {
    height: scaleSize(40),
    alignItems: "center",
    width: scaleSize(382),
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: 'red'
  },
  container_navigation: {
    width: width * 0.9,
    height: scaleSize(44),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: scaleSize(20),
  },
  icon_drawer: {
    width: scaleSize(20),
    height: scaleSize(18),
    resizeMode: 'contain'
  },
  icon_tone: {
    width: scaleSize(16),
    height: scaleSize(20),
    // resizeMode: 'contain'
  },
  iconNotify: {
    width: scaleSize(19),
    height: scaleSize(19),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 300,
    backgroundColor: "red",
    position: "absolute",
    top: -scaleSize(10),
    right: -scaleSize(9),
  },
  txtNotify: {
    color: "white",
    fontWeight: "bold",
    fontSize: scaleSize(10),
  },
});
