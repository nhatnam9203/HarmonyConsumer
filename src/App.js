/**
 * @format
 */
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AxiosProvider } from '@shared/providers';
import { Loading, RootComponent } from 'components';
import * as React from 'react';
import { StatusBar } from 'react-native';
import codePush from 'react-native-code-push';
import 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { AuthStack, MainStack } from './navigations';
import { isMountedRef, navigationRef } from './navigations/RootNavigation';
import { persistor, store } from './redux/store';

if (__DEV__) {
  import('../ReactotronConfig.js').then(() =>
    console.log('Reactotron Configured'),
  );
}

const Stack = createStackNavigator();

function SwitchNavigator() {
  return (
    <RootComponent>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
        initialRouteName="Auth">
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="Main" component={MainStack} />
      </Stack.Navigator>
    </RootComponent>
  );
}

const App: () => React$Node = () => {
  const [isShowKeyBoard, setShowKeyBoard] = React.useState(false);

  const handleKeyBoardShow = e => setShowKeyBoard(true);

  const handleKeyBoardHide = () => setShowKeyBoard(false);

  React.useEffect(() => {
    SplashScreen.hide();
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
        <StatusBar
          backgroundColor="transparent"
          translucent={true}
          barStyle="dark-content"
        />
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AxiosProvider>
              <NavigationContainer ref={navigationRef}>
                <SwitchNavigator />
                <Loading />
              </NavigationContainer>
            </AxiosProvider>
          </PersistGate>
        </Provider>
      </KeyboardAwareScrollView>
    </React.Fragment>
  );
};

let codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL };
export default codePush(codePushOptions)(App);
