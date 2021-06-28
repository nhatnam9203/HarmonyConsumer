import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Card, Text, Button } from "components";
import ICONS from "assets";
import { scaleSize, scaleWidth } from "utils";
import { useSelector, useDispatch } from "react-redux";
import actions from "@redux/actions";
import Image from "react-native-fast-image";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function ItemCard(props) {
  const dispatch = useDispatch();

  const {
    item,
    width,
    height,
    borderRadius,
    style,
    onPress,
    isSearchList = false,
    valueSearch = "",
  } = props;

  const {
    businessName,
    addressFull,
    distance = 0,
    pointRate,
    isFavorited,
    banners,
    merchantId,
    rating,
    ratingCount,
  } = item;

  const renderImg =
    banners.length > 0
      ? { uri: banners[0].imageUrl, priority: Image.priority.high }
      : ICONS.bannerMerchant;

  const userInfo = useSelector((state) => state.datalocalReducer.userInfo);
  const token = useSelector((state) => state.datalocalReducer.token);

  const updateFavouriteMerchant = () => {
    const { userId } = userInfo;
    const body = {
      userId,
      merchantId,
      isFavorited: isFavorited === 1 ? 0 : 1,
    };
    if (isSearchList) {
      dispatch(actions.storeAction.updateFavouriteMerchant(body, token, valueSearch));
    } else {
      dispatch(actions.storeAction.updateFavouriteMerchant(body, token));
    }
  };

  return (
    <TouchableOpacity activeOpacity={1} onPress={() => onPress(item)}>
      <Card
        width={width}
        height={height}
        borderRadius={borderRadius}
        paddingHorizontal={0}
        style={style}>
        <Image source={renderImg} style={styles.cardImage} />
        <View style={styles.textContent}>
          <Text fontSize={20} color="#585858" fontFamily="medium">
            {businessName}
          </Text>

          <View style={styles.text_content_row}>
            <Text
              numberOfLines={2}
              fontSize={15.5}
              color="#888888"
              style={{ width: "75%", letterSpacing: 0.3 }}>
              {" "}
              {addressFull}
            </Text>
            <Text fontSize={15.5} color="#666666">
              {distance} mi
            </Text>
          </View>

          <View style={styles.text_content_rating}>
            {parseFloat(rating) > 0 && (
              <React.Fragment>
                <Text
                  fontSize={15.5}
                  fontFamily="medium"
                  color="#585858"
                  style={styles.text_rating}>
                  {rating}
                </Text>
                {new Array(Math.floor(rating)).fill().map((obj, key) => (
                  <FontAwesome
                    key={"star" + key}
                    name="star"
                    color="#FDB62B"
                    size={scaleWidth(4.5)}
                  />
                ))}
                {Math.floor(rating) < parseFloat(rating) &&
                  parseFloat(rating) < Math.ceil(rating) && (
                    <FontAwesome name="star-half-empty" color="#FDB62B" size={scaleWidth(4.5)} />
                  )}
              </React.Fragment>
            )}

            {parseFloat(ratingCount) > 0 && (
              <Text fontSize={15.5} color="#888888">
                {" "}
                {`(${ratingCount})`}
              </Text>
            )}

            {parseFloat(ratingCount) == 0 && (
              <Text fontSize={15.5} color="#888888">
                {" "}
                No rating
              </Text>
            )}
          </View>
        </View>

        {/* --------------like -------------------- */}
        <Button disabled={true} onPress={updateFavouriteMerchant} style={styles.button_like}>
          {isFavorited === 0 && <AntDesign name="heart" size={scaleWidth(6)} color="#DDDDDD" />}
          {isFavorited === 1 && <AntDesign name="heart" size={scaleWidth(6)} color="#ED1C24" />}
        </Button>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  textContent: {
    width: "100%",
    paddingHorizontal: scaleSize(10),
    paddingVertical: scaleSize(10),
  },
  cardImage: {
    width: "100%",
    height: scaleSize(140),
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  text_content_row: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginTop: scaleSize(10),
  },
  text_content_rating: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scaleSize(10),
  },
  text_rating: {
    fontSize: scaleWidth(3.8),
    marginRight: 5,
  },
  icon_rating: {
    width: scaleSize(10),
    height: scaleSize(10),
    resizeMode: "contain",
    marginRight: scaleSize(5),
  },
  icon_like: {
    width: scaleSize(25),
    height: scaleSize(20),
  },
  button_like: {
    position: "absolute",
    top: scaleSize(10),
    right: scaleSize(15),
    elevation: 2,
  },
});
