import React from "react";
import { View, TouchableOpacity } from "react-native";
import Image from "react-native-fast-image";
import { Text } from "components";
import styles from "../styles";
import images from "assets";
import { scaleWidth } from "utils";
import * as RootNavigation from "navigations/RootNavigation";
import { useDispatch, useSelector } from "react-redux";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import actions from "@redux/actions";

export default function Store(props) {
  const { item } = props;
  const { businessName = "", addressFull = "", rating, ratingCount, banners } = item ? item : "";

  const renderImg =
    banners.length > 0
      ? { uri: banners[0].imageUrl, priority: Image.priority.high }
      : images.bannerMerchant;

  const dispatch = useDispatch();

  const token = useSelector((state) => state.datalocalReducer.token);

  const navigateToStoreDetail = () => {
    dispatch(actions.bookingAction.resetBooking());
    dispatch(actions.storeAction.setDetailMerchant(item));
    dispatch(actions.storeAction.getDetailMerchant(item.merchantId, token));
    RootNavigation.navigate("BookAppointmentStack", {
      screen: "StoreDetail",
      params: { merchantId: item.merchantId },
    });
  };

  return (
    <TouchableOpacity activeOpacity={1} onPress={navigateToStoreDetail}>
      <View style={styles.store}>
        <Image source={renderImg} style={styles.imgNail} />
        <View style={styles.storeBody}>
          <Text fontFamily="medium" style={styles.titleStore}>{`${businessName}`}</Text>
          <Text style={styles.addressStore}>{`${addressFull}`}</Text>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {parseFloat(rating) > 0 && (
              <React.Fragment>
                <Text
                  fontSize={15.5}
                  fontFamily="medium"
                  color="#585858"
                  style={{ marginRight: 5, fontSize: scaleWidth(3.8) }}>
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
        <AntDesign name="heart" size={scaleWidth(6)} color="#ED1C24" style={styles.likeIcon} />
      </View>
    </TouchableOpacity>
  );
}
