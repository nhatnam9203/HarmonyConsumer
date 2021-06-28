import React from "react";
import { View, ImageBackground, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Text } from "components";
import images from "assets";
import { scaleWidth, scaleHeight, slop, scaleSize } from "utils";
import * as RootNavigation from "navigations/RootNavigation";
import { useDispatch } from "react-redux";
import actions from "@redux/actions";

function Header(props) {
  const dispatch = useDispatch();
  const { step, title } = props;

  const onBack = () => {
    RootNavigation.back();
    dispatch(actions.bookingAction.setReschedule(false));
  };

  const close = () => {
    dispatch(actions.bookingAction.resetBooking());
    RootNavigation.navigate("BottomTab");
  };

  return (
    <ImageBackground style={styles.imgBackground} source={images.background_reward_profile}>
      <View style={styles.row}>
        <TouchableOpacity onPress={onBack} hitSlop={slop}>
          <Image source={images.arrow_back_ios} style={styles.iconTop} />
        </TouchableOpacity>

        <TouchableOpacity onPress={close} hitSlop={slop}>
          <Image source={images.close_header} style={styles.iconTop} />
        </TouchableOpacity>
      </View>

      <Text style={styles.txtStep}>{`Step ${step} of 4`}</Text>
      <Text fontFamily="medium" style={styles.txtSelectedStaff}>{`${title}`}</Text>
    </ImageBackground>
  );
}

export default React.memo(Header);

const styles = StyleSheet.create({
  imgBackground: {
    width: scaleWidth(100),
    padding: 0,
    paddingBottom: scaleHeight(1.5),
  },
  row: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: scaleHeight(6.5),
    paddingHorizontal: scaleWidth(3),
  },
  txtStep: {
    color: "white",
    fontSize: scaleWidth(4),
    marginLeft: scaleWidth(3),
    marginTop: scaleHeight(2.5),
  },
  txtSelectedStaff: {
    color: "white",
    fontSize: scaleWidth(5.3),
    marginLeft: scaleWidth(3),
    marginTop: scaleHeight(2),
  },
  iconTop: {
    width: scaleSize(20),
    height: scaleSize(18),
    resizeMode: "contain",
    tintColor: "#ffffff",
  },
});
