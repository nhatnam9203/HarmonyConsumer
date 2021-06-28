import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "components";
import { scaleWidth, slop } from "utils";
import Feather from "react-native-vector-icons/Feather";
import styles from "../styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as RootNavigation from "navigations/RootNavigation";
import Menu, { MenuItem } from "react-native-material-menu";
import { useDispatch, useSelector } from "react-redux";
import actions from "@redux/actions";

function Header(props) {
  const dispatch = useDispatch();

  const refMenu = React.useRef(null);

  const token = useSelector((state) => state.datalocalReducer.token);

  const back = () => {
    RootNavigation.back();
  };

  const showMenu = () => {
    refMenu.current?.show();
  };

  const hideMenu = () => {
    refMenu.current?.hide();
  };

  const readAllInbox = () => {
    dispatch(actions.inboxAction.readAllInbox(token));
    hideMenu();
  };

  const deleteAllInbox = () => {
    dispatch(actions.inboxAction.deleteAllInbox(token));
    hideMenu();
  };

  return (
    <View style={styles.header}>
      <View style={styles.rowHeader}>
        <TouchableOpacity onPress={back} hitSlop={slop}>
          <Feather name="chevron-left" size={scaleWidth(7)} color={"#585858"} />
        </TouchableOpacity>
        <Text fontFamily="medium" style={styles.titleHeader}>
          Inbox
        </Text>
        <Menu
          style={{ marginTop: scaleWidth(6) }}
          ref={refMenu}
          button={
            <TouchableOpacity onPress={showMenu}>
              <Feather color={"#585858"} name="more-vertical" size={scaleWidth(7)} />
            </TouchableOpacity>
          }>
          <MenuItem onPress={readAllInbox}>
            <Text>Mask all as read</Text>
          </MenuItem>
          <MenuItem onPress={deleteAllInbox}>
            <Text>Clear all</Text>
          </MenuItem>
        </Menu>
      </View>
    </View>
  );
}

export default React.memo(Header);
