import React from "react";
import { View } from "react-native";
import styles from "./styles";
import { scaleSize } from "utils";
import Image from "react-native-fast-image";
import SwipperFlatlist from "react-native-swiper-flatlist";

const SwipperList = ({ slideImages, indexStart }) => {
  return (
    <View style={styles.swiperListContainer}>
      <SwipperFlatlist
        showPagination
        paginationDefaultColor={"grey"}
        paginationActiveColor={"white"}
        index={indexStart}
        paginationStyle={{
          marginBottom: -scaleSize(60),
        }}
        paginationStyleItem={{
          width: scaleSize(9),
          height: scaleSize(9),
          marginLeft: -scaleSize(2),
        }}>
        {slideImages.map((slide) => {
          return (
            <Image key={slide.fileId} style={styles.imageSlide} source={{ uri: slide.imageUrl }} />
          );
        })}
      </SwipperFlatlist>
    </View>
  );
};

export default SwipperList;
