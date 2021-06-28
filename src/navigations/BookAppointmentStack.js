import * as React from "react";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import { StoreDetail, Booking, MyAppointmentDetail, MapStore } from "screens";

const { Item, SelectDate, StaffList, AddNote, Review } = Booking;

const Stack = createStackNavigator();
export default function Index(props) {
  return (
    <Stack.Navigator
      initialRouteName="StoreDetail"
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: false,
      }}>
      <Stack.Screen name="StoreDetail" component={StoreDetail} />
      <Stack.Screen name="ItemAppointment" component={Item} />
      <Stack.Screen name="SelectDate" component={SelectDate} />
      <Stack.Screen name="StaffList" component={StaffList} />
      <Stack.Screen name="AddNote" component={AddNote} />
      <Stack.Screen name="Review" component={Review} />
      <Stack.Screen name="MapStore" component={MapStore} />
      <Stack.Screen name="MyAppointmentDetail" component={MyAppointmentDetail} />
    </Stack.Navigator>
  );
}
