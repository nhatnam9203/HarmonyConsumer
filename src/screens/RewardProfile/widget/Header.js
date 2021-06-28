import React, { useMemo } from "react";
import { View, ImageBackground, TouchableOpacity } from "react-native";
import Image from "react-native-fast-image";
import images from "assets";
import { Text } from "components";
import { scaleWidth, slop } from "utils";
import Feather from "react-native-vector-icons/Feather";
import styles from "../styles";
import { useSelector } from "react-redux";

export default function Header(props) {
  const userInfo = useSelector((state) => state.datalocalReducer.userInfo);

  const userName = useMemo(() => {
    return userInfo && userInfo.fullName ? userInfo.fullName : "";
  }, [userInfo]);

  const avatarURL = useMemo(() => {
    return userInfo.avatarURL;
  }, [userInfo]);

  const back = () => {
    props.navigation.goBack();
  };

  const renderAvatar = avatarURL
    ? {
        uri: avatarURL,
        priority: Image.priority.normal,
      }
    : images.avatar;
  const { currentRank = "" } = props;

  function renderNextRankIcon() {
    switch (currentRank) {
      case "Bronze":
        return <Image source={images.crowns_bronze} style={styles.iconBronze} />;
      case "Silver":
        return <Image source={images.crowns_silver} style={styles.iconBronze} />;
      case "Gold":
        return <Image source={images.crowns_gold} style={styles.iconBronze} />;
      case "Platium":
        return <Image source={images.crowns_platinum} style={styles.iconBronze} />;
      default:
        break;
    }
  }

  return (
    <ImageBackground source={images.background_reward_profile} style={styles.headerBackground}>
      <View style={styles.rowHeader}>
        <TouchableOpacity style={styles.headerLeft} onPress={back} hitSlop={slop}>
          <Feather name="chevron-left" size={scaleWidth(8)} color={"white"} />
        </TouchableOpacity>
        <Text fontSize={20} style={styles.titleHeader}>
          Reward Profile
        </Text>
      </View>

      <Image source={renderAvatar} style={styles.avatar} />
      <Text fontSize={30} style={styles.nameHeader}>{`${userName}`}</Text>

      <View style={{ flexDirection: "row", alignSelf: "center", alignItems: "center" }}>
        {renderNextRankIcon()}
        <Text fontSize={16.5} style={styles.txtRankName}>
          {currentRank} member
        </Text>
      </View>
    </ImageBackground>
  );
}
