import React from "react";
import { StyleSheet, View } from "react-native";
import ICONS from "assets";
import { Text, Button, ProgressiveImage, LazyImage } from "components";
import { scaleSize, formatMoney, getMerchantText } from "utils";
import Image from "react-native-fast-image";
import { TouchableOpacity } from "react-native-gesture-handler";

const MoreCard = ({ item, style, onPress }) => {
  const { amount, imageUrl } = item;
  const url = imageUrl ? { uri: imageUrl, priority: Image.priority.high } : ICONS["primary_card"];
  const onHandleOnPress = () => {
    console.log('item', item)
    onPress(item);
  };
  return (
    <React.Fragment>
      <View style={[styles.container, style]}>
        <Button onPress={onHandleOnPress} style={styles.btn_image}>
          <ProgressiveImage style={styles.img_card} source={url} resizeMode="stretch" />
        </Button>

        <View style={styles.container_reload}>
          <View style={styles.title}>
            <Text fontSize={15.5} fontFamily="bold">
              $ {formatMoney(amount)}
            </Text>
            <Button onPress={onHandleOnPress}>
              <Text fontSize={16} color="#0764B0">
                Details
              </Text>
            </Button>
          </View>
          
          <Text 
            style={styles.textMerchant}
            numberOfLines={2}
            ellipsizeMode={'tail'}>
            {getMerchantText(item)}
          </Text>
        </View>
      </View>
    </React.Fragment>
  );
};

export default MoreCard;

const styles = StyleSheet.create({
  container: {
    width: scaleSize(183),
    height: scaleSize(210),
    borderColor: "#EBEBEB",
    borderRadius: scaleSize(10),
    borderWidth: scaleSize(1),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },

  container_reload: {
    flex: 1,
    marginTop: scaleSize(15),
    marginLeft: scaleSize(10),
    marginRight: scaleSize(10)
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
    borderTopLeftRadius: scaleSize(6),
    borderTopRightRadius: scaleSize(6),
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
  textMerchant: {
    fontSize: scaleFont(15),
    color: "#7D7D7D",
    marginTop: scaleSize(5)
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});
