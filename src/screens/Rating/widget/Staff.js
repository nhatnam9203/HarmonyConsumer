import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "components";
import Image from "react-native-fast-image";
import images from "assets";
import { scaleWidth, scaleHeight } from "utils";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import actions from "@redux/actions";

export default function Staff({ staff, isCheck = false }) {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.datalocalReducer);

  const toggleLike = () => {
    const body = {
      staffId: staff.staffId,
      isFavorited: isCheck ? 0 : 1,
    };
    dispatch(actions.staffAction.updateFavouriteStaff(token, body));
  };

  const renderImg = staff.imageUrl
    ? { uri: staff.imageUrl, priority: Image.priority.high }
    : images.avatar;

  return (
    <View style={styles.container}>
      <Image source={renderImg} style={styles.avatar} />
      <Text style={styles.name}>{`${staff.displayName}`}</Text>
      <TouchableOpacity onPress={toggleLike}>
        <AntDesign name="heart" size={scaleWidth(7)} color={isCheck ? "red" : "#E5E5E5"} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: scaleWidth(14),
    height: scaleWidth(14),
    borderRadius: scaleWidth(80),
  },
  name: {
    fontSize: scaleWidth(3.8),
    color: "#404040",
    marginVertical: scaleHeight(1),
  },
  container: {
    marginRight: scaleWidth(8),
    justifyContent: "center",
    alignItems: "center",
  },
});
