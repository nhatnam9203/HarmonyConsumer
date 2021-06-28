import React from "react";
import { View, StyleSheet } from "react-native";
import { scaleWidth, scaleHeight } from "utils";
import { useSelector } from "react-redux";
import { LazyImage, ProgressiveImage } from "components";

export default function StorePhoto(props) {
  const merchant = useSelector((state) => state.storeReducer.merchant_detail);

  const { banners = [] } = merchant;
  if (banners.length > 0)
    return (
      <View style={styles.container}>
        <ProgressiveImage style={styles.mainImg} source={{ uri: banners[0].imageUrl }} />
        <View style={styles.containerImg}>
          {banners.map((obj, index) => {
            if (index !== 0)
              return (
                <ProgressiveImage
                  key={obj.fileId}
                  source={{ uri: obj.imageUrl }}
                  style={styles.img}
                />
              );
          })}
        </View>
        {banners.length > 2 && <View style={{ height: scaleHeight(60) }} />}
        {banners.length <= 2 && <View style={{ height: scaleHeight(100) }} />}
      </View>
    );
  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scaleWidth(3),
    backgroundColor: "white",
  },
  mainImg: {
    width: "100%",
    height: scaleHeight(30),
    borderRadius: 5,
    marginTop: scaleHeight(1),
  },
  containerImg: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  img: {
    width: scaleWidth(46),
    height: scaleWidth(46),
    borderRadius: 5,
    marginTop: scaleHeight(1),
  },
});
