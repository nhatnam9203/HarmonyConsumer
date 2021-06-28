import * as React from "react";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import {
  ActiveGiftCardScreen,
  AddPaymentScreen,
  ValidationCreditScreen,
  AddMoneyScreen,
  DetailGiftCardScreen,
} from "screens";
const FlowAddCardStack = createStackNavigator();
export default function Index() {
  return (
    <FlowAddCardStack.Navigator
      initialRouteName="ActiveGiftCard"
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: false,
      }}>
      <FlowAddCardStack.Screen name="ActiveGiftCard" component={ActiveGiftCardScreen} />
      <FlowAddCardStack.Screen name="AddPayment" component={AddPaymentScreen} />
      <FlowAddCardStack.Screen name="ValidationCredit" component={ValidationCreditScreen} />
      <FlowAddCardStack.Screen name="AddMoney" component={AddMoneyScreen} />
      <FlowAddCardStack.Screen
        name="DetailGiftCard"
        component={DetailGiftCardScreen}
        initialParams={{
          title: "Card details",
          iconLeft: false,
          iconRight: false,
        }}
      />
    </FlowAddCardStack.Navigator>
  );
}
