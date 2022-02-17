/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native';
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import { name as appName } from './app.json';
import './globals';
import App from './src/App';
import codePush from 'react-native-code-push';

LogBox.ignoreLogs(['Warning: ...']); //Hide warnings
LogBox.ignoreLogs(['Animated:']); //Hide warnings
LogBox.ignoreAllLogs();

enableScreens();
// AppRegistry.registerComponent(appName, () => App);

const options = {
  updateDialog: false,
  installMode: codePush.InstallMode.IMMEDIATE,
  checkFrequency: codePush.CheckFrequency.MANUAL,
  //   rollbackRetryOptions: {
  //     delayInHours: 24,
  //     maxRetryAttempts: 3,
  //   },
};

AppRegistry.registerComponent(appName, () => {
  return codePush(options)(App);
});
