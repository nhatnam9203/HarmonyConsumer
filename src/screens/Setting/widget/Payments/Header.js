import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { scaleWidth, slop } from "utils";
import Feather from "react-native-vector-icons/Feather";
import styles from "./styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Menu, { MenuItem } from "react-native-material-menu";

export default function index(props) {
  const refMenu = React.useRef(null);

  const showMenu = () => {
    refMenu.current?.show();
  };

  const hideMenu = () => {
    if (!props.onRemoveCard) return;
    props.onRemoveCard();
    refMenu.current?.hide();
  };

  const { title = "", onBack, isRight } = props;
  return (
    <View style={styles.header}>
      <View style={styles.rowHeader}>
        <TouchableOpacity onPress={onBack} hitSlop={slop}>
          <Feather color="#585858" name="chevron-left" size={scaleWidth(7)} />
        </TouchableOpacity>
        <Text style={[styles.titleHeader, { color: "#585858" }]}>{title}</Text>
        {!isRight && <View />}
        {isRight && (
          <Menu
            style={{ marginTop: scaleWidth(6) }}
            ref={refMenu}
            button={
              <TouchableOpacity onPress={showMenu}>
                <MaterialCommunityIcons color="#585858" name="dots-vertical" size={scaleWidth(6)} />
              </TouchableOpacity>
            }>
            <MenuItem onPress={hideMenu}>
              <Text>Remove this payment</Text>
            </MenuItem>
          </Menu>
        )}
      </View>
    </View>
  );
}
