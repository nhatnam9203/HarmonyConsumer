import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Text from './Text';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { scaleSize } from 'utils';
import ICONS from 'assets';
import Configs from '@src/configs';
import { useDispatch, useSelector } from 'react-redux';
import actions from '@redux/actions';

const {
  COLORS: { DRAWER, COLOR_MAIN_APP },
} = Configs;
const drawers = [
  {
    title: 'Reward Profile',
    icon: 'reward_profile_drawer',
    routeName: 'StackReward',
  },
  {
    title: 'Transactions',
    icon: 'transaction_drawer',
    routeName: 'Transactions',
  },
  { title: 'Favourites', icon: 'favorites_drawer', routeName: 'Favourites' },
  // { title: "Wish List", icon: "wishlist_drawer", routeName: "WishList" },
  { title: 'Setting', icon: 'setting_drawer', routeName: 'Setting' },
  {
    title: 'About HarmonyPay',
    icon: 'about_harmony_pay_drawer',
    routeName: 'About',
  },
  { title: 'Sign out', icon: 'signout_drawer', routeName: 'Logout' },
];
export default function DrawerContent(props) {
  return (
    <LinearGradient style={{ flex: 1 }} colors={[COLOR_MAIN_APP, DRAWER]}>
      <DrawerContentScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.container_profile}>
            <Text fontSize={20} style={{ fontWeight: 'bold', color: 'white' }}>
              MENU
            </Text>
          </View>
          <DrawerItemList data={drawers} {...props} />
        </View>
      </DrawerContentScrollView>
    </LinearGradient>
  );
}

const DrawerItemList = props => {
  const { data } = props;
  const dispatch = useDispatch();

  const token = useSelector(state => state.datalocalReducer.token);

  return (
    <View style={{ flex: 1 }}>
      {data.map((item, index) => {
        return (
          <DrawerItem
            key={index + 'drawer item'}
            icon={() => (
              <DrawerIcon source={ICONS[item.icon]} style={styles.icon} />
            )}
            label={item.title}
            labelStyle={styles.label}
            style={{
              marginTop: scaleSize(20),
            }}
            onPress={() => {
              item.routeName === 'Logout'
                ? dispatch(actions.authAction.logout(token))
                : props.navigation.navigate(item.routeName);
            }}
          />
        );
      })}
    </View>
  );
};

const DrawerIcon = ({ source, resizeMode, style }) => {
  return <Image source={source} resizeMode={resizeMode} style={style} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: scaleSize(20),
  },
  container_profile: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: scaleSize(5),
  },
  avatar: {
    borderRadius: scaleSize(20),
    width: scaleSize(40),
    height: scaleSize(40),
    marginRight: scaleSize(10),
  },
  icon: {
    width: scaleSize(20),
    height: scaleSize(20),
  },
  label: {
    color: '#FFFFFF',
    fontSize: scaleSize(16),
    height: scaleSize(22),
    width: scaleSize(180),
  },
});
