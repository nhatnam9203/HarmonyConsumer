import * as React from "react";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import {
  General,
  PersonalInfo,
  ChangePassword,
  ChangePincode,
  Payments,
} from "../screens/Setting/widget";
const StackReward = createStackNavigator();

export default function Index() {
  return (
    <StackReward.Navigator
      initialRouteName="General"
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: false,
      }}>
      <StackReward.Screen name="General" component={General} />
      <StackReward.Screen name="PersonalInfo" component={PersonalInfo} />
      <StackReward.Screen name="ChangePassword" component={ChangePassword} />
      <StackReward.Screen name="ChangePincode" component={ChangePincode} />
      <StackReward.Screen name="Payments" component={Payments} />
    </StackReward.Navigator>
  );
}
