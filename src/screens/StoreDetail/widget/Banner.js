import React from "react";
import { StyleSheet, Animated } from "react-native";
import { scaleWidth, scaleHeight } from "utils";
import { useSelector } from "react-redux";
import { ProgressiveImage } from "components";
import images from "assets";
import SwipperFlatlist from "react-native-swiper-flatlist";

export default function Banner(props) {
  const { scrollY } = props;

  const merchant = useSelector((state) => state.storeReducer.merchant_detail);
  const { banners = [] } = merchant;

  const opacity = scrollY.interpolate({
    inputRange: [0, scaleHeight(30)],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      {banners.length > 0 ? (
        <BannerList banners={banners} />
      ) : (
        <ProgressiveImage
          source={images.bannerMerchant}
          style={[styles.imgBanner]}
          resizeMode="cover"
        />
      )}
    </Animated.View>
  );
}

const BannerList = ({ banners }) => {
  return (
    <SwipperFlatlist
      autoplayDelay={2}
      autoplayLoop={true}
      showPagination={true}
      autoplayLoopKeepAnimation={true}>
      {banners.map((slide) => {
        return (
          <ProgressiveImage
            key={slide.fileId}
            source={{ uri: slide.imageUrl }}
            style={[styles.imgBanner]}
            resizeMode="cover"
          />
        );
      })}
    </SwipperFlatlist>
  );
};

const styles = StyleSheet.create({
  container: {
    height: scaleHeight(30),
  },
  imgBanner: {
    width: scaleWidth(100),
    height: scaleHeight(30),
  },
});
