import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { scaleWidth } from "utils";
import Entypo from "react-native-vector-icons/Entypo";
import moment from "moment";
import Image from "react-native-fast-image";
import { LazyImage, ProgressiveImage } from "components";
import ICONS from "assets";
import styles from "./styles";
import { useSelector } from "react-redux";

const Comments = ({ toggleModal = () => {} }) => {
  const { rating_merchant_detail } = useSelector((state) => state.storeReducer);

  return (
    <View>
      {rating_merchant_detail.map((obj) => {
        return (
          <View style={styles.itemComment} key={obj.staffRatingId}>
            <InfoUser
              name={obj.user.name}
              imageUrl={obj.user.imageUrl}
              rating={obj.rating}
              createdDate={obj.createdDate}
            />
            <Message message={obj.message} />
            <ImageUpload ratingImages={obj.ratingImages} toggleModal={toggleModal} />
          </View>
        );
      })}
    </View>
  );
};

const InfoUser = ({ name, imageUrl, createdDate, rating }) => {
  const renderAvatar = imageUrl
    ? {
        uri: imageUrl,
        priority: Image.priority.normal,
      }
    : ICONS.avatar;

  return (
    <View style={styles.rowComment}>
      <Image
        style={styles.imgAvatar}
        source={renderAvatar}
        // thumbnailSource={ICONS["staff_default"]}
      />
      <View style={styles.commentRight}>
        <Text style={styles.userName}>{name}</Text>
        <View style={{ flexDirection: "row" }}>
          {new Array(Math.ceil(parseInt(rating))).fill().map(() => (
            <Entypo key={Math.random()} name="star" color="#FDB62B" size={scaleWidth(4)} />
          ))}
        </View>
        <Text style={styles.txtCreateDate}>{moment(createdDate).format("MMMM DD, YYYY")}</Text>
      </View>
    </View>
  );
};

const Message = ({ message }) => {
  if (message !== "") {
    return <Text style={styles.message}>{message}</Text>;
  }
  return null;
};

const ImageUpload = ({ ratingImages, toggleModal }) => {
  if (ratingImages.length > 0) {
    return (
      <View style={styles.containerImgComment}>
        {ratingImages.map((img, key) => {
          if (img.imageUrl || img.imageUrl !== "")
            return (
              <TouchableOpacity
                key={"imgReview" + img.staffRatingId + new Date() + Math.random()}
                onPress={() => toggleModal(ratingImages, key)}>
                <ProgressiveImage style={styles.imgStoreReview} source={{ uri: img.imageUrl }} />
              </TouchableOpacity>
            );
        })}
      </View>
    );
  }
  return null;
};

export default React.memo(Comments);
