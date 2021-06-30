import React from "react";
import { View, Image, TouchableOpacity, StyleSheet, Text } from "react-native";
import images from "assets";

import AntDesign from "react-native-vector-icons/AntDesign";
import { TextInputMask } from "react-native-masked-text";
import Menu, { MenuItem } from "react-native-material-menu";
import { scaleWidth } from "utils";

export default function PhoneInput({
  phoneHeader = "US",
  phone,
  setPhone,
  removePhone,
  setPhoneHeader,
  refInput = null,
  stylesInput,
}) {
  const refMenu = React.useRef(null);

  const [phoneCode, setPhoneCode] = React.useState(phoneHeader === "+1" ? "US" : "VN");

  const hideMenu = async (data) => {
    setPhoneCode(data);
    if (data === "VN") {
      await setPhoneHeader("+84");
    } else {
      await setPhoneHeader("+1");
    }
    refMenu.current?.hide();
  };

  const showMenu = () => {
    refMenu.current?.show();
  };

  return (
    <View style={{ position: "relative" }}>
      <View style={[styles.containerInput, stylesInput]}>
        <Menu
          ref={refMenu}
          button={
            <TouchableOpacity onPress={showMenu} style={styles.buttonSelect}>
              {phoneCode === "US" && (
                <Image source={images.us} style={{ width: scaleWidth(7), height: scaleWidth(5) }} />
              )}
              {phoneCode === "CA" && (
                <Image
                  source={images.canada}
                  style={{ width: scaleWidth(7), height: scaleWidth(5) }}
                />
              )}
              {phoneCode === "VN" && (
                <Image
                  source={images.vn_flag}
                  style={{ width: scaleWidth(7), height: scaleWidth(5) }}
                />
              )}
              <AntDesign
                name="caretdown"
                color="#6A6A6A"
                size={scaleWidth(3)}
                style={{ marginLeft: scaleWidth(2) }}
              />
            </TouchableOpacity>
          }>
          <MenuItem
            onPress={() => hideMenu("US")}
            style={{ justifyContent: "center", alignItems: "flex-start" }}>
            <View style={{ flexDirection: "row", paddingLeft: 10 }}>
              <Image source={images.us} style={{ width: scaleWidth(7), height: scaleWidth(5) }} />
              <View style={{ width: scaleWidth(3) }} />
              <Text>{"+1"}</Text>
            </View>
          </MenuItem>
          <MenuItem
            onPress={() => hideMenu("CA")}
            style={{ justifyContent: "center", alignItems: "flex-start" }}>
            <View
              style={{
                flexDirection: "row",
                paddingLeft: 10,
              }}>
              <Image
                source={images.canada}
                style={{ width: scaleWidth(7), height: scaleWidth(5) }}
              />
              <View style={{ width: scaleWidth(3) }} />
              <Text>{"+1"}</Text>
            </View>
          </MenuItem>
          <MenuItem
            onPress={() => hideMenu("VN")}
            style={{ justifyContent: "center", alignItems: "flex-start" }}>
            <View
              style={{
                flexDirection: "row",
                paddingLeft: 10,
              }}>
              <Image
                source={images.vn_flag}
                style={{ width: scaleWidth(7), height: scaleWidth(5) }}
              />
              <View style={{ width: scaleWidth(3) }} />
              <Text>{"+84"}</Text>
            </View>
          </MenuItem>
        </Menu>

        <Text style={styles.phoneHeader}>{phoneCode === "VN" ? "+84" : "+1"}</Text>
        <TextInputMask
          keyboardType="number-pad"
          value={phone}
          ref={refInput}
          onChangeText={(phone) => {
            setPhone(phone);
          }}
          maxLength={12}
          type={"custom"}
          options={{
            mask: "999-999-9999",
          }}
          placeholder="Phone number"
          placeholderTextColor="grey"
          style={{ flex: 8, marginRight: scaleWidth(2), fontSize: scaleWidth(4) }}
        />

        {phone.length > 0 && (
          <TouchableOpacity onPress={removePhone}>
            <AntDesign name="closecircle" color={"#C5C5C5"} size={scaleWidth(5)} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerInput: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#eeeeee",
    width: scaleWidth(90),
    height: scaleWidth(12),
    alignSelf: "center",
    marginTop: scaleWidth(5),
    flexDirection: "row",
    alignItems: "center",
    paddingRight: scaleWidth(3),
  },
  buttonSelect: {
    padding: scaleWidth(2),
    borderRightWidth: 1,
    borderRightColor: "#eeeeee",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  phoneHeader: {
    fontSize: scaleWidth(4),
    marginRight: scaleWidth(4),
    marginLeft: scaleWidth(2),
  },
});
