import Reactotron, { asyncStorage, openInEditor, networking } from "reactotron-react-native";
import sagaPlugin from "reactotron-redux-saga";
import { reactotronRedux } from "reactotron-redux";

const reactotron = Reactotron.configure({ name: "Harmony Consumer" }) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .use(asyncStorage()) // <--- here we go!
  //.use(openInEditor()) // <--- here we go!
  .use(networking()) // <--- here we go!
  .use(sagaPlugin())
  .use(
    reactotronRedux({
      except: ["EFFECT_TRIGGERED", "EFFECT_RESOLVED", "EFFECT_REJECTED"],
    }),
  ) //  <- here i am

  .connect(); // let's connect!

export default reactotron;
