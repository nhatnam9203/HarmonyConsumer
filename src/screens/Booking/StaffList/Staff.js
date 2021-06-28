import React from "react";
import { View } from "react-native";
import images from "assets";
import { scaleWidth } from "utils";
import { Text, ProgressiveImage } from "components";
import AntDesign from "react-native-vector-icons/AntDesign";
import styles from "./styles";
import { TouchableRipple } from "react-native-paper";

const Staff = ({ obj, isDisabled, isActive, selectStaff, renderImg }) => {
  return (
    <TouchableRipple
      onPress={() => selectStaff(obj.staffId)}
      disabled={isDisabled}
      style={[styles.checkDisabled(isDisabled)]}>
      <StaffPerson isActive={isActive} renderImg={renderImg} obj={obj} />
    </TouchableRipple>
  );
};

const StaffPerson = ({ renderImg, obj, isActive }) => {
  return (
    <View style={styles.row}>
      <ProgressiveImage
        source={renderImg}
        style={[styles.avatar, { borderRadius: 300 }]}
        containerStyle={{ backgroundColor: "transparent" }}
        thumbnailSource={images["staff_default"]}
      />
      <Text fontFamily="medium" style={[styles.name, { color: "#585858" }]}>
        {obj.displayName}
      </Text>
      {isActive && <TickSelected />}
    </View>
  );
};

const TickSelected = () => (
  <AntDesign name="check" size={scaleWidth(6)} color="#17A635" style={styles.iconSelected} />
);

export default Staff;
