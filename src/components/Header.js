import React from "react";
import { StyleSheet, View, Image, Platform } from "react-native";
import { scaleSize } from "utils";
import { Button, Text } from "components";
import ICONS from "assets";
import { useSelector } from "react-redux";

export default function Header(props) {
  const { count } = useSelector((state) => state.inboxReducer);

  const {
    title,
    onBack,
    onPressRight,
    headerLeft,
    headerRight,
    iconLeft = ICONS["arrow_back_ios"],
    iconRight = ICONS["tone"],
    style,
    styleIconRight = {},
  } = props;
  return (
    <View style={[styles.container, style]}>
      {headerLeft && (
        <Button style={styles.left} onPress={onBack}>
          <Image style={styles.arrow_back} source={iconLeft} />
        </Button>
      )}
      <Text fontSize={20} color="#585858" fontFamily="medium">
        {title}
      </Text>
      {headerRight && (
        <Button style={styles.right} onPress={onPressRight}>
          <View style={{ position: "relative" }}>
            <Image style={[styles.arrow_back2, styleIconRight]} source={iconRight} />
            {iconRight === ICONS["tone"] && count > 0 && (
              <View style={styles.iconNotify}>
                <Text style={styles.txtNotify}>{count > 99 ? "99+" : count}</Text>
              </View>
            )}
          </View>
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: scaleSize(60),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
  },
  arrow_back: {
    width: scaleSize(20),
    height: scaleSize(18),
    resizeMode: "contain",
    tintColor: "#585858",
  },
  arrow_back2: {
    width: scaleSize(20),
    height: scaleSize(20),
    resizeMode: "contain",
    tintColor: "#585858",
  },
  left: {
    position: "absolute",
    left: scaleSize(15),
  },
  right: {
    position: "absolute",
    right: scaleSize(15),
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
    right: -scaleSize(6),
  },
  txtNotify: {
    color: "white",
    fontWeight: "bold",
    fontSize: scaleSize(10),
  },
});
