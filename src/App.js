/**
 * @format
 */
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AxiosProvider } from '@shared/providers';
import { Loading, RootComponent } from 'components';
import * as React from 'react';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { AuthStack, MainStack } from './navigations';
import { isMountedRef, navigationRef } from './navigations/RootNavigation';
import configureStore from './redux/store';
import { CodePushProvider } from '@shared/providers/CodePushProvider';

const { persistor, store } = configureStore();

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

export default App = () => {
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
            <CodePushProvider>
              <AxiosProvider>
                <NavigationContainer ref={navigationRef}>
                  <SwitchNavigator />
                  <Loading />
                </NavigationContainer>
              </AxiosProvider>
            </CodePushProvider>
          </PersistGate>
        </Provider>
      </KeyboardAwareScrollView>
    </React.Fragment>
  );
};
