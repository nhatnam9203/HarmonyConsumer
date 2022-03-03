import Reactotron, {
  asyncStorage,
  openInEditor,
  networking,
} from 'reactotron-react-native';
import sagaPlugin from 'reactotron-redux-saga';
import { reactotronRedux } from 'reactotron-redux';
import { NativeModules } from 'react-native';

let scriptHostname;
if (__DEV__) {
  const scriptURL = NativeModules.SourceCode.scriptURL;
  scriptHostname = scriptURL.split('://')[1].split(':')[0];
}

const reactotron = Reactotron.configure({
  name: 'Harmony Consumer',
  host: scriptHostname,
}) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .use(asyncStorage()) // <--- here we go!
  //.use(openInEditor()) // <--- here we go!
  .use(networking()) // <--- here we go!
  .use(sagaPlugin())
  .use(
    reactotronRedux({
      except: ['EFFECT_TRIGGERED', 'EFFECT_RESOLVED', 'EFFECT_REJECTED'],
    }),
  ) //  <- here i am

  .connect(); // let's connect!

export default reactotron;
