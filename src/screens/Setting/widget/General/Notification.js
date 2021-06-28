import React from "react";
import { View } from "react-native";
import { Text } from "components";
import styles from "./styles";
import { Switch } from "react-native-paper";
import NotificationSetting from "react-native-open-notification";
import { useDispatch, useSelector } from "react-redux";
import actions from "@redux/actions";

export default function index(props) {
  const dispatch = useDispatch();

  const { isInbox } = useSelector((state) => state.authReducer);

  const onChangeInbox = () => {
    NotificationSetting.open();
    dispatch(actions.datalocalAction.onChangeInbox(!isInbox));
  };

  return (
    <View>
      <Text fontFamily="medium" style={styles.title}>
        Notifications
      </Text>
      <View style={styles.row}>
        <Text style={styles.txt}>Inbox messages</Text>
        <Switch color={"#0764B0"} value={isInbox} onValueChange={onChangeInbox} />
      </View>
    </View>
  );
}
