import React from "react";
import { StyleSheet, View, Platform } from "react-native";
import Image from "react-native-fast-image";

import ICONS from "assets";
import { Text, Button } from "components";
import { scaleSize, formatMoney } from "utils";
import { TouchableOpacity } from "react-native-gesture-handler";

const PrimaryCard = ({ onPress, card, onReload, onHandleBuyGift, onPressAddCard }) => {
  const { amount, imageUrl } = card;
  const url = React.useMemo(() => {
    return imageUrl ? { uri: imageUrl } : ICONS["primary_card"];
  }, [imageUrl]);

  const onHandleOnPress = () => {
    onPress(card);
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={styles.viewHeader}>
          <Text fontSize={16} color="#646464">
            Primary card
          </Text>
          <View style={styles.container_reload}>
            <View style={styles.left_reload}>
              <Text style={styles.textMoney}>
                $ {formatMoney(amount)}
              </Text>

              <Button onPress={onReload}>
                <Image style={styles.icon_reload} source={ICONS["reload"]} />
              </Button>
            </View>
          </View>
          <TouchableOpacity
            onPress={onHandleOnPress}>
            <Text fontSize={15} color="#0764B0" >
              View details
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.buyGiftButton}
          onPress={onHandleBuyGift}>
          <Text 
            style={styles.buyGiftText}
            >
            Buy gift
          </Text>
        </TouchableOpacity>
      </View>

      <Button onPress={onHandleOnPress}>
        <Image style={styles.img_card} source={url} />
      </Button>
      
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
    marginVertical: scaleSize(5),
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
  buyGiftText: {
    fontSize: scaleSize(17),
    color: "white",
    fontWeight: "bold",
  },
  buyGiftButton: {
    backgroundColor: "#0764B0",
    height: scaleSize(45),
    width: scaleSize(120),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scaleSize(10)
  },
  viewHeader: {
    justifyContent: 'space-between',
    flex: 1,
    marginBottom: scaleSize(15)
  },
  textMoney: {
    fontSize: scaleSize(25),
    fontWeight: '600'
  },
  moreCardView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textAddCard: {
    color: '#0764B0',
    fontSize: scaleSize(17),
    fontWeight: '700',
    marginLeft: scaleSize(5),
    marginRight: scaleSize(10)
  }
});
