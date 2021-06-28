import React from "react";
import { View } from "react-native";
import styles from "./styles";
import { isEmpty } from "lodash";
import SwipperList from "./SwiperList";
import ButtonClose from "./ButtonClose";

export default function index({ toggleModal, slideImages, indexStart }) {
  return (
    <View style={styles.container}>
      <ButtonClose onPress={toggleModal} />
      {!isEmpty(slideImages) && <SwipperList indexStart={indexStart} slideImages={slideImages} />}
    </View>
  );
}
