import React from "react";
import { StyleSheet, View, Platform } from "react-native";
import Image from "react-native-fast-image";

import ICONS from "assets";
import { Text, Button } from "components";
import { scaleSize, formatMoney } from "utils";

const PrimaryCard = ({ onPress, card, onReload }) => {
  const { amount, imageUrl } = card;
  const url = React.useMemo(() => {
    return imageUrl ? { uri: imageUrl } : ICONS["primary_card"];
  }, [imageUrl]);

  const onHandleOnPress = () => {
    onPress(card);
  };
  return (
    <View style={{ flex: 1 }}>
      <Text fontSize={17} color="#646464">
        My card
      </Text>

      <View style={styles.container_reload}>
        <View style={styles.left_reload}>
          <Text fontSize={21} fontFamily="medium">
            $ {formatMoney(amount)}
          </Text>

          <Button onPress={onReload}>
            <Image style={styles.icon_reload} source={ICONS["reload"]} />
          </Button>
        </View>

        <Button onPress={onHandleOnPress}>
          <Text fontSize={17} color="#0764B0" fontFamily="medium">
            Details
          </Text>
        </Button>
      </View>

      <Button onPress={onHandleOnPress}>
        <Image style={styles.img_card} source={url} />
      </Button>
      <Text fontSize={15} color="#646464" fontFamily="medium" style={styles.txtMoreCard}>
        MORE CARDS
      </Text>
    </View>
  );
};

export default PrimaryCard;

const styles = StyleSheet.create({
  container_reload: {
    width: "100%",
    height: scaleSize(30),
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: scaleSize(10),
    flexDirection: "row",
  },
  left_reload: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  icon_reload: {
    width: scaleSize(18),
    height: scaleSize(18),
    resizeMode: "contain",
    marginLeft: scaleSize(15),
  },
  img_card: {
    width: scaleSize(382),
    height: scaleSize(240),
    resizeMode: "cover",
  },
  txtMoreCard: {
    marginBottom: scaleSize(15),
    marginTop: scaleSize(25),
  },
});
