import * as React from "react";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import { RewardProfile, PointsHistory, MemberBenefit, QuestionAccumulate } from "screens";
const StackReward = createStackNavigator();

export default function Index() {
  return (
    <StackReward.Navigator
      initialRouteName="RewardProfile"
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: false,
      }}>
      <StackReward.Screen name="RewardProfile" component={RewardProfile} />
      <StackReward.Screen name="PointsHistory" component={PointsHistory} />
      <StackReward.Screen name="MemberBenefit" component={MemberBenefit} />
      <StackReward.Screen name="QuestionAccumulate" component={QuestionAccumulate} />
    </StackReward.Navigator>
  );
}
