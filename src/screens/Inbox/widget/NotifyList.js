import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "components";
import Item from "./Item";
import { scaleWidth, scaleHeight } from "utils";

function NotifyList(props) {
  const { notify, isRead, setLoading, isHistory } = props;
  if (notify.length === 0) {
    return <Text style={styles.noItem}>There is no message.</Text>;
  }

  return (
    <View style={styles.container}>
      {notify.map((obj) => {
        return (
          <Item
            setLoading={setLoading}
            isRead={isRead}
            key={obj.notificationId}
            item={obj}
            isHistory={isHistory ? true : false}
          />
        );
      })}
    </View>
  );
}

export default NotifyList;

const styles = StyleSheet.create({
  container: {},
  noItem: {
    fontSize: scaleWidth(3.8),
    color: "#585858",
    marginBottom: scaleHeight(3),
    marginTop: scaleHeight(1),
    marginLeft: scaleWidth(3),
  },
});
