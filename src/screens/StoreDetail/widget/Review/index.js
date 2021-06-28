import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import Summary from "./Summary";
import Comments from "./Comments";
import styles from "./styles";
import SlideImage from "./SlideImage";
import Modal from "react-native-modal";
import { isEmpty } from "lodash";
import { LoadMore } from "components";
import { scaleHeight } from "utils";

export default function Review({ isLoadMoreReview, pageReview, maxPage }) {
  const [isModal, setModal] = React.useState(false);
  const [slideImages, setSlideImages] = React.useState([]);
  const [indexStart, setIndexStart] = React.useState(0);
  const { rating_merchant_detail, summary_merchant_detail } = useSelector(
    (state) => state.storeReducer,
  );

  const { count, rating } = summary_merchant_detail ? summary_merchant_detail : "";

  const toggleModal = React.useCallback(
    (images, index) => {
      const isVisibile = !isModal;
      if (isVisibile && !isEmpty(images)) {
        setSlideImages(images);
        setIndexStart(index);
      } else {
        setSlideImages([]);
        setIndexStart(0);
      }
      setModal(isVisibile);
    },
    [isModal],
  );

  return (
    <View style={styles.container}>
      <Summary rating={rating} count={count} />
      <Comments toggleModal={toggleModal} />
      {isLoadMoreReview && <LoadMore />}
      {rating_merchant_detail.length === 0 && <View style={{ height: scaleHeight(85) }} />}
      {rating_merchant_detail.length > 0 && maxPage == pageReview && (
        <View style={{ height: scaleHeight(60) }} />
      )}
      <Modal animationIn="zoomInUp" animationOut="slideOutDown" isVisible={isModal}>
        <SlideImage slideImages={slideImages} toggleModal={toggleModal} indexStart={indexStart} />
      </Modal>
    </View>
  );
}
