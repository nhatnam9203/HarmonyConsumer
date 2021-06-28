import * as React from "react";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import { MyAppointment, MyAppointmentDetail } from "screens";

const Stack = createStackNavigator();
export default function Index(props) {
  return (
    <Stack.Navigator
      initialRouteName="MyAppointment"
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: false,
      }}>
      <Stack.Screen name="MyAppointment" component={MyAppointment} />
      <Stack.Screen name="MyAppointmentDetail" component={MyAppointmentDetail} />
    </Stack.Navigator>
  );
}
