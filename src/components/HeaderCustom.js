import React from "react";
import { StyleSheet, View, Image, Platform, TouchableOpacity } from "react-native";
import { scaleSize } from "utils";
import { Button, Text } from "components";
import ICONS from "assets";
import { useSelector } from "react-redux";

export default function HeaderCustom(props) {

  const {
    title,
    onBack,
    headerLeft,
    headerRight,
    iconLeft = ICONS["arrow_back_ios"],
    style,
    onRightPress,
    iconRight,
    iconRightStyle={},
    textRight,
    textRightStyle={},
    colorTextRight
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
      
      {headerRight && 
      <TouchableOpacity style={styles.right} onPress={onRightPress}>
        {iconRight && <Image style={iconRightStyle && iconRightStyle} source={iconRight} />}
        {textRight && <Text color={colorTextRight || '#585858'} style={textRightStyle && textRightStyle}>{textRight}</Text>}
      </TouchableOpacity>
      }
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
