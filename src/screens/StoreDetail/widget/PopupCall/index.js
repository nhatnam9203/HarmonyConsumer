import React from "react";
import { View, Linking } from "react-native";
import { scaleHeight, sendWhatsApp } from "utils";
import { Text } from "components";
import { useDispatch } from "react-redux";
import actions from "@redux/actions";
import styles from "./styles";
import ButtonOpen from "./ButtonOpen";
import ButtonSelect from "./ButtonSelect";

export default function PopupCall({ phoneNumber, closeModalCall }) {
  const dispatch = useDispatch();

  const [type, setType] = React.useState("");

  const onChangeType = (obj) => {
    setType(obj);
  };

  const selectType = (obj) => {
    if (type !== "") {
      let phone = phoneNumber.replace(/-/g, "").substring(1);
      if (type === "phone") {
        save(phone, "phone", obj);
        Linking.openURL(`tel:${phone}`);
      }
      if (type === "whatsapp") {
        save(phone, "whatsapp", obj);
        sendWhatsApp(phone);
      }
      closeModalCall();
    }
  };

  const save = (phone, callType, obj) => {
    if (obj === "always") {
      const payload = {
        phone,
        callType,
      };
      dispatch(actions.datalocalAction.saveToCall(payload));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Open with</Text>
      <View style={styles.wrapIcon}>
        <ButtonSelect onChangeType={onChangeType} title="Phone" type={type} typeTemp="phone" />
        <ButtonSelect
          onChangeType={onChangeType}
          title="Whats app"
          type={type}
          typeTemp="whatsapp"
        />
      </View>
      <View style={styles.bottom}>
        <ButtonOpen selectType={selectType} title="Just once" />
        <View style={styles.verticalLine} />
        <ButtonOpen selectType={selectType} title="Always" />
      </View>
      <View style={{ height: scaleHeight(2) }} />
    </View>
  );
}
