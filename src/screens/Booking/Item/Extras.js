import React from "react";
import { View, StyleSheet, Platform, TouchableOpacity } from "react-native";
import images from "assets";
import { scaleWidth, scaleHeight } from "utils";
import { Text, ProgressiveImage } from "components";
import Image from "react-native-fast-image";

const ItemExtra = ({ extras = [], addExtra, tempExtras, service }) => {
  if (extras.length > 0)
    return (
      <View style={styles.container}>
        {extras.map((obj, index) => {
          const ex = { ...obj, serviceId: service.serviceId };
          const renderImg = ex.imageUrl
            ? { uri: ex.imageUrl, priority: Image.priority.normal }
            : images.service_holder;

          const _ex = tempExtras.find((obj) => obj.extraId === ex.extraId);

          return (
            <TouchableOpacity
              onPress={() => addExtra(ex)}
              activeOpacity={1}
              key={"extra" + index}
              style={styles.itemContainer}>
              <Image
                style={styles.square}
                source={_ex && _ex.isCheck ? images.check_box : images.check_box_empty}
                style={styles.imgExtra}
              />
              <ImageExtra renderImg={renderImg} />
              <Info ex={ex} />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  return null;
};

const ImageExtra = ({ renderImg }) => {
  return (
    <ProgressiveImage
      thumbnailSource={images["service_holder"]}
      style={styles.imgService}
      source={renderImg}
      containerStyle={{ backgroundColor: "transparent" }}
    />
  );
};

const Info = ({ ex }) => {
  return (
    <View style={styles.rowInfoExtra}>
      <Text fontFamily="medium" style={styles.txtExtra}>{`${ex.name}`}</Text>
      <View style={styles.rowBottomService}>
        <Text style={styles.duration_service}>{`${ex.duration} min`}</Text>
        <Text style={styles.price_service}>{`$ ${ex.price}`}</Text>
      </View>
    </View>
  );
};

export default ItemExtra;

const styles = StyleSheet.create({
  txtExtra: {
    fontSize: scaleWidth(4.5),
    color: "#0764B0",
  },
  square: {
    tintColor: "#AAAAAA",
    width: scaleWidth(5),
    height: scaleWidth(5),
    marginTop: Platform.OS === "android" ? 0.5 : 0,
  },
  imgService: {
    width: scaleWidth(16),
    height: scaleWidth(16),
    borderRadius: 8,
    marginLeft: scaleWidth(3),
  },
  duration_service: {
    fontSize: scaleWidth(4),
    color: "#575757",
  },
  price_service: {
    fontSize: scaleWidth(4),
    color: "#585858",
    fontWeight: Platform.OS === "android" ? "bold" : "600",
  },
  rowBottomService: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: scaleWidth(68),
  },
  itemContainer: {
    flexDirection: "row",
    marginTop: scaleHeight(1.5),
    paddingBottom: scaleHeight(1.5),
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },
  container: {},
  rowInfoExtra: {
    justifyContent: "space-between",
    marginLeft: scaleWidth(3),
  },
  imgExtra: {
    width: scaleWidth(4),
    height: scaleWidth(4),
  },
});
