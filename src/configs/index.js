import { Dimensions, Platform } from 'react-native';
const { width } = Dimensions.get('window');
import { getVersion } from 'react-native-device-info';
import EvnConfigs from 'react-native-config';

const AppConfigs = {
  // VERSION: Platform.OS == 'android' ? '2.2.7' : '3.9.9',
  VERSION: getVersion(),
  IS_PLATFORM: Platform.OS == 'android' ? 'android' : 'ios',
  DEFAULT_WIDTH: 414,
  DEFAULT_HEIGHT: 736,
  CARD_HEIGHT: 220,
  CARD_WIDTH: width * 0.9,
  SPACING_FOR_CARD_INSET: width * 0.1 - 10,
  FULL_WIDTH: width,
  // app's color
  COLORS: {
    RED: '#ED1C24',
    COLOR_MAIN_APP: '#0764b0',
    DRAWER: '#1C98C9',
    WHITE: 'rgb(245, 245, 245)',
    ORANGE: '#FFB700',
    BLACK: '#404040',
    GREY: '#888888',
    GREEN: '#3BFF00',
    INPUT: '#C5C5C5',
  },
  //fontsize
  FONTSIZE: {
    h1: 38,
    h2: 26,
    h3: 23,
    h4: 20,
    regular: 17.5,
    medium: 15,
    small: 14,
  },
};

const Configs = Object.assign(EvnConfigs, AppConfigs, {
  // API_URL: 'https://api2.harmonypayment.com/api/',
});

export default Configs;
