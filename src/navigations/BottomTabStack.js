import * as React from 'react';
import { View, Image } from 'react-native';
import ICONS from 'assets';
import { Text } from 'components';
import { scaleSize } from 'utils';
import {
  HomeScreen,
  StoreScreen,
  GiftCardScreen,
  MyAppointment,
} from 'screens';
import Configs from '@src/configs';
const {
  COLORS: { COLOR_MAIN_APP },
} = Configs;
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';

function IconTab({ focused, source, count_upcoming }) {
  const color = focused ? COLOR_MAIN_APP : '#7A98BB';
  return (
    <View style={{ position: 'relative' }}>
      <Image
        source={source}
        resizeMode="contain"
        style={{
          width: scaleSize(24),
          height: scaleSize(24),
          tintColor: color,
        }}
      />
      {count_upcoming > 0 && (
        <View
          style={{
            position: 'absolute',
            top: -scaleSize(5),
            borderRadius: 300,
            backgroundColor: 'red',
            right: -scaleSize(5),
            width: scaleSize(17),
            height: scaleSize(17),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: scaleSize(11),
              color: 'white',
              fontWeight: 'bold',
            }}>
            {count_upcoming}
          </Text>
        </View>
      )}
    </View>
  );
}
function LabelTab({ focused, color, title }) {
  const fontWeight = focused ? 'bold' : 'normal';
  return (
    <Text fontSize={scaleSize(14)} color={color} style={{ fontWeight }}>
      {title}
    </Text>
  );
}
const tabBarOptions = {
  allowFontScaling: false,
  activeTintColor: COLOR_MAIN_APP,
  inactiveTintColor: '#7A98BB',
};

const Tab = createBottomTabNavigator();
export default function Tabs() {
  const { count_upcoming } = useSelector(state => state.appointmentReducer);
  const { isBottomTabbar } = useSelector(state => state.generalReducer);

  return (
    <Tab.Navigator initialRouteName="Home" tabBarOptions={tabBarOptions}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <IconTab source={ICONS.home} focused={focused} />
          ),
          tabBarLabel: ({ focused, color }) => (
            <LabelTab title="Home" focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Store"
        component={StoreScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <IconTab source={ICONS.store} focused={focused} />
          ),
          tabBarLabel: ({ focused, color }) => (
            <LabelTab title="Store" focused={focused} color={color} />
          ),
          tabBarVisible: !isBottomTabbar,
        }}
      />
      <Tab.Screen
        name="Appointments"
        component={MyAppointment}
        options={{
          tabBarIcon: ({ focused }) => (
            <IconTab
              count_upcoming={count_upcoming}
              source={ICONS.today}
              focused={focused}
            />
          ),
          tabBarLabel: ({ focused, color }) => (
            <LabelTab title="Appointments" focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Gift"
        component={GiftCardScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <IconTab source={ICONS.gift} focused={focused} />
          ),
          tabBarLabel: ({ focused, color }) => (
            <LabelTab title="Gift card" focused={focused} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
