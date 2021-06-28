import * as React from "react";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import {
  SigninScreen,
  WelComeScreen,
  PhoneVerifyScreen,
  PhoneAuthScreen,
  SetupPincode,
  SetupProfile,
  ConfirmPincode,
  ForgotPincode,
  EmailSent,
  TermCondition,
  ForgotPhone,
  ForgotEmail,
  ForgotOTP,
  ForgotNewPincode,
} from "screens";
import { useSelector } from "react-redux";
const AuthStack = createStackNavigator();
export default function Index() {
  const userInfo = useSelector((state) => state.datalocalReducer.userInfo);
  return (
    <AuthStack.Navigator
      initialRouteName={userInfo ? "Signin" : "Welcome"}
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: false,
      }}>
      <AuthStack.Screen name="Welcome" component={WelComeScreen} />
      <AuthStack.Screen name="PhoneVerify" component={PhoneVerifyScreen} />
      <AuthStack.Screen name="PhoneAuth" component={PhoneAuthScreen} />
      <AuthStack.Screen name="SetupPincode" component={SetupPincode} />
      <AuthStack.Screen name="SetupProfile" component={SetupProfile} />
      <AuthStack.Screen name="ConfirmPincode" component={ConfirmPincode} />
      <AuthStack.Screen name="Signin" component={SigninScreen} />
      <AuthStack.Screen name="ForgotPincode" component={ForgotPincode} />
      <AuthStack.Screen name="EmailSent" component={EmailSent} />
      <AuthStack.Screen name="TermCondition" component={TermCondition} />
      <AuthStack.Screen name="ForgotPhone" component={ForgotPhone} />
      <AuthStack.Screen name="ForgotEmail" component={ForgotEmail} />
      <AuthStack.Screen name="ForgotOTP" component={ForgotOTP} />
      <AuthStack.Screen name="ForgotNewPincode" component={ForgotNewPincode} />
    </AuthStack.Navigator>
  );
}
