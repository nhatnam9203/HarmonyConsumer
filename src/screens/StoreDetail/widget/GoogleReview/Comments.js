import React from "react";
import { View } from "react-native";
import { scaleWidth } from "utils";
import Entypo from "react-native-vector-icons/Entypo";
import Image from "react-native-fast-image";
import { LazyImage, Text, ProgressiveImage } from "components";
import ICONS from "assets";
import styles from "./styles";

const Comments = ({ reviews = [] }) => {
  return (
    <View>
      {reviews.map((obj, index) => {
        return (
          <View style={styles.itemComment} key={index + Math.random() + "comment"}>
            <InfoUser
              name={obj.author_name}
              imageUrl={obj.profile_photo_url}
              rating={obj.rating}
              createdDate={obj.relative_time_description}
            />
            <Message message={obj.text} />
          </View>
        );
      })}
    </View>
  );
};

const InfoUser = ({ name, imageUrl, createdDate, rating }) => {
  return (
    <View>
      <View style={styles.rowComment}>
        <ProgressiveImage
          style={styles.imgAvatar}
          source={{ uri: imageUrl, priority: Image.priority.high }}
          thumbnailSource={ICONS["staff_default"]}
          containerStyle={{ backgroundColor: "transparent" }}
        />
        <View style={styles.commentRight}>
          <Text fontFamily="medium" style={styles.userName}>
            {name}
          </Text>
        </View>
      </View>
      <View style={styles.rowTime}>
        <View style={{ flexDirection: "row" }}>
          {new Array(Math.ceil(parseInt(rating))).fill().map(() => (
            <Entypo key={Math.random()} name="star" color="#FDB62B" size={scaleWidth(4)} />
          ))}
        </View>
        <Text style={styles.txtCreateDate}>{createdDate}</Text>
      </View>
    </View>
  );
};

const Message = ({ message }) => {
  if (message !== "") {
    return (
      <Text fontFamily="medium" style={styles.message}>
        {message}
      </Text>
    );
  }
  return null;
};

export default Comments;
