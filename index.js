/**
 * @format
 */

import { name as appName } from "./app.json";
import "react-native-gesture-handler";
import * as React from "react";
import { AppRegistry, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AuthStack, MainStack } from "./src/navigations";

import { navigationRef, isMountedRef } from "navigations/RootNavigation";
import { Loading } from "components";

import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/redux/store";
import { Provider } from "react-redux";
import { RootComponent } from "components";

const Stack = createStackNavigator();
console.disableYellowBox = true;

function SwitchNavigator() {
  return (
    <RootComponent>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
        initialRouteName="Auth">
        <Stack.Screen name="Main" component={MainStack} />
        <Stack.Screen name="Auth" component={AuthStack} />
      </Stack.Navigator>
    </RootComponent>
  );
}

const App = () => {
  const [isShowKeyBoard, setShowKeyBoard] = React.useState(false);

  const handleKeyBoardShow = (e) => setShowKeyBoard(true);

  const handleKeyBoardHide = () => setShowKeyBoard(false);

  React.useEffect(() => {
    // SplashScreen.hide()
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return (
    <React.Fragment>
      <KeyboardAwareScrollView
        scrollEnabled={isShowKeyBoard}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
        onKeyboardWillShow={handleKeyBoardShow}
        onKeyboardWillHide={handleKeyBoardHide}>
        <StatusBar backgroundColor="transparent" translucent={true} barStyle="dark-content" />
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer ref={navigationRef}>
              <SwitchNavigator />
              <Loading />
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </KeyboardAwareScrollView>
    </React.Fragment>
  );
};

AppRegistry.registerComponent(appName, () => App);
