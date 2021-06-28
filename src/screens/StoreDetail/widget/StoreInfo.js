import React from "react";
import { View, StyleSheet, Image, TouchableOpacity, Animated, Linking } from "react-native";
import images from "assets";
import { scaleWidth, scaleHeight, slop, getTimeWorkingNow_Merchant, sendWhatsApp } from "utils";

import { Text } from "components";
import AntDesign from "react-native-vector-icons/AntDesign";
import moment from "moment-timezone";
import { useDispatch, useSelector } from "react-redux";
import actions from "@redux/actions";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as RootNavigation from "navigations/RootNavigation";

function StoreInfo(props) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.datalocalReducer.token);
  const userInfo = useSelector((state) => state.datalocalReducer.userInfo);
  const merchant_detail = useSelector((state) => state.storeReducer.merchant_detail);
  const { isSaveTocall, typeCall } = useSelector((state) => state.datalocalReducer);

  const {
    merchant,
    scrollY,
    animatedTranslateY_ListTime,
    setOpenListTime,
    isOpenListTime,
    openModalCall,
    isScollBottom,
    isBottom,
  } = props;

  const height = scrollY.interpolate({
    inputRange: [0, scaleHeight(30)],
    outputRange: [scaleWidth(65), 0],
    extrapolate: "clamp",
  });

  const opacityInfo = scrollY.interpolate({
    inputRange: [0, scaleHeight(25)],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const { businessHour, isFavorited, rating, ratingCount } = merchant;

  const toggleOpenWorkingTime = () => {
    setOpenListTime(!isOpenListTime);
    animatedTranslateY_ListTime(!isOpenListTime);
  };

  const updateFavouriteMerchant = (merchantId, isFavorited) => {
    const { userId } = userInfo;
    const body = {
      userId,
      merchantId,
      isFavorited: isFavorited === 1 ? 0 : 1,
    };
    dispatch(actions.storeAction.updateFavouriteMerchant(body, token));
  };

  const openMapStore = () => {
    dispatch(actions.storeAction.selectStore(merchant));
    RootNavigation.navigate("MapStore", { merchant });
  };

  const checkToCallLocal = () => {
    const { phone } = merchant;
    if (isSaveTocall) {
      if (typeCall === "phone") {
        Linking.openURL(`tel:${phone}`);
      } else {
        sendWhatsApp(phone);
      }
    }
  };

  const renderStoreName = () => {
    const { businessName, merchantId } = merchant;
    return (
      <Animated.View>
        <View style={[styles.rowTitle]}>
          <Text fontFamily="medium" style={styles.storeName}>{`${businessName}`}</Text>
          <Animated.View>
            <TouchableOpacity
              hitSlop={slop}
              onPress={() => updateFavouriteMerchant(merchantId, isFavorited)}>
              {isFavorited === 0 && <AntDesign name="heart" size={scaleWidth(6)} color="#DDDDDD" />}
              {isFavorited === 1 && <AntDesign name="heart" size={scaleWidth(6)} color="#ED1C24" />}
            </TouchableOpacity>
          </Animated.View>
        </View>

        <View style={[styles.row, { marginTop: scaleHeight(0.8) }]}>
          {parseFloat(rating) > 0 && (
            <React.Fragment>
              <Text fontSize={15.5} fontFamily="medium" color="#585858" style={styles.text_rating}>
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
      </Animated.View>
    );
  };

  const renderAddress = () => {
    const { addressFull } = merchant;
    return (
      <TouchableOpacity onPress={openMapStore} style={[styles.row, styles.row2]}>
        <Image source={images.geo_blue} style={styles.icon} />
        <Text style={styles.txt}>{`${addressFull}`}</Text>
      </TouchableOpacity>
    );
  };

  const renderPhone = () => {
    const { phone } = merchant;
    return (
      <TouchableOpacity
        onPress={() => {
          isSaveTocall ? checkToCallLocal() : openModalCall(phone);
        }}
        style={[styles.row, styles.row2]}>
        <Image source={images.phone_blue} style={styles.icon} />
        <Text style={styles.txt}>{`${phone}`}</Text>
      </TouchableOpacity>
    );
  };

  const renderWorkingTime = () => {
    let { time } = getTimeWorkingNow_Merchant(merchant_detail);
    time = time === "Close" ? time : `${time}`;
    return (
      <TouchableOpacity hitSlop={slop} onPress={toggleOpenWorkingTime}>
        <Animated.View
          style={[
            styles.row,
            styles.row2,
            {
              justifyContent: "space-between",
            },
          ]}>
          <View style={styles.row}>
            <Image
              source={images.clock_blue}
              style={[styles.icon, { tintColor: time === "Close" ? "red" : "#1467AE" }]}
            />
            <Text style={styles.txtNow(time)}>{`${time}`}</Text>
          </View>
          <View>
            {!isOpenListTime && <AntDesign name="down" size={scaleWidth(3.7)} color={"#404040"} />}
            {isOpenListTime && <AntDesign name="up" size={scaleWidth(3.7)} color={"#404040"} />}
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const renderListWorkingTime = () => {
    const currentDay =
      merchant_detail.timezone && merchant_detail.timezone !== "0"
        ? moment().tz(merchant_detail.timezone.substring(12)).format("dddd")
        : moment().format("dddd");
    if (businessHour) {
      return (
        <View>
          {Object.entries(businessHour).map((obj, index) => {
            return (
              <View key={index + obj[0]} style={[styles.row, styles.row3]}>
                <Text style={styles.date(currentDay, obj[0])}>{`${obj[0]}`}</Text>
                <Text style={styles.date(currentDay, obj[0])}>
                  {`${obj[1].timeStart} - ${obj[1].timeEnd}`}
                </Text>
              </View>
            );
          })}
        </View>
      );
    }
  };

  return (
    <React.Fragment>
      <Animated.View
        style={[
          styles.container,
          {
            height,
            opacity: opacityInfo,
          },
        ]}>
        {renderStoreName()}
        <Animated.View>
          {isScollBottom && (
            <View>
              {renderAddress()}
              {renderPhone()}
              {renderWorkingTime()}
              {isOpenListTime && renderListWorkingTime()}
            </View>
          )}
        </Animated.View>
      </Animated.View>
    </React.Fragment>
  );
}

export default React.memo(StoreInfo);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scaleWidth(3),
    zIndex: -1,
  },
  rowTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: scaleHeight(2),
  },
  storeName: {
    color: "#0764B0",
    fontSize: scaleWidth(6),
  },
  heart: {
    width: scaleWidth(4.5),
    height: scaleWidth(4.5),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  row2: {
    marginTop: scaleWidth(5),
    paddingBottom: scaleWidth(5),
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  row3: {
    justifyContent: "space-between",
    marginTop: scaleHeight(2),
    marginLeft: scaleWidth(7),
  },
  star_rating: {
    width: scaleWidth(3),
    height: scaleWidth(3),
  },
  txtRate: {
    fontSize: scaleWidth(3.7),
    marginRight: scaleWidth(1),
  },
  icon: {
    width: scaleWidth(4.3),
    height: scaleWidth(4.3),
  },
  txt: {
    fontSize: scaleWidth(4),
    color: "#404040",
    marginLeft: scaleWidth(3),
  },
  txtNow: (time) => {
    return {
      fontSize: scaleWidth(3.8),
      color: time === "Close" ? "red" : "#404040",
      fontWeight: time === "Close" ? "bold" : "400",
      marginLeft: scaleWidth(3),
    };
  },
  date: (currentDay, day) => {
    return {
      fontSize: scaleWidth(3.7),
      color: currentDay === day ? "#1B68AC" : "#404040",
    };
  },
  text_rating: {
    marginRight: 5,
    fontSize: scaleWidth(3.8),
  },
});
