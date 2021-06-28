import React from "react";
import { StyleSheet, View } from "react-native";
import ICONS from "assets";
import { Text, Button, ProgressiveImage, LazyImage } from "components";
import { scaleSize, formatMoney } from "utils";
import Image from "react-native-fast-image";

const MoreCard = ({ item, style, onPress }) => {
  const { amount, imageUrl } = item;
  const url = imageUrl ? { uri: imageUrl, priority: Image.priority.high } : ICONS["primary_card"];
  const onHandleOnPress = () => {
    onPress(item);
  };
  return (
    <React.Fragment>
      <View style={[styles.container, style]}>
        <Button onPress={onHandleOnPress} style={styles.btn_image}>
          <ProgressiveImage style={styles.img_card} source={url} resizeMode="cover" />
        </Button>

        <View style={styles.container_reload}>
          <Text fontSize={15.5} fontFamily="bold">
            $ {formatMoney(amount)}
          </Text>

          <Button onPress={onHandleOnPress}>
            <Text fontSize={16} color="#0764B0">
              Details
            </Text>
          </Button>
        </View>
      </View>
    </React.Fragment>
  );
};

export default MoreCard;

const styles = StyleSheet.create({
  container: {
    width: scaleSize(183),
    height: scaleSize(145),
    alignItems: "center",
    justifyContent: "space-between",
  },

  container_reload: {
    width: "100%",
    height: scaleSize(30),
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  icon_reload: {
    width: scaleSize(22),
    height: scaleSize(22),
    resizeMode: "contain",
    marginLeft: scaleSize(5),
  },
  img_card: {
    width: scaleSize(183),
    height: scaleSize(115),
  },
  btn_image: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});
